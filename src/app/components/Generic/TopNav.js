import React from 'react';
import { Nav, Navbar, Button, Container } from 'react-bootstrap';
import './nav.scss';

const TopNav = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='/'>
          <img src='/images/beckett-logo.svg' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/submission'>
              <Button size='sm'>Submit Item</Button>
            </Nav.Link>
            <Nav.Link href='/gallery'>Gallery</Nav.Link>
            <Nav.Link href='/market'>Market</Nav.Link>
          </Nav>
          <Nav className='ml-auto'>
            <Nav.Link href='/profile'>
              <i className='fa-solid fa-user'></i>
            </Nav.Link>
            <Nav.Link href='/cart'>
              <i className='fa-solid fa-cart-shopping'></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNav;
