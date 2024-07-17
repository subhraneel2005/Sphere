
import HomePage from './components/Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SidebarFooter from './components/SidebarFooter'
import Profile from './components/Profile'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<SidebarFooter />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
