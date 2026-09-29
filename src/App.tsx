import { useEffect, useState } from "react"
import {
  ArchiveX,
  ArrowRight,
  Camera,
  Circle,
  FolderOpen,
  HardDrive,
  Package,
  ScanLine,
  Search,
  Settings2,
  Video,
} from "lucide-react"
import { SlotText } from "slot-text/react"
import "slot-text/style.css"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"
import { copy, readStoredLocale, storeLocale, type Locale } from "@/locale"
import "./App.css"

const SOURCE_URL = "https://github.com/katsugtgz/bukti-kemas"

type Screen = "record" | "search" | "settings"
type Copy = Record<keyof (typeof copy)["en"], string>

type PageNavProps = {
  screen: Screen
  text: Copy
  onChange: (screen: Screen) => void
}

function Brand({
  onHome,
  label,
  descriptor,
}: {
  onHome: () => void
  label: string
  descriptor: string
}) {
  return (
    <button
      className="app-brand"
      type="button"
      onClick={onHome}
      aria-label={label}
    >
      <span className="app-brand-mark" aria-hidden="true">
        <Package />
      </span>
      <span className="app-brand-copy">
        <strong>Bukti Kemas</strong>
        <span>{descriptor}</span>
      </span>
    </button>
  )
}

function PageNav({ screen, text, onChange }: PageNavProps) {
  const items: { key: Screen; label: string; icon: typeof Video }[] = [
    { key: "record", label: text.record, icon: Video },
    { key: "search", label: text.search, icon: Search },
    { key: "settings", label: text.settings, icon: Settings2 },
  ]

  return (
    <nav className="app-nav" aria-label={text.mainNavigation}>
      <p className="sidebar-section-label">{text.workspace}</p>
      {items.map(({ key, label, icon: Icon }) => (
        <Button
          key={key}
          type="button"
          variant="ghost"
          aria-current={screen === key ? "page" : undefined}
          className={`app-nav-button ${screen === key ? "is-current" : ""}`}
          onClick={() => onChange(key)}
        >
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </Button>
      ))}
    </nav>
  )
}

function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="page-heading">
      <div>
        <p className="app-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      <span className="build-badge">v0.1.0 · {eyebrow}</span>
    </section>
  )
}

function RecordPage({ text, onSearch }: { text: Copy; onSearch: () => void }) {
  return (
    <>
      <PageHeading
        eyebrow={text.recordWorkspace}
        title={text.recordHeading}
        description={text.recordDescription}
      />
      <section className="workbench-grid" aria-label={text.recordStation}>
        <Card className="queue-card app-card">
          <CardHeader className="queue-card-heading">
            <div>
              <p className="app-eyebrow">{text.atStation}</p>
              <CardTitle>{text.scanNext}</CardTitle>
              <CardDescription>{text.scaffoldBody}</CardDescription>
            </div>
            <span className="coming-badge">{text.v1Preview}</span>
          </CardHeader>
          <CardContent className="queue-card-content">
            <div className="receipt-placeholder">
              <span className="receipt-placeholder-icon" aria-hidden="true">
                <ScanLine />
              </span>
              <div>
                <Label htmlFor="receipt-placeholder">{text.searchLabel}</Label>
                <Input
                  id="receipt-placeholder"
                  className="app-input"
                  disabled
                  placeholder={text.receiptScanComing}
                  autoComplete="off"
                />
              </div>
            </div>
            <Button type="button" className="record-unavailable" disabled>
              <Circle aria-hidden="true" />
              {text.recordingComing}
            </Button>
            <div className="queue-divider" />
            <div className="recent-heading">
              <div>
                <p className="app-eyebrow">{text.recentProof}</p>
                <h2>{text.recentClips}</h2>
              </div>
              <Button
                type="button"
                variant="ghost"
                className="text-action"
                onClick={onSearch}
              >
                {text.browseSearch} <ArrowRight aria-hidden="true" />
              </Button>
            </div>
            <div className="empty-clips">
              <span className="empty-clips-icon" aria-hidden="true">
                <ArchiveX />
              </span>
              <div>
                <strong>{text.noClipsTitle}</strong>
                <p>{text.noClipsBody}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="camera-card app-card">
          <CardHeader className="camera-card-heading">
            <div className="camera-heading-label">
              <span className="camera-status-dot" />
              <span>{text.camera}</span>
            </div>
            <span className="connection-badge">{text.notConnected}</span>
          </CardHeader>
          <CardContent className="camera-card-content">
            <div className="camera-empty-stage">
              <div className="camera-empty-icon" aria-hidden="true">
                <Camera />
              </div>
              <h2>{text.cameraPreview}</h2>
              <p>{text.cameraBody}</p>
            </div>
            <div className="camera-card-footer">
              <span>
                <HardDrive aria-hidden="true" /> {text.localOnly}
              </span>
              <span>
                <FolderOpen aria-hidden="true" /> {text.folderAccessV1}
              </span>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  )
}

