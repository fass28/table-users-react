import { ThemeProvider } from "@/components/themeProvider"
import { Home } from "./pages/home"
import './App.css'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <Home />
    </ThemeProvider>
  )
}

export default App
