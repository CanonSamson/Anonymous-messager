import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './page/LoginPage'
import SignUp from './page/SignUp'
import PrivateRoute  from './page/PrivateRoute'
import Home from './page/Home'
import Messsage from './page/Message'
import MyMessage from './page/MyMessage'
import { AuthProvider } from './Auth'


function App() {
  
 
  return (
   <AuthProvider>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<LoginPage /> } />
          <Route path='/signup' element={<SignUp /> } />
          <Route path='/' element={<PrivateRoute />}  >
            <Route path='home' element={<Home /> } />
            <Route path='mymessage' element={<MyMessage /> } />       
          </Route>
          <Route path='message/:id' element={<Messsage /> } />

        </Routes>
      </BrowserRouter>
   </AuthProvider> 
 
  )
}

export default App
