import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class NewPostModal extends React.Component {
	constructor(props) {

		super(props)

		this.state = {

		}
	}

	render() {
		return(
			<Modal 
			show={true}
			onHide={this.props.togglePostModal}
        	backdrop="static"
        	keyboard={false}
        	style={{
        		color: 'rgba(44, 62, 80, 1)',
        		fontFamily: 'Frank Ruhl Libre, serif',
        	}}
			>
				<Modal.Header closeButton>
					Create a new listing.
				</Modal.Header>
			</Modal>

			
		)
	}
}

export default NewPostModal