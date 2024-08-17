import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { UserContextProvider } from "./contexts/UserContext";
import './App.css'

function App() {

  return (
    <>
        <Navbar />
        <Outlet />
    </>
  )
}

export default App
