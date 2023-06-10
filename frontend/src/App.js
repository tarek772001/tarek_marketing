import React from 'react'
import { Container } from 'react-bootstrap'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Router> 
    <Header />
    <main className='py-3'>

     <Container>
        <Routes>
          <Route path='/' element={<HomeScreen />} exact  />
          <Route path='/product/:id' element={<ProductScreen />}  />
          <Route path='/cart' element={<CartScreen />}  />
          <Route path='/Login' element={<LoginScreen />}  />
        </Routes>
      </Container> 
      
    </main>

    <Footer />

    <ToastContainer/>

    </Router> 
    </>
  );
}

export default App;
