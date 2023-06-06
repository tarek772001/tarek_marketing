//import React, {useEffect, useState} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

import Loader from '../components/Loader';
import Message from '../components/Message';

//import axios from 'axios'
//maintenant les donnnées des produits sont importés depuis
//le backend avec axios

//import products from '../products'

//travailler avec Redux
import { useGetProductsQuery } from '../slices/productsApiSlice';


const HomeScreen = () => {

//travailler avec redux
const { data: products, isLoading, error } = useGetProductsQuery(); 

  //const [products, setProducts] = useState([])

  // useEffect(() => {
  //   //console.log("hello")
  //   const fetchProducts = async () =>{
  //     const { data } = await axios.get('/api/products')

  //     setProducts(data)
  //   }

  //   fetchProducts()
  // }, [])

  return (
    <>

    { isLoading ? (
      <Loader />
    ) : error ? (
    <Message variant='danger'>{ error?.data?.message || error.error }</Message>
    ) : (<>
        <h1>Latest Products</h1>
        <Row>
           {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                 <Product product={product} />
              </Col>
           ))}
        </Row>
    </>)  }

      
    </>
  )
}

export default HomeScreen