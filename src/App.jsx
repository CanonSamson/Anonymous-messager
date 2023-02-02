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


function App() {


  return (

    <BrowserRouter >
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<PrivateRoute />}  >
            <Route path='home' element={<Home />} />
            <Route path='mymessage/:id' element={<MyMessage />} />
          </Route>
          <Route path='/:id' element={<Messsage />} />
          <Route path='*' element={<NotFund />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
