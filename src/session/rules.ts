export const MIN_RECEIPT_LENGTH = 6
export const MAX_RECEIPT_LENGTH = 40
export const HID_GAP_MS = 50
export const DEFAULT_MAX_MINUTES = 5
export const MIN_MAX_MINUTES = 1
export const MAX_MAX_MINUTES = 15

export const CAMERA_BARCODE_FORMATS = [
  "qr_code",
  "code_128",
  "code_39",
] as const

const RECEIPT_PATTERN = /^[A-Z0-9-]{6,40}$/

export type StopReason =
  | "button"
  | "next-receipt"
  | "camera-lost"
  | "refresh"
  | "max-duration"
  | "tab-closed"

export type CatalogClip = {
  receipt: string
  startedAt: Date
  complete: boolean
}

export type ScanDecision =
  | { type: "ignore" }
  | { type: "reject"; reason: "invalid" | "duplicate" }
  | { type: "start"; receipt: string }
  | { type: "switch"; stoppedReceipt: string; startReceipt: string }

export function normalizeReceipt(raw: string): string | null {
  const compact = raw.toUpperCase().replace(/\s+/g, "")
  if (!RECEIPT_PATTERN.test(compact)) {
    return null
  }

  return compact
}

export function sameLocalDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

export function completeReceiptsOnDay(
  clips: readonly CatalogClip[],
  day: Date
): Set<string> {
  const receipts = new Set<string>()

  for (const clip of clips) {
    if (clip.complete && sameLocalDay(clip.startedAt, day)) {
      receipts.add(clip.receipt)
    }
  }

  return receipts
}

export function decideScan(
  raw: string,
  context: {
    recordingReceipt: string | null
    todayComplete: ReadonlySet<string>
  }
): ScanDecision {
  const receipt = normalizeReceipt(raw)

  if (!receipt) {
    return context.recordingReceipt
      ? { type: "ignore" }
      : { type: "reject", reason: "invalid" }
  }

  if (context.recordingReceipt === receipt) {
    return { type: "ignore" }
  }

  if (context.todayComplete.has(receipt)) {
    return { type: "reject", reason: "duplicate" }
  }

  if (context.recordingReceipt) {
    return {
      type: "switch",
      stoppedReceipt: context.recordingReceipt,
      startReceipt: receipt,
    }
  }

  return { type: "start", receipt }
}

export function isCompleteStop(reason: StopReason): boolean {
  return reason === "button" || reason === "next-receipt"
}

export function clampMaxMinutes(value: number): number {
  if (!Number.isFinite(value)) {
    return DEFAULT_MAX_MINUTES
  }

  return Math.min(MAX_MAX_MINUTES, Math.max(MIN_MAX_MINUTES, Math.round(value)))
}

export function chooseMime(
  isSupported: (mime: string) => boolean
): "video/mp4" | "video/webm" {
  if (isSupported("video/mp4")) {
    return "video/mp4"
  }

  return "video/webm"
}

function pad(value: number): string {
  return String(value).padStart(2, "0")
}

export function fileStamp(date: Date): string {
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`
  )
}

export function stampText(date: Date): string {
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    ` ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  )
}

export function clipFilename(input: {
  receipt: string
  startedAt: Date
  incomplete: boolean
  mime: "video/mp4" | "video/webm"
}): string {
  const receipt = input.receipt.replace(/[^A-Z0-9-]/g, "_")
  const broken = input.incomplete ? "_putus" : ""
  const extension = input.mime === "video/mp4" ? "mp4" : "webm"
  return `${receipt}_${fileStamp(input.startedAt)}${broken}.${extension}`
}

export function looksLikeHidScan(input: {
  gapsMs: readonly number[]
  length: number
  terminator: string
}): boolean {
  if (input.terminator !== "Enter" && input.terminator !== "Tab") {
    return false
  }

  if (input.length < MIN_RECEIPT_LENGTH) {
    return false
  }

  if (input.gapsMs.length !== input.length - 1 || input.gapsMs.length === 0) {
    return false
  }

  return input.gapsMs.every((gap) => gap >= 0 && gap < HID_GAP_MS)
}

export function cameraFormatAllowed(format: string): boolean {
  return (CAMERA_BARCODE_FORMATS as readonly string[]).includes(format)
}

export function acceptCameraRead(
  previous: string | null,
  next: string
): { accepted: boolean; pending: string } {
  return {
    accepted: previous === next,
    pending: next,
  }
}
