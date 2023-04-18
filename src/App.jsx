import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './page/LoginPage'
import SignUp from './page/SignUp'
import PrivateRoute from './page/PrivateRoute'
import Home from './page/Home'
import Messsage from './page/Message'
import MyMessage from './page/MyMessage'
import { AuthProvider } from './Auth'
import NotFund from './page/NotFund'
import ScrollToTop from './ScrollToTop'
import LandingPage from './page/LandingPage'


function App() {


  return (

    <BrowserRouter >
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<PrivateRoute />}  >
            <Route path='home' element={<Home />} />
            <Route path='/m/:id' element={<MyMessage />} />
          </Route>
          <Route path='/:id' element={<Messsage />} />
          <Route path='*' element={<NotFund />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
