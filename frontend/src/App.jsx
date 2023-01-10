import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import EditCelebrities from './component/EditCelebritie'
import Home from './component/Home'

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit/:id' element={<EditCelebrities />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
