import React from 'react'

import Modal from 'react-bootstrap/Modal'

class LoginRegister extends React.Component {
	constructor(props) {

		super(props)

		this.state = {

		}
	}

	render() {
		return(
			<Modal 
			show={true}
			onHide={this.props.toggleModal}
        	backdrop="static"
			>
				<Modal.Header closeButton>
					<h1>HELLO</h1>
				</Modal.Header>
			</Modal>

		)
	}
}

export default LoginRegister
