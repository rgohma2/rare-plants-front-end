import React from 'react';
import './App.css';
import styled from 'styled-components';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button';

import LoginRegister from './LoginRegister'

const HoverText = styled.span`
  color: #000;
  :hover {
    color: darkgreen;
    cursor: pointer;
  }
`


class App extends React.Component {
  constructor() {

    super()

    this.state = {
      modalOpen: false
    }
  }

  toggleModal = (e) => {
    if (e !== undefined) {
      e.preventDefault()  
    }
    this.setState({
      modalOpen: this.state.modalOpen === false ? true : false
    })
  }

  render(){
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="light" className="justify-content-between navbar" sticky="top" style={{boxShadow:'0px 0px 7px 0px black', fontFamily: 'Poiret One, cursive', fontSize: '1.5em'}}>
            <Navbar.Brand href="home" style={{fontSize: '1.75em', color: 'green'}}>
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
            
              <Nav.Link onClick={this.toggleModal} href="login" style={{marginLeft:'10px'}}>Login</Nav.Link>
            
            </Navbar.Collapse>
          </Navbar>
          <div>
            {
              this.state.modalOpen
              ?
              <LoginRegister
              toggleModal={this.toggleModal}
              />
              :
              null
            }

            <Container fluid style={{ 
              height:'800px', 
              backgroundImage:`url(/tropicalplants2.jpeg)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              textAlign: 'center',
              color: 'white',
              // background: 
              //   `repeating-radial-gradient(
              //     circle at 0 0, 
              //     #FFEBCD,
              //     #DEB887 90px
              //   )`
              fontFamily: 'Poiret One, cursive',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>

              <Jumbotron style={{
                fontFamily: 'Poiret One, cursive', 
                color: 'black', 
                background: 'rgba(248,249,250,0.6)', 
                width: '95%'
              }}>
                <h1 style={{fontSize:'4em'}}>All the Plants of Tommorrow <br/> Are the Seeds of Today</h1>
                <p style={{fontSize: '2em'}}> Become a <HoverText style={{textDecoration: 'underline',}}> Green Thumb Planter Box</HoverText> member to start your journey today. </p>
              </Jumbotron>
            </Container>
                <Container style={{display:'flex', marginTop: '5%', fontSize: '1.5em', color: 'black'}}>
                  <Container style={{backgroundColor: 'rgba(248,249,250,0.6)', padding: '15px', borderRadius: '20px', marginRight: '10px'}}>
                    <p>The <span style={{textDecoration: 'underline', color:'darkgreen'}}>Rare Plants Seed Exchange</span> connects you to all kinds of unique seeds</p>
                    <Button size='lg'>Seed Exchange</Button>
                  </Container>
                  <Container style={{backgroundColor: 'rgba(248,249,250,0.6)', padding: '15px', borderRadius: '20px', marginLeft: '10px'}}>
                    <p>The <span style={{textDecoration: 'underline', color:'darkgreen'}}>Green Thumb Planter Box</span> is the easiest way to start growing your very own unique plants</p>
                    <Button size='lg'>Learn More</Button>
                  </Container>
                </Container>
            <Container style={{backgroundColor: 'rgb(248,249,250)', height: '760px'}}>
            hello
            </Container>
          </div>
      </div>
    );
  }
}

export default App;
