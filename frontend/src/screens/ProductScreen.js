//pour la partie cart (ajout au panier)
import React, { useState} from 'react';

import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'

import {useDispatch} from 'react-redux'

import Rating from '../components/Rating'

import Loader from '../components/Loader';
import Message from '../components/Message';

//import React, { useState, useEffect} from 'react'
//import axios from 'axios'
//on va travailler avec redux
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';

//pour la partie cart
import {addToCart} from '../slices/cartSlice'

//maintenant les donnnées des produits sont importés depuis
//le backend avec axios
//import products from '../products'

const ProductScreen = () => {
    //const [product, setProduct] = useState([])
    const { id: productId } = useParams();

  //pour la partie cart
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //pour la pertie cart ou panier, par defaut un seul
  const [qty, setQty] = useState(1);

  //console.log(qty);

  
  //travailler avec redux
  const {data: product, isLoading, error } = useGetProductDetailsQuery
  (productId);

    // useEffect(() =>{
    //     async function fetchProduct() {
    //         const { data } =  await axios.get(`/api/products/${id}`)
    //         setProduct(data)
    //     }
    //     fetchProduct()

    // },[])

  //pour la partie cart aussi
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  }

  return(
    <>
      <Link className='btn btn-light my-3' to='/'>
       Retourner en arrière
      </Link>

     { isLoading ? (
      <Loader />
     ): error ?  (
      <Message variant='danger'>{ error?.data?.message || error.error }</Message>
     ) : (
      <Row>
      <Col md={5}>
          <Image src={product.image} alt={product.name}  fluid />
      </Col>
      <Col md={4}>
          <ListGroup variant='flush'>
             <ListGroup.Item>
                <h6>{product.name}</h6>
             </ListGroup.Item>
             <ListGroup.Item>
                 <Rating value={product.rating} text={`${product.numReviews} vues`} />
             </ListGroup.Item>
             <ListGroup.Item>
                 Prix: ${product.price}
             </ListGroup.Item>
             <ListGroup.Item>
                 Description: {product.description}
             </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
           <Card>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <Row>
                         <Col>
                           Prix :
                         </Col>
                         <Col>
                           <strong>${product.price}</strong>
                         </Col>
                      </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Row>
                         <Col>
                           Status :
                         </Col>
                         <Col>
                           {product.countInStock > 0 ? 'En Stock' : 'N\'est pas disponible'}
                         </Col>
                      </Row>
                  </ListGroup.Item>

          {product.countInStock > 0 && (
            <ListGroup.Item>
              <Row>
                <Col>Qty</Col>
                <Col>
                  <Form.Control
                    as='select'
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}>
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
          )}

                  <ListGroup.Item>
                     <Button className='btn-block' 
                     type='button' 
                     disabled={product.countInStock === 0}
                     onClick={addToCartHandler}
                     >
                        Ajouter au panier
                     </Button>
                  </ListGroup.Item>
               </ListGroup>
           </Card>
        </Col>
   </Row>
     ) }

  
    </>
  );
};

export default ProductScreen