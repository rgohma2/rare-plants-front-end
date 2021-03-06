import React from 'react'
import styled from 'styled-components';

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const HoverText = styled.span`
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
		validEmail: "",
		passwordsMatch: "",
		login:"",
		loginPassword:"",
		registerEmail: "",
		registerUsername: "",
		registerPassword1:"",
		registerPassword2:"",
		badSubmission: false,
		badResponse: false
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
		if (e.target.id === 'registerEmail') {
			if (e.target.value.includes('@') && e.target.value.includes('.')) {
				this.setState({
					validEmail: true
				})
			} else {
				this.setState({
					validEmail: false
				})
			}
		}

		if (e.target.id === 'registerPassword2') {
			if (e.target.value === this.state.registerPassword1) {
				this.setState({
					passwordsMatch: true
				})
			} else {
				this.setState({
					passwordsMatch: false
				})
			}
		}

	}

	handleSubmit = (e) => {
		e.preventDefault()
		if (this.state.type === 'register') {
			if (this.state.validEmail === true &&
				this.state.passwordsMatch === true &&
				this.state.registerUsername !== "") {
					this.setState({
						badSubmission: false
					})
					this.props.loginRegister(this.state)
					if (this.props.loggedIn === true) {
						this.props.toggleModal()
						this.resetState()
					} else {
						this.setState({
							badResponse: true
						})
					}
			} else {
				this.setState({
					badSubmission: true
				})
			}
		} else if (this.state.type === 'login') {
			if (this.state.login !== "" && 
				this.state.loginPassword !== "") {
					this.props.loginRegister(this.state)
					if (this.props.loggedIn === true) {
						this.props.toggleModal()
						this.resetState()
					} else {
						this.setState({
							badResponse: true
						})
					}
			} else {
				this.setState({
					badSubmission: true
				})
			} 
		}
	}




	render() {
		return(
			<Modal 
			show={true}
			onHide={this.props.toggleModal}
        	backdrop="static"
        	keyboard={false}
        	style={{
        		color: 'rgba(44, 62, 80, 1)',
        		fontFamily: 'Frank Ruhl Libre, serif',
        	}}
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
				{
					this.state.type === 'login'
					?
					<Modal.Body style={{
						backgroundImage:`url(/plantbackground1.jpg)`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						paddingBottom: '45.5%'
					}}>
						<Form onSubmit={this.handleSubmit} style={{color: 'rgba(44, 62, 80, 1)', fontSize: '1.4em'}}>
							{
									this.state.badSubmission === true
									?
									<Form.Text style={{textAlign: 'center', color: 'red', backgroundColor: 'rgba(248,249,250,0.6)'}}>
								    	Please fill out all required fields.
							    	</Form.Text>
							    	:
							    	null
							}
							{
									this.state.badResponse === true
									?
									<Form.Text style={{textAlign: 'center', color: 'red', backgroundColor: 'rgba(248,249,250,0.6)'}}>
								    	{this.props.modalMessage}
							    	</Form.Text>
							    	:
							    	null
							}

							<Form.Group controlId="login">
								<Form.Label>Login</Form.Label>
								<Form.Control value={this.state.login} onChange={this.handleChange} size="lg" type="text" placeholder="Enter email or username" />
							</Form.Group>
							<Form.Group controlId="loginPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control value={this.state.loginPassword} onChange={this.handleChange} size="lg" type="password" placeholder="Enter password" />
							</Form.Group>
							<Button size="sm" variant="primary" type="submit">
								Log in
							</Button>
						</Form>
					</Modal.Body>
					:
					<Modal.Body style={{
						backgroundImage:`url(/plantbackground1.jpg)`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover'
					}}>
						<Form onSubmit={this.handleSubmit} style={{color: 'rgba(44, 62, 80, 1)', fontSize: '1.4em'}}>
							{
									this.state.badSubmission === true
									?
									<Form.Text style={{textAlign: 'center', color: 'red', backgroundColor: 'rgba(248,249,250,0.6)'}}>
								    	Please fill out all required fields.
							    	</Form.Text>
							    	:
							    	null
							}
							{
									this.state.badResponse === true
									?
									<Form.Text style={{textAlign: 'center', color: 'red', backgroundColor: 'rgba(248,249,250,0.6)'}}>
								    	{this.props.modalMessage}
							    	</Form.Text>
							    	:
							    	null
							}
							<Form.Group controlId="registerEmail">
								<Form.Label>Email</Form.Label>
								<Form.Control value={this.state.registerEmail} onChange={this.handleChange} size="lg" type="text" placeholder="Enter email" />
								{
									this.state.validEmail === false
									?
									<Form.Text style={{color: 'red', backgroundColor: 'rgba(248,249,250,0.6)'}}>
								    	Please enter a valid email address.
							    	</Form.Text>
							    	:
							    	null
								}
							</Form.Group>
							<Form.Group controlId="registerUsername">
								<Form.Label>Username</Form.Label>
								<Form.Control value={this.state.registerUsername} onChange={this.handleChange} size="lg" type="text" placeholder="Enter username" />
							</Form.Group>
							<Form.Group controlId="registerPassword1">
								<Form.Label>Password</Form.Label>
								<Form.Control value={this.state.registerPassword1} onChange={this.handleChange} size="lg" type="password" placeholder="Create a password" />
							</Form.Group>
							<Form.Group controlId="registerPassword2">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control value={this.state.registerPassword2} onChange={this.handleChange} size="lg" type="password" placeholder="Enter password again" />
								{
									this.state.passwordsMatch === false
									?
									<Form.Text style={{color: 'red', backgroundColor: 'rgba(248,249,250,0.6)'}}>
								    	Passwords do not match.
							    	</Form.Text>
							    	:
							    	null
								}
							</Form.Group>
							<Button size="sm" variant="primary" type="submit">
								Create Account
							</Button>
						</Form>			
					</Modal.Body>
					}
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
