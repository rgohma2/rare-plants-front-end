import React from 'react';
import './App.css';
import styled from 'styled-components';
import Carousel from "react-elastic-carousel";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'

import LoginRegister from './LoginRegister'
import NewPostModal from './NewPostModal'

const HoverText = styled.span`
  color: rgba(79, 43, 61, .8);
  background: linear-gradient(to right, rgba(203,113,138, 0.5) 50%, transparent 50%);
  background-size: 200% 100%;
  background-position: right bottom;
  transition: all .3s ease-out;
  :hover {
    cursor: pointer;
    text-decoration: underline;
    background-position: left bottom;
  }
`

const NavHover = styled.span`
  color: rgba(44, 62, 80, .7);
  :hover {
    cursor: pointer;
    border-bottom: 2px solid rgba(79, 43, 61, .6);
    color: rgba(44, 62, 80, 1)
  }
`
const DropHover = styled.span`
  color: rgba(44, 62, 80, .9);
  :hover {
    cursor: pointer;
    border-bottom: 2px solid rgba(79, 43, 61, .6);
    color: rgba(44, 62, 80, .9)
  }
`



const Hover = styled.span`
  color: rgba(44, 62, 80, 1);
  :hover {
    cursor: pointer;
    border-bottom: 2px solid rgba(79, 43, 61, .8);
    color: rgba(44, 62, 80, 1)
  }
`
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 }
]

