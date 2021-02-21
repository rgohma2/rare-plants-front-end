import React from 'react';
import './App.css';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'

import LoginRegister from './LoginRegister';
import ProfileContainer from './ProfileContainer';

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
    color: rgba(44, 62, 80, .9);

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
      user: "",
      currentUserPosts: []
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


  logout = async () => {
    const url = process.env.REACT_APP_API_URL + '/api/v1/users/logout'
     const response = await fetch(url, {
          credentials: 'include',
          method: 'GET'
      })

    const logoutJSON = await response.json()
    console.log(logoutJSON);

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

  createNewPost = async (newPostData) => {
    const url = process.env.REACT_APP_API_URL + '/api/v1/posts/' + this.state.user.id
    const response = await fetch(url, {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(newPostData),
          headers: {
            'Content-Type': 'application/json'
          }
      })
    const newPostJSON = await response.json()
    console.log(newPostJSON);
  }

  getCurrentUserPosts = async () => {
    const url = process.env.REACT_APP_API_URL + '/api/v1/posts/' + this.state.user.id
    const response = await fetch(url, {
      credentials: 'include'
    })
    const postsJSON = await response.json()
    console.log(postsJSON);

    if (postsJSON.status === 200) {
      this.setState({
        currentUserPosts: postsJSON.data
      })
    }
  }


  render(){
    return (
      <div>
        <Router>
          <Navbar collapseOnSelect expand="lg" bg="light" className="justify-content-between navbar" sticky="top" 
          style={{
            boxShadow:'0px 0px 7px 0px black', 
            fontFamily: 'Frank Ruhl Libre, serif', 
            fontSize: '1.2em'
          }}>
              <Navbar.Brand href="" style={{fontSize: '1.75em', fontFamily: 'Great Vibes, cursive'}}>
                <Link className='text-link' to='/'>Rare Plants</Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href=""><Link className='link' to='/'><NavHover>Home</NavHover></Link></Nav.Link>
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
                    <Dropdown.Item href="#/action-1"><Link className='link' to='/profile'><DropHover>Profile</DropHover></Link></Dropdown.Item>
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

            <Switch>
              <Route exact path='/'>
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
                    <h1 style={{fontSize:'3.8vw'}}>All the Plants of Tommorrow, <br/>Are the Seeds of Today.</h1>
                    <p style={{fontSize: '1.6vw', color: 'rgba(79, 43, 61, .8)'}}> Become a <HoverText> Green Thumb Planter Box 
                    <img style={{marginLeft: '.5%', width: '2%', height: '2%'}} src='/arrowicon2.png' alt='arrow-icon'></img>
                    <br/></HoverText> 
                    member to start your journey. </p>

                  </Jumbotron>
                </Container>
                <Container fluid style={{
                  backgroundColor: 'white',
                  height: '600px',
                  fontFamily: 'Frank Ruhl Libre, serif',
                  display: 'flex',
                  justifyContent: 'space-around',
                  margin: '4% 0'
                }}>
                  <div style={{
                    backgroundImage: `url('/woodpannel2.jpeg')`,
                    width: '46%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div className='bubble-bottom-left' style={{
                      backgroundColor: 'rgba(246,246,248, .4)',
                      borderRadius: '15%',
                      position: 'relative',
                      width: '85%',
                      fontSize: '2.5vw',
                      textAlign: 'center'
                    }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum arcu velit, eget eleifend magna finibus sed. Duis dui erat, tempus vel efficitur et, fringilla vel nunc. Sed accumsan lorem eu nunc lacinia sodales. 
                    
                    </div>
                  </div>
                  <div style={{
                    backgroundColor: 'rgb(246,246,248)',
                    width: '46%',
                    height: '100%'
                  }}>
                  </div>
                </Container> 

                <Container fluid style={{
                  backgroundColor: 'rgb(246,246,248)', 
                  height: '760px', 
                  fontFamily: 'Frank Ruhl Libre, serif',
                  color: 'rgba(44, 62, 80, 1)',
                  marginTop: '4%'
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
              </Route>
              <Route path='/profile'>
                <ProfileContainer
                createNewPost={this.createNewPost}
                getCurrentUserPosts={this.getCurrentUserPosts}
                currentUserPosts={this.state.currentUserPosts}
                />
              </Route>
            </Switch>
          </div>
          </Router>
      </div>
    );
  }
}

export default App;
