import React from 'react'
import styled from 'styled-components';

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const HoverText = styled.span`
  color: #000;
  text-decoration: underline;
  :hover {
    color: darkgreen;
    cursor: pointer;
  }
`

class LoginRegister extends React.Component {
	constructor(props) {

		super(props)

		this.state = this.getInitialState()
	}

	getInitialState = () => ({
		type: 'login',
		login:"",
		loginPassword:"",
		registerEmail: "",
		registerUsername: "",
		registerPassword1:"",
		registerPassword2:""
	})

	resetState = () => {
		this.setState(this.getInitialState())
	}

	toggleFormType = () => {
		const type = this.state.type
		this.resetState()
		this.setState({
			type: type === 'login' ? 'register' : 'login'
		})
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	Component



	render() {
		return(
			<Modal 
			show={true}
			onHide={this.props.toggleModal}
        	backdrop="static"
        	keyboard={false}
        	style={{color: 'rgba(44, 62, 80, 1)'}}
			>
				<Modal.Header closeButton>
				{
					this.state.type === 'login'
					?
					<Modal.Title> Log in to your account.</Modal.Title>
					:
					<Modal.Title> Create your account.</Modal.Title>

				}

				</Modal.Header>
				<Modal.Body style={{
					backgroundImage:`url(/plantborder7.jpeg)`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					padding: '8%',
				}}>
					{
						this.state.type === 'login'
						?
						<Form style={{color: 'rgba(44, 62, 80, 1)', fontSize: '1.4em'}}>
							<Form.Group controlId="login">
								<Form.Label>Login</Form.Label>
								<Form.Control value={this.state.login} onChange={this.handleChange} size="lg" type="email" placeholder="Enter email or username" />
							</Form.Group>
							<Form.Group controlId="loginPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control value={this.state.loginPassword} onChange={this.handleChange} size="lg" type="password" placeholder="Enter password" />
							</Form.Group>
							<Button size="sm" variant="primary" type="submit">
								Log in
							</Button>
						</Form>
						:
						<Form style={{color: 'black', fontSize: '1.4em'}}>
							<Form.Group controlId="registerEmail">
								<Form.Label>Email</Form.Label>
								<Form.Control value={this.state.registerEmail} onChange={this.handleChange} size="lg" type="email" placeholder="Enter email" />
							</Form.Group>
							<Form.Group controlId="registerUsername">
								<Form.Label>Username</Form.Label>
								<Form.Control value={this.state.registerUsername} onChange={this.handleChange} size="lg" type="email" placeholder="Enter username" />
							</Form.Group>
							<Form.Group controlId="registerPassword1">
								<Form.Label>Password</Form.Label>
								<Form.Control value={this.state.registerPassword1} onChange={this.handleChange} size="lg" type="password" placeholder="Create a password" />
							</Form.Group>
							<Form.Group controlId="registerPassword2">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control value={this.state.registerPassword2} onChange={this.handleChange} size="lg" type="password" placeholder="Enter password again" />
							</Form.Group>
							<Button size="sm" variant="primary" type="submit">
								Create Account
							</Button>
						</Form>
					}
				</Modal.Body>
				<Modal.Footer style={{display:'flex', alignItems: 'center',
              justifyContent: 'center'}}>
              		{
              			this.state.type === 'login'
              			?
						<p>Don't have an account yet? Create one <HoverText onClick={this.toggleFormType}>here</HoverText></p>
              			:
              			<p>Already have an account? Log in <HoverText onClick={this.toggleFormType}>here</HoverText></p>
              		}
				</Modal.Footer>
			</Modal>

		)
	}
}

export default LoginRegister
