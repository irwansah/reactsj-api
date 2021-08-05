import React from 'react'
import { Navbar,Container,Nav,NavDropdown } from 'react-bootstrap'
const NavbarComponent = () => {
  return (
    <Navbar variant="dark" className="blues" vexpand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="#home" className="NavbarBrand"><strong>@Kasirku</strong></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Beranda</Nav.Link>
              <Nav.Link href="#transaction">Transaksi</Nav.Link>
              <NavDropdown title="Data" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Data Kategori</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Data Menu</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Data Transaksi</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Statistik</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#transaction">Bantuan</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default NavbarComponent
