
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Resumesteps from './Pages/Resumesteps'
import Userform from './Pages/Userform'
import Downloads from './Pages/Downloads'
import Allresumes from './Pages/Allresumes'
import View from './Pages/View'
import Pnf from './Pages/Pnf'
  import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Header/>
      <Routes>
<Route path='' element={<Home/>}/>
<Route path='/steps' element={<Resumesteps/>}/>
<Route path='/form' element={<Userform/>}/>
<Route path='/download' element={<Downloads/>}/>
<Route path='/all-resumes' element={<Allresumes/>}/>
<Route path='/view/:id' element={<View/>}/>
<Route path='/*' element={<Pnf/>}/>
      </Routes>
      <Footer/>


      <ToastContainer position='top-right' autoClose={5000} theme='colored'/>
      
    </>
  )
}

export default App
