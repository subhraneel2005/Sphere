
import HomePage from './components/Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SidebarFooter from './components/SidebarFooter'
import Profile from './components/Profile'
import SinglePost from './components/SinglePost'
import Explore from './components/Explore'
import OthersPosts from './components/OthersPosts'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<SidebarFooter />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/:id/post/:postId" element={<SinglePost />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:postId" element={<OthersPosts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
