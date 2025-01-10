import { ThemeProvider } from "@/components/theme-provider"
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
