import React from 'react';
import { Nav, Navbar, NavDropdown, Button, Container } from 'react-bootstrap';
import './Nav.scss';

const TopNav = () => {
  //todo: get this from redux
  const cart = [];
  return (
    <Navbar bg='dark' variant='dark' expand='lg' fixed='top'>
      <Container>
        <Navbar.Brand href='/'>
          <img src='/images/beckett-logo.svg' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='m-auto'>
            <Nav.Link href='/about'>About Vault</Nav.Link>
            <Nav.Link href='/gallery'>My Collection</Nav.Link>
            <Nav.Link href='/market'>Marketplace</Nav.Link>
          </Nav>
          <Nav className='ml-auto'>
            <Nav.Link href='/submission'>
              <Button size='sm'>Submit Item</Button>
            </Nav.Link>
            <NavDropdown
              title={<i className='fa-solid fa-user'></i>}
              id='basic-nav-dropdown'
            >
              <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
              <NavDropdown.Item href='#'>Account</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#'>Logout</NavDropdown.Item>
            </NavDropdown>
            {cart.length ? (
              <Nav.Link href='/cart'>
                <i className='fa-solid fa-cart-shopping'></i>
              </Nav.Link>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNav;
