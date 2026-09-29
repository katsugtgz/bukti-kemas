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

    scaffoldBody:
      "Pemindaian resi, kamera, perekaman, dan penyimpanan lokal tersedia di v1.",
    searchLabel: "Nomor resi",

    searchComing: "Pencarian tersedia di v1",
    searchEmpty:
      "Versi ini belum memiliki katalog atau rekaman yang bisa dicari.",
    theme: "Tema gelap",
    themeHint: "Pilihan tema tersimpan di perangkat ini.",
    language: "Bahasa",
    languageHint: "Pilih bahasa antarmuka.",
    source: "Kode sumber (AGPL-3.0)",
    brandDescriptor: "BUKTI PENGEMASAN",
    mainNavigation: "Navigasi utama",
    workspace: "RUANG KERJA",
    recordWorkspace: "MEJA PENGEMASAN",
    recordHeading: "Antrean pengemasan",
    recordDescription: "Satu ruang kerja lokal untuk bukti pengemasan.",
    recordStation: "Stasiun perekaman",
    atStation: "STASIUN AKTIF",
    scanNext: "Paket berikutnya",
    v1Preview: "PRATINJAU V1",
    receiptScanComing: "Pemindaian resi tersedia di v1",
    recordingComing: "Perekaman tersedia di v1",
    recentProof: "ARSIP LOKAL",
    recentClips: "Rekaman terbaru",
    browseSearch: "Buka katalog",
    noClipsTitle: "Belum ada rekaman",
    noClipsBody:
      "Rekaman paket akan muncul di sini setelah fitur perekaman tersedia.",
    camera: "KAMERA",
    notConnected: "BELUM TERHUBUNG",
    cameraPreview: "Pratinjau kamera",
    cameraBody:
      "Dukungan kamera tersedia di v1. Versi ini tidak meminta akses kamera.",
    localOnly: "LOKAL SAJA",
    folderAccessV1: "Akses folder tersedia di v1",
    searchWorkspace: "ARSIP LOKAL",
    searchHeading: "Cari bukti paket",
    searchDescription: "Katalog lokal belum tersedia di versi ini.",
    localCatalog: "KATALOG LOKAL",
    searchHelp: "Pencarian resi aktif setelah rekaman lokal tersedia.",
    settingsWorkspace: "PREFERENSI",
    settingsHeading: "Setelan perangkat",
    settingsDescription: "Atur tampilan aplikasi di perangkat ini.",
    appearance: "TAMPILAN",
    settingsHint: "Preferensi tersimpan lokal di perangkat ini.",
    localStorage: "PENYIMPANAN LOKAL",
    privateByDesign: "Bukti tetap di perangkat Anda",
    privateBody: "Bukti Kemas tidak memakai akun atau penyimpanan cloud.",
    skipToContent: "Lewati ke konten",
    deviceStatus: "STATUS PERANGKAT",
    localDevice: "Perangkat ini",
    noAccountNoCloud: "Tanpa akun. Tanpa cloud.",
    footerLocal: "Dibuat untuk alur kerja lokal.",
  },
  en: {
    name: "Bukti Kemas",
    record: "Record",
    search: "Search",
    settings: "Settings",

    scaffoldBody:
      "Receipt scanning, camera, recording, and local saving arrive in v1.",
    searchLabel: "Receipt number",

    searchComing: "Search is available in v1",
    searchEmpty: "This build has no catalog or recordings to search yet.",
    theme: "Dark theme",
    themeHint: "Your theme choice is saved on this device.",
    language: "Language",
    languageHint: "Choose the interface language.",
    source: "Source code (AGPL-3.0)",
    brandDescriptor: "PACKING PROOF",
    mainNavigation: "Main navigation",
    workspace: "WORKSPACE",
    recordWorkspace: "PACKING DESK",
    recordHeading: "Packing queue",
    recordDescription: "One local workspace for packing proof.",
    recordStation: "Recording station",
    atStation: "ACTIVE STATION",
    scanNext: "Next parcel",
    v1Preview: "V1 PREVIEW",
    receiptScanComing: "Receipt scanning is available in v1",
    recordingComing: "Recording is available in v1",
    recentProof: "LOCAL ARCHIVE",
    recentClips: "Recent recordings",
    browseSearch: "Browse archive",
    noClipsTitle: "No recordings yet",
    noClipsBody:
      "Parcel recordings will appear here when recording is available.",
    camera: "CAMERA",
    notConnected: "NOT CONNECTED",
    cameraPreview: "Camera preview",
    cameraBody:
      "Camera support arrives in v1. This build does not request camera access.",
    localOnly: "LOCAL ONLY",
    folderAccessV1: "Folder access is available in v1",
    searchWorkspace: "LOCAL ARCHIVE",
    searchHeading: "Find packing proof",
    searchDescription: "The local catalog is not available in this build.",
    localCatalog: "LOCAL CATALOG",
    searchHelp: "Receipt search will work when local recordings are available.",
    settingsWorkspace: "PREFERENCES",
    settingsHeading: "Device settings",
    settingsDescription: "Choose how the app looks on this device.",
    appearance: "APPEARANCE",
    settingsHint: "Preferences stay on this device.",
    localStorage: "LOCAL STORAGE",
    privateByDesign: "Proof stays on your device",
    privateBody: "Bukti Kemas uses no account or cloud storage.",
    skipToContent: "Skip to content",
    deviceStatus: "DEVICE STATUS",
    localDevice: "This device",
    noAccountNoCloud: "No account. No cloud.",
    footerLocal: "Built for local workflows.",
  },
} as const
