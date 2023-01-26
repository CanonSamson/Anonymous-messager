import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Messsage from './page/Message'
import { AuthProvider } from './Auth'
import NotFund from './page/NotFund'
import ScrollToTop from './ScrollToTop'


function AppMessage() {
  
 
  return (
   <AuthProvider>
      <BrowserRouter >
        <ScrollToTop />
        <Routes>
          <Route path='/message/:id' element={<Messsage /> } />
          <Route path='*' element={<NotFund />} />
        </Routes>
      </BrowserRouter>
   </AuthProvider> 
 
  )
}

export default AppMessage
