import React from 'react'

import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class ProfileContainer extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			activeItem: 'favorites',
			category: "succulents",
			title: "",
			seed_count: "",
			price: "",
			image: "",
			description: ""
		}
	}

	toggleItem = (e) => {
		console.log(e.target.name)
		this.setState({
			activeItem: e.target.name
		})

		if (e.target.name === 'listings'){
			this.props.getCurrentUserPosts()
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		console.log(this.state)
		this.props.createNewPost(this.state)
	}


	render() {
		return(
			<div style={{width: '95%', margin:'0 auto'}}>
				<Tab.Container 
				style={{
					backgroundColor: 'white',
					fontFamily: 'Frank Ruhl Libre, serif'
				}}
				defaultActiveKey="favorites"
				>
					<Nav fill className="tab-nav">
				        <Nav.Item>
				        	<Nav.Link className={`tabs ${this.state.activeItem === "favorites" ? 'active-item' : '' }`} onClick={this.toggleItem} name="favorites" eventKey="favorites">Favorites</Nav.Link>
				        </Nav.Item>
				        <Nav.Item>
				        	<Nav.Link className={`tabs ${this.state.activeItem === "listings" ? 'active-item' : '' }`} onClick={this.toggleItem} name="listings" eventKey="listings">My Listings</Nav.Link>
				        </Nav.Item>
				        <Nav.Item>
				        	<Nav.Link className={`tabs ${this.state.activeItem === "exchange" ? 'active-item' : '' }`} onClick={this.toggleItem} name="exchange" eventKey="exchange">My Exchange</Nav.Link>
				        </Nav.Item>
				        <Nav.Item>
				        	<Nav.Link className={`tabs ${this.state.activeItem === "new_listing" ? 'active-item' : '' }`} onClick={this.toggleItem} name="new_listing" eventKey="new_listing">Post New Listing</Nav.Link>
				        </Nav.Item>
				    </Nav>
				    <Tab.Content>
				    	<Tab.Pane style={{minHeight: '500px'}}eventKey="favorites">
				    		favorites
				    	</Tab.Pane>
				    	<Tab.Pane eventKey="listings">
				    		All listings
				    		{this.props.currentUserPosts.reverse().map(post =>{
				    			return(
				    				<Card key={post.id}>
				    					<Card.Img variant="top" src={post.image} />
				    					<Card.Body>
				    						<Card.Text>
										      {
										      	post.title	
										      }
										    </Card.Text>
				    					</Card.Body>
				    				</Card>
				    			)
				    		})}
				    	</Tab.Pane>
				    	<Tab.Pane eventKey="exchange">
				    		exchange listings
				    	</Tab.Pane>
				    	<Tab.Pane eventKey="new_listing">
				    		<Form onSubmit={this.handleSubmit}>
				    		  <Form.Group controlId="category">
							    <Form.Label>Which category are these seeds?</Form.Label>
							    <Form.Control onChange={this.handleChange} value={this.state.category} as="select">
							      <option>succulents</option>
							      <option>house plants</option>
							      <option>flowers</option>
							      <option>perennials</option>
							      <option>bonsai</option>
							      <option>edibles</option>
							      <option>herbs</option>
							    </Form.Control>
							  </Form.Group>
							  <Form.Group controlId="title">
							  	<Form.Label>What is the name of the plant?</Form.Label>
							  	<Form.Control onChange={this.handleChange} value={this.state.title} type='text'/>
							  </Form.Group>
							  <Form.Group controlId="seed_count">
							  	<Form.Label>How many seeds come in an order?</Form.Label>
							  	<Form.Control onChange={this.handleChange} value={this.state.seed_count} type='text'/>
							  </Form.Group>
							  <Form.Group controlId="price">
							  	<Form.Label>What is the price of one order?</Form.Label>
							  	<Form.Control onChange={this.handleChange} value={this.state.price} type='text'/>
							  </Form.Group>
							  <Form.Group controlId="image">
							  	<Form.Label>Choose an example picture of the plant.</Form.Label>
							    <Form.File onChange={this.handleChange} value={this.state.image} id="image"/>
							  </Form.Group>
							  <Form.Group controlId="description">
							  	<Form.Label>Enter any information about the order/seeds that you would like.</Form.Label>
							  	<Form.Control onChange={this.handleChange} value={this.state.description} as='textarea' rows={3}/>
							  </Form.Group>
							  <Button type='submit'>
							  	Post
							  </Button>
				    		</Form>
				    	</Tab.Pane>
				    </Tab.Content>
				</Tab.Container>
			</div>		
		)
	}
}

/*
title = CharField()
price = CharField()
seed_count = CharField()
image = CharField()
category = CharField()
description = CharField()
*/

export default ProfileContainer