class App extends React.Component {
  constructor() {

    super()

    this.state = {
      modalOpen: false,
      postModalOpen: false,
      loggedIn: false,
      modalMessage: "",
      user: ""
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

  togglePostModal = (e) => {
    if (e !== undefined) {
      e.preventDefault()  
    }
    this.setState({
      postModalOpen: this.state.postModalOpen === false ? true : false
    })
  }


  logout = async () => {
    const url = process.env.REACT_APP_API_URL + '/api/v1/users/logout'
     const response = await fetch(url, {
          credentials: 'include',
          method: 'GET'
      })

     console.log(response.status)
     if (response.status === 200) {
      this.setState({
        loggedIn: false,
        user:""
      })
     }
  }

  loginRegister = async (formData) => {
    const type = formData.type 
    const url = process.env.REACT_APP_API_URL + '/api/v1/users/' + type
    console.log(formData, url);
    if (type === 'register') {
      const registerInfo = {
        email: formData.registerEmail,
        username: formData.registerUsername,
        password: formData.registerPassword1
      }
      const response = await fetch(url, {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(registerInfo),
          headers: {
            'Content-Type': 'application/json'
          }
      })

      const registerJSON = await response.json()
      console.log(registerJSON)

      if (registerJSON.status !== 200) {
        this.setState({
          modalMessage: registerJSON.message
        })
      } else if (registerJSON.status === 200) {
        this.setState({
          modalMessage: "",
          user: registerJSON.data,
          loggedIn: true,
          modalOpen: false
        })
      }

    } else if (type === 'login') {
      const loginInfo = {
        login: formData.login,
        password: formData.loginPassword
      }
      const response = await fetch(url,{
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const loginJSON = await response.json()
      console.log(loginJSON)

      if (loginJSON.status !== 201) {
        this.setState({
          modalMessage: loginJSON.message
        })
      } else if (loginJSON.status === 201) {
        this.setState({
          modalMessage: "",
          user: loginJSON.data,
          loggedIn: true,
          modalOpen: false
        })
      }

    }
  }

  render(){
    return (
      <div>

        <Navbar collapseOnSelect expand="lg" bg="light" className="justify-content-between navbar" sticky="top" 
        style={{
          boxShadow:'0px 0px 7px 0px black', 
          fontFamily: 'Frank Ruhl Libre, serif', 
          fontSize: '1.2em'
        }}>
            <Navbar.Brand href="home" style={{fontSize: '1.75em', color: 'rgb(79, 43, 61)', fontFamily: 'Great Vibes, cursive'}}>
              Rare Plants
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="home"><NavHover>Home</NavHover></Nav.Link>
              <Nav.Link href="about_us"><NavHover>About Us</NavHover></Nav.Link>
              <Nav.Link href="seed_exchange"><NavHover>Seed Exchange</NavHover></Nav.Link>
              <Nav.Link href="planter_box"><NavHover>Planter Box</NavHover></Nav.Link>
            </Nav>

              <Form inline>
                <FormControl style={{color: 'rgba(44, 62, 80, .8)'}}type="text" placeholder="Search" className="mr-sm-2"/>
                <Button variant="outline-success">Search</Button>
              </Form>

              <Nav.Link  style={{marginLeft:'10px', textAlign:'right'}}>
              {
                this.state.loggedIn === false
                ?
                <div onClick={this.toggleModal} href="login">Login</div>
                :
                <Dropdown
                drop='left'
                style={{
                  textAlign: 'right'
                }}
                >
                  <Dropdown.Toggle
                  style={{
                    backgroundColor: 'transparent',
                    border: '0px',
                    color: 'rgb(3,122,251)',
                    textAlign: 'right',
                    margin: '0px',
                    padding: '0px',
                    outline: 'none',
                    boxShadow: 'none',
                    borderColor: 'transparent'
                  }}
                  ><img alt='profile' style={{height:'65%', width:'65%'}} src='profileicon.png'/></Dropdown.Toggle>
                <Dropdown.Menu
                className='dropdown-menu'
                >
                  <Dropdown.Item href="#/action-1"><DropHover>Profile</DropHover></Dropdown.Item>
                  <Dropdown.Item onClick={this.togglePostModal} href="#/action-2"><DropHover>Make New Listing</DropHover></Dropdown.Item>
                  <Dropdown.Item href="#/action-3"><DropHover>Settings</DropHover></Dropdown.Item>
                  <Dropdown.Item onClick={this.logout} href="#/action-4"><DropHover>Log Out</DropHover></Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
              }
              </Nav.Link>
            
            </Navbar.Collapse>
          </Navbar>
          <div>
            {
              this.state.modalOpen
              ?
              <LoginRegister
              toggleModal={this.toggleModal}
              loginRegister={this.loginRegister}
              modalMessage={this.state.modalMessage}
              loggedIn={this.state.loggedIn}
              />
              :
              null
            }
            {
              this.state.postModalOpen
              ?
              <NewPostModal
              togglePostModal={this.togglePostModal}
              />
              :
              null
            }

            <Container fluid style={{ 
              height:'730px',
              width: '85%', 
              backgroundImage:`url(/plantborder7.jpeg)`,
              backgroundRepeat: 'no-repeat',
              color: 'white',
              // background: 
              //   `repeating-radial-gradient(
              //     circle at 0 0, 
              //     #FFEBCD,
              //     #DEB887 90px
              //   )`
              fontFamily: 'Frank Ruhl Libre, serif',
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'center',
              textAlign: 'right'
            }}>

              <Jumbotron style={{
                fontFamily: 'Frank Ruhl Libre, serif',
                color: 'rgba(44, 62, 80, 1)', 
                background: 'transparent',
                width: '100%',
                marginTop: '0'
              }}>
                <h1 style={{fontSize:'3.5em'}}>All the Plants of Tommorrow, <br/>Are the Seeds of Today.</h1>
                <p style={{fontSize: '1.6em', color: 'rgba(79, 43, 61, .8)'}}> Become a <HoverText> Green Thumb Planter Box 
                <img style={{marginLeft: '.5%', width: '2%', height: '2%'}} src='/arrowicon2.png' alt='arrow-icon'></img>
                <br/></HoverText> 
                member to start your journey. </p>

              </Jumbotron>
            </Container>
                
            <Container fluid style={{
              backgroundColor: 'rgba(79, 43, 61, .1)', 
              height: '760px', 
              fontFamily: 'Frank Ruhl Libre, serif',
              color: 'rgba(44, 62, 80, 1)'
            }}>
              <h1 style={{fontSize: '3em', padding: '3% 0%', color: 'rgba(79, 43, 61, 1)'}}>Shop Seed Exchange By Category</h1>

              <Carousel className='carousel' breakPoints={breakPoints}>
                <div>
                  <img className='category' alt='category' src='/succulents.jpg'/>
                    <h1><Hover>Succulents
                    <img style={{marginLeft: '1%', width: '8%', height: '8%'}} src='/arrowicon.png' alt='arrow-icon'>
                    </img></Hover></h1>
                </div>
                <div>
                  <img className='category' alt='category' src='/houseplants3.jpg'/>
                  <h1><Hover>House Plants
                  <img style={{marginLeft: '1%', width: '8%', height: '8%'}} src='/arrowicon.png' alt='arrow-icon'>
                  </img></Hover></h1>
                </div>
                <div>
                  <img className='category' alt='category' src='/flowers.jpg'/>
                  <h1><Hover>Flowers
                  <img style={{marginLeft: '1%', width: '8%', height: '8%'}} src='/arrowicon.png' alt='arrow-icon'>
                  </img></Hover></h1>
                </div>
                <div>
                  <img className='category' alt='category' src='/perennials.jpg'/>
                  <h1><Hover>Perennials
                  <img style={{marginLeft: '1%', width: '8%', height: '8%'}} src='/arrowicon.png' alt='arrow-icon'>
                  </img></Hover></h1>
                </div>
                <div>
                  <img className='category' alt='category' src='/bonsai.jpg'/>
                  <h1><Hover>Bonsai
                  <img style={{marginLeft: '1%', width: '8%', height: '8%'}} src='/arrowicon.png' alt='arrow-icon'>
                  </img></Hover></h1>
                </div>
                <div>
                  <img className='category' alt='category' src='/edibles.jpg'/>
                  <h1><Hover>Edibles
                  <img style={{marginLeft: '1%', width: '8%', height: '8%'}} src='/arrowicon.png' alt='arrow-icon'>
                  </img></Hover></h1>
                </div>
                <div>
                  <img className='category' alt='category' src='/herbs.jpg'/>
                  <h1><Hover>Herbs
                  <img style={{marginLeft: '1%', width: '8%', height: '8%'}} src='/arrowicon.png' alt='arrow-icon'>
                  </img></Hover></h1>
                </div>
              </Carousel>
            </Container>
          </div>
      </div>
    );
  }
}

export default App;
