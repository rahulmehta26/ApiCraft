import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/home/home'
import Craft from './pages/api-preview/craft'

const App = () => {
  return (
    <Routes>

      <Route element={<Layout />} >
        
        <Route path='/' element={<Home />} />
        <Route path='/craft' element = { <Craft /> } />

      </Route>
    </Routes>
  )
}

export default App