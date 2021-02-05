import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';


function App() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" className="justify-content-between" sticky="top" style={{boxShadow:'0px 0px 7px 0px black'}}>
          <Navbar.Brand href="home">
            Rare Plants
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="about_us">About Us</Nav.Link>
            <NavDropdown title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item href="link_#1">link 1</NavDropdown.Item>
              <NavDropdown.Item href="link_#2">link 2</NavDropdown.Item>
              <NavDropdown.Item href="link_#3">link 3</NavDropdown.Item>
              <NavDropdown.Item href="link_#4">link 4</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="login">Login</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
    </div>
  );
}

export default App;
