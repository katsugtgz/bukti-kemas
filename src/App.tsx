import { useEffect, useState } from "react"
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

const SOURCE_URL = "https://github.com/katsugtgz/bukti-kemas"

type Screen = "record" | "search" | "settings"

const screens: Screen[] = ["record", "search", "settings"]

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

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-3xl flex-col gap-6 p-4 sm:p-6">
      <header className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{text.name}</h1>
          <p className="text-muted-foreground">v0.1.0</p>
        </div>
        <nav className="grid grid-cols-3 gap-2">
          {screens.map((item) => (
            <Button
              key={item}
              size="lg"
              variant={screen === item ? "default" : "outline"}
              className="h-14 text-base"
              onClick={() => setScreen(item)}
            >
              {text[item]}
            </Button>
          ))}
        </nav>
      </header>

      <main className="flex flex-1 flex-col gap-4">
        {screen === "record" ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{text.scaffoldTitle}</CardTitle>
              <CardDescription className="text-base">
                {text.scaffoldBody}
              </CardDescription>
            </CardHeader>
          </Card>
        ) : null}

        {screen === "search" ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{text.search}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Label htmlFor="receipt" className="text-base">
                {text.searchLabel}
              </Label>
              <Input
                id="receipt"
                className="h-12 text-base"
                placeholder={text.searchPlaceholder}
                autoComplete="off"
              />
              <p className="text-muted-foreground">{text.searchEmpty}</p>
            </CardContent>
          </Card>
        ) : null}

        {screen === "settings" ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{text.settings}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label htmlFor="dark-theme" className="text-base">
                    {text.theme}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {text.themeHint}
                  </p>
                </div>
                <Switch
                  id="dark-theme"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) =>
                    setTheme(checked ? "dark" : "light")
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base font-medium">{text.language}</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="lg"
                    className="h-12"
                    variant={locale === "id" ? "default" : "outline"}
                    onClick={() => chooseLocale("id")}
                  >
                    Indonesia
                  </Button>
                  <Button
                    size="lg"
                    className="h-12"
                    variant={locale === "en" ? "default" : "outline"}
                    onClick={() => chooseLocale("en")}
                  >
                    English
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </main>

      <footer className="text-sm text-muted-foreground">
        <a className="underline underline-offset-4" href={SOURCE_URL}>
          {text.source}
        </a>
      </footer>
    </div>
  )
}

export default App
