import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';


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
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
              <Button variant="outline-success">Search</Button>
            </Form>
          
            <Nav.Link href="login" style={{marginLeft:'10px'}}>Login</Nav.Link>
          
          </Navbar.Collapse>
        </Navbar>
        <div>
          <div style={{ 
            height:'760px', 
            backgroundImage:`url(/woodpannel2.jpeg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            textAlign: 'center',
            color: 'white',
            background: 
              `repeating-radial-gradient(
                circle at 0 0, 
                #FFEBCD,
                #DEB887 90px
              )`
          }}>

          Plants Are Cool
          </div>
        </div>
    </div>
  );
}

export default App;
