import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Home } from "./pages/home"
import './App.css'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <Home />
      <Toaster />
    </ThemeProvider>
  )
}

export default App
