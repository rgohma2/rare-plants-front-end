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

		this.state = {
			type: 'login'
		}
	}

	toggleFormType = () => {
		this.setState({
			type: this.state.type === 'login' ? 'register' : 'login'
		})
	}

	render() {
		return(
			<Modal 
			show={true}
			onHide={this.props.toggleModal}
        	backdrop="static"
        	keyboard={false}
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
					padding: '8%'
				}}>
					{
						this.state.type === 'login'
						?
						<Form style={{color: 'black', fontSize: '1.4em'}}>
							<Form.Group controlId="login">
								<Form.Label>Login</Form.Label>
								<Form.Control size="lg" type="email" placeholder="Enter email or username" />
							</Form.Group>
							<Form.Group controlId="loginPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control size="lg" type="password" placeholder="Enter password" />
							</Form.Group>
							<Button size="sm" variant="primary" type="submit">
								Log in
							</Button>
						</Form>
						:
						<Form style={{color: 'black', fontSize: '1.4em'}}>
							<Form.Group controlId="registerEmail">
								<Form.Label>Email</Form.Label>
								<Form.Control size="lg" type="email" placeholder="Enter email" />
							</Form.Group>
							<Form.Group controlId="registerUsername">
								<Form.Label>Username</Form.Label>
								<Form.Control size="lg" type="email" placeholder="Enter username" />
							</Form.Group>
							<Form.Group controlId="registerPassword1">
								<Form.Label>Password</Form.Label>
								<Form.Control size="lg" type="password" placeholder="Create a password" />
							</Form.Group>
							<Form.Group controlId="registerPassword2">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control size="lg" type="password" placeholder="Enter password again" />
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
