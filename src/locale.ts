export const LOCALES = ["id", "en"] as const

export type Locale = (typeof LOCALES)[number]

const STORAGE_KEY = "bukti-kemas-locale"

export function localeFromLanguage(language: string): Locale {
  return language.toLowerCase().startsWith("id") ? "id" : "en"
}

export function readStoredLocale(navigatorLanguage: string): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "id" || stored === "en") {
      return stored
    }
  } catch {
    // Private mode can throw. Fall through to the browser language.
  }

  return localeFromLanguage(navigatorLanguage)
}

export function storeLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale)
}

export const copy = {
  id: {
    name: "Bukti Kemas",
    record: "Rekam",
    search: "Cari",
    settings: "Setelan",
    scaffoldTitle: "Versi ini belum merekam",
    scaffoldBody:
      "Repo dan tampilan sudah ada. Scan, kamera, suara, dan simpan folder menyusul di v1.",
    searchLabel: "Nomor resi",
    searchPlaceholder: "Ketik resi",
    searchEmpty: "Katalog masih kosong. Belum ada video di versi ini.",
    theme: "Tema gelap",
    themeHint: "Tersimpan di perangkat ini. Tidak mengikuti tema Windows.",
    language: "Bahasa",
    source: "Kode sumber (AGPL-3.0)",
  },
  en: {
    name: "Bukti Kemas",
    record: "Record",
    search: "Search",
    settings: "Settings",
    scaffoldTitle: "This build does not record yet",
    scaffoldBody:
      "The repo and shell are here. Scan, camera, voice, and folder save land in v1.",
    searchLabel: "Receipt number",
    searchPlaceholder: "Type a receipt",
    searchEmpty: "The catalog is empty. This build has no videos yet.",
    theme: "Dark theme",
    themeHint: "Saved on this device. It does not follow the Windows theme.",
    language: "Language",
    source: "Source code (AGPL-3.0)",
  },
} as const
