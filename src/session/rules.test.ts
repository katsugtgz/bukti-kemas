import { describe, expect, it } from "vitest"
import {
  acceptCameraRead,
  cameraFormatAllowed,
  chooseMime,
  clampMaxMinutes,
  clipFilename,
  completeReceiptsOnDay,
  decideScan,
  isCompleteStop,
  looksLikeHidScan,
  normalizeReceipt,
  stampText,
} from "./rules"

const day = new Date(2026, 8, 22, 9, 0, 0)
const yesterday = new Date(2026, 8, 21, 23, 50, 0)

describe("normalizeReceipt", () => {
  it("uppercases and strips spaces", () => {
    expect(normalizeReceipt(" ab12 3456 ")).toBe("AB123456")
  })

  it("rejects short, long, and illegal characters", () => {
    expect(normalizeReceipt("AB12")).toBeNull()
    expect(normalizeReceipt("A".repeat(41))).toBeNull()
    expect(normalizeReceipt("AB12_456")).toBeNull()
  })

  it("accepts 6 to 40 letters, digits, and hyphens", () => {
    expect(normalizeReceipt("JN-123456")).toBe("JN-123456")
    expect(normalizeReceipt("A".repeat(40))).toBe("A".repeat(40))
  })
})

describe("decideScan", () => {
  it("starts a valid receipt when nothing is recording", () => {
    expect(
      decideScan("spx123456", {
        recordingReceipt: null,
        todayComplete: new Set(),
      })
    ).toEqual({ type: "start", receipt: "SPX123456" })
  })

  it("ignores the receipt that is already recording", () => {
    expect(
      decideScan("SPX123456", {
        recordingReceipt: "SPX123456",
        todayComplete: new Set(),
      })
    ).toEqual({ type: "ignore" })
  })

  it("ignores an invalid scan while recording", () => {
    expect(
      decideScan("EAN13", {
        recordingReceipt: "SPX123456",
        todayComplete: new Set(),
      })
    ).toEqual({ type: "ignore" })
  })

  it("rejects an invalid scan when idle", () => {
    expect(
      decideScan("nope", {
        recordingReceipt: null,
        todayComplete: new Set(),
      })
    ).toEqual({ type: "reject", reason: "invalid" })
  })

  it("rejects a receipt that already has a complete clip today", () => {
    expect(
      decideScan("SPX123456", {
        recordingReceipt: null,
        todayComplete: new Set(["SPX123456"]),
      })
    ).toEqual({ type: "reject", reason: "duplicate" })
  })

  it("switches when a different valid receipt arrives", () => {
    expect(
      decideScan("JNE998877", {
        recordingReceipt: "SPX123456",
        todayComplete: new Set(),
      })
    ).toEqual({
      type: "switch",
      stoppedReceipt: "SPX123456",
      startReceipt: "JNE998877",
    })
  })
})

describe("completeReceiptsOnDay", () => {
  it("counts only complete clips that started on that local day", () => {
    const receipts = completeReceiptsOnDay(
      [
        { receipt: "DONE1", startedAt: day, complete: true },
        { receipt: "BROKEN", startedAt: day, complete: false },
        { receipt: "YDAY", startedAt: yesterday, complete: true },
      ],
      day
    )

    expect([...receipts]).toEqual(["DONE1"])
  })
})

describe("stop and file naming", () => {
  it("treats button and next receipt as complete", () => {
    expect(isCompleteStop("button")).toBe(true)
    expect(isCompleteStop("next-receipt")).toBe(true)
    expect(isCompleteStop("camera-lost")).toBe(false)
    expect(isCompleteStop("max-duration")).toBe(false)
    expect(isCompleteStop("tab-closed")).toBe(false)
    expect(isCompleteStop("refresh")).toBe(false)
  })

  it("builds a local filename and marks a broken clip", () => {
    const startedAt = new Date(2026, 8, 22, 7, 8, 9)
    expect(
      clipFilename({
        receipt: "SPX123456",
        startedAt,
        incomplete: false,
        mime: "video/mp4",
      })
    ).toBe("SPX123456_20260922-070809.mp4")
    expect(
      clipFilename({
        receipt: "SPX123456",
        startedAt,
        incomplete: true,
        mime: "video/webm",
      })
    ).toBe("SPX123456_20260922-070809_putus.webm")
    expect(stampText(startedAt)).toBe("2026-09-22 07:08:09")
  })

  it("prefers mp4 when the browser supports it", () => {
    expect(chooseMime((mime) => mime === "video/mp4")).toBe("video/mp4")
    expect(chooseMime(() => false)).toBe("video/webm")
  })

  it("clamps the duration limit to 1 through 15 minutes", () => {
    expect(clampMaxMinutes(5)).toBe(5)
    expect(clampMaxMinutes(0)).toBe(1)
    expect(clampMaxMinutes(60)).toBe(15)
    expect(clampMaxMinutes(Number.NaN)).toBe(5)
  })
})

describe("scanner and camera gates", () => {
  it("accepts a fast Enter or Tab burst of at least 6 characters", () => {
    expect(
      looksLikeHidScan({
        gapsMs: [10, 12, 20, 30, 40],
        length: 6,
        terminator: "Enter",
      })
    ).toBe(true)
    expect(
      looksLikeHidScan({
        gapsMs: [10, 12, 80, 10, 10],
        length: 6,
        terminator: "Enter",
      })
    ).toBe(false)
    expect(
      looksLikeHidScan({
        gapsMs: [10, 10, 10, 10, 10],
        length: 6,
        terminator: "a",
      })
    ).toBe(false)
  })

  it("allows only QR, Code 128, and Code 39, and requires two identical reads", () => {
    expect(cameraFormatAllowed("qr_code")).toBe(true)
    expect(cameraFormatAllowed("code_128")).toBe(true)
    expect(cameraFormatAllowed("code_39")).toBe(true)
    expect(cameraFormatAllowed("ean_13")).toBe(false)
    expect(acceptCameraRead(null, "SPX123456").accepted).toBe(false)
    expect(acceptCameraRead("SPX123456", "SPX123456").accepted).toBe(true)
  })
})