function SearchPage({ text }: { text: Copy }) {
  return (
    <>
      <PageHeading
        eyebrow={text.searchWorkspace}
        title={text.searchHeading}
        description={text.searchDescription}
      />
      <Card className="search-card app-card">
        <CardHeader>
          <p className="app-eyebrow">{text.localCatalog}</p>
          <CardTitle>{text.search}</CardTitle>
          <CardDescription>{text.searchHelp}</CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="receipt-search">{text.searchLabel}</Label>
          <div className="search-field-wrap">
            <Search aria-hidden="true" />
            <Input
              id="receipt-search"
              className="app-input search-input"
              disabled
              placeholder={text.searchComing}
              autoComplete="off"
            />
          </div>
          <div className="search-empty-state" aria-live="polite">
            <span className="empty-clips-icon" aria-hidden="true">
              <ArchiveX />
            </span>
            <strong>{text.noClipsTitle}</strong>
            <p>{text.searchEmpty}</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function SettingsPage({
  text,
  theme,
  locale,
  setTheme,
  chooseLocale,
}: {
  text: Copy
  theme: "dark" | "light"
  locale: Locale
  setTheme: (theme: "dark" | "light") => void
  chooseLocale: (locale: Locale) => void
}) {
  return (
    <>
      <PageHeading
        eyebrow={text.settingsWorkspace}
        title={text.settingsHeading}
        description={text.settingsDescription}
      />
      <section className="settings-grid">
        <Card className="settings-card app-card">
          <CardHeader>
            <p className="app-eyebrow">{text.appearance}</p>
            <CardTitle>{text.settings}</CardTitle>
            <CardDescription>{text.settingsHint}</CardDescription>
          </CardHeader>
          <CardContent className="settings-card-content">
            <div className="settings-row">
              <div className="settings-row-icon" aria-hidden="true">
                <Circle />
              </div>
              <div className="settings-row-copy">
                <Label htmlFor="dark-theme">{text.theme}</Label>
                <p>{text.themeHint}</p>
              </div>
              <Switch
                id="dark-theme"
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
                aria-label={text.theme}
              />
            </div>
            <div className="settings-row settings-row--language">
              <div className="settings-row-icon" aria-hidden="true">
                <span className="language-glyph">Aa</span>
              </div>
              <div className="settings-row-copy">
                <strong>{text.language}</strong>
                <p>{text.languageHint}</p>
              </div>
              <div
                className="language-buttons"
                role="group"
                aria-label={text.language}
              >
                <Button
                  type="button"
                  variant={locale === "id" ? "secondary" : "ghost"}
                  aria-pressed={locale === "id"}
                  onClick={() => chooseLocale("id")}
                >
                  Indonesia
                </Button>
                <Button
                  type="button"
                  variant={locale === "en" ? "secondary" : "ghost"}
                  aria-pressed={locale === "en"}
                  onClick={() => chooseLocale("en")}
                >
                  English
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <aside className="privacy-card">
          <span className="privacy-icon" aria-hidden="true">
            <HardDrive />
          </span>
          <p className="app-eyebrow">{text.localStorage}</p>
          <h2>{text.privateByDesign}</h2>
          <p>{text.privateBody}</p>
        </aside>
      </section>
    </>
  )
}

export function App() {
  const { theme, setTheme } = useTheme()
  const [screen, setScreen] = useState<Screen>("record")
  const [locale, setLocale] = useState<Locale>(() =>
    readStoredLocale(navigator.language)
  )
  const text = copy[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = text.name
  }, [locale, text.name])

  function chooseLocale(next: Locale) {
    storeLocale(next)
    setLocale(next)
  }

  const screenTitle =
    screen === "record"
      ? text.record
      : screen === "search"
        ? text.search
        : text.settings

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        {text.skipToContent}
      </a>
      <aside className="app-sidebar">
        <Brand
          label={text.name}
          descriptor={text.brandDescriptor}
          onHome={() => setScreen("record")}
        />
        <PageNav screen={screen} text={text} onChange={setScreen} />
        <div className="sidebar-bottom">
          <div className="sidebar-device-card">
            <span className="device-status-dot" />
            <span>
              <small>{text.deviceStatus}</small>
              <strong>{text.localDevice}</strong>
            </span>
          </div>
          <p className="sidebar-promise">{text.noAccountNoCloud}</p>
          <span className="app-version">v0.1.0</span>
        </div>
      </aside>

      <div className="app-main-column">
        <header className="app-topbar">
          <div className="breadcrumb">
            <span>{text.workspace}</span>
            <ArrowRight aria-hidden="true" />
            <strong aria-live="polite" aria-atomic="true">
              <SlotText text={screenTitle} />
            </strong>
          </div>
          <span className="topbar-local-badge">
            <HardDrive aria-hidden="true" /> {text.localOnly}
          </span>
        </header>

        <main id="main-content" className="app-page" key={screen}>
          {screen === "record" ? (
            <RecordPage text={text} onSearch={() => setScreen("search")} />
          ) : screen === "search" ? (
            <SearchPage text={text} />
          ) : (
            <SettingsPage
              text={text}
              theme={theme}
              locale={locale}
              setTheme={setTheme}
              chooseLocale={chooseLocale}
            />
          )}
        </main>

        <footer className="app-footer">
          <a href={SOURCE_URL}>{text.source}</a>
          <span>{text.footerLocal}</span>
        </footer>
      </div>
    </div>
  )
}

export default App
