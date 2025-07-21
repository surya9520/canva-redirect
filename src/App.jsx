import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CanvaRedirect from './pages/CanvaRedirect'
import ReturnNav from './pages/ReturnNav'

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/canvaDesign/:editUrl" element={<CanvaRedirect />} />
      <Route path="/navReturn" element={<ReturnNav/>} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
