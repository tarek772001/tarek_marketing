import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap' 
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout }  from '../slices/authSlice'

const Header = () => {

        const { cartItems } = useSelector((state) => state.cart);

        const { userInfo } = useSelector((state) => state.auth);

        const dispatch = useDispatch();
        const navigate = useNavigate();

        const [logoutApiCall] = useLogoutMutation();

        const logoutHandler = async () =>{
          try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login')
          } catch (err){
            console.log(err);
          }
        }
        
  return <header> 
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
      
      <LinkContainer to="/">
        <Navbar.Brand>Application Entreprises
        </Navbar.Brand>
      </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">

            <LinkContainer to="/cart">
            <Nav.Link>
            <i className='fas fa-shopping-cart'></i> Cart
                {
                  cartItems.length > 0 && (
                    <Badge pill bg='success' style={{marginLeft:
                    '5px'}}>
                      { cartItems.reduce((a, c) => a + c.qty, 0) }
                    </Badge>
                  )   
                }
            </Nav.Link>
            </LinkContainer>

            { userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                  </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
              <Nav.Link href='/login'>
              <i className='fas fa-user'></i> Sign in
              </Nav.Link>
              </LinkContainer>
            ) }


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
}

export default Header