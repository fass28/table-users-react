import { ThemeProvider } from "@//components/theme-provider"
import { ModeToggle } from "./components/mode-toggle"

import './App.css'

function App() {

  return (
    <ThemeProvider defaultTheme="dark">
      <ModeToggle />
    </ThemeProvider>
  )
}

export default App
