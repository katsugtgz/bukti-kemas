import { describe, expect, it } from "vitest"
import { localeFromLanguage } from "./locale"

describe("localeFromLanguage", () => {
  it("uses Indonesian when the language starts with id", () => {
    expect(localeFromLanguage("id-ID")).toBe("id")
    expect(localeFromLanguage("ID")).toBe("id")
  })

  it("uses English otherwise", () => {
    expect(localeFromLanguage("en-US")).toBe("en")
    expect(localeFromLanguage("jv")).toBe("en")
  })
})
