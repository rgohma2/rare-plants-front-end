import React from 'react'
import ImageUploader from '../ImageUploader'

import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import CardColumns from 'react-bootstrap/CardColumns'


class ProfileContainer extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			activeItem: 'favorites',
			category: "succulents",
			title: "",
			seed_count: "",
			price: "",
			description: "",
			image: ""
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
		console.log(e.target);
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	getUploadUrl = (url) => {
		console.log('success!');
		console.log(url);
		this.setState({
			image: url
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.createNewPost(this.state)
	}


	render() {
		return(
			<Tab.Container>
			<div style={{height: '1800px', display:'flex'}}>
				<div style={{width: '30%', backgroundColor:'whitesmoke', height:'40%', margin: '1% 0 0 2.5%', display: 'flex', position: 'sticky', top: '5rem'}}>
					<div style={{height:'94%', width:'90%', border: '2px solid gray', alignSelf: 'center', margin: '0 auto'}}> 
						<div style={{height: '40%', backgroundColor: 'rgba(140,176,190, .7)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
							<div style={{backgroundColor: '#000', height: '38.4%', width: '30%', borderRadius: '100%', alignSelf:'center',}}>	
							</div>
							<div style={{backgroundColor: 'transparent', width:'100%', display:'flex', justifyContent: 'center'}}>
								<img className="profile-icon-bar" src='/alarm-bell.png' alt='favorites'></img>
								<img className="profile-icon-bar" src='/cog-double-2.png' alt='settings'></img>
							</div>
						</div>
						<Nav>
							<Nav.Item className={"profile-tab"}>
					        	<Nav.Link className={`tabs ${this.state.activeItem === "favorites" ? 'active-item' : '' }`} onClick={this.toggleItem} name="favorites" eventKey="favorites"><img className="profile-icon" src='/love-it-ribbon.png' alt='favorites'></img>Favorites</Nav.Link>
					        </Nav.Item>
					        <Nav.Item className={"profile-tab"}>
					        	<Nav.Link className={`tabs ${this.state.activeItem === "listings" ? 'active-item' : '' }`} onClick={this.toggleItem} name="listings" eventKey="listings"><img className="profile-icon" src='/organic-plant.png' alt='listings'></img>My Listings</Nav.Link>
					        </Nav.Item>
					        <Nav.Item className={"profile-tab"}>
					        	<Nav.Link className={`tabs ${this.state.activeItem === "exchange" ? 'active-item' : '' }`} onClick={this.toggleItem} name="exchange" eventKey="exchange"><img className="profile-icon" src='/ecology-plant-deal.png' alt='exchange'></img>My Exchange</Nav.Link>
					        </Nav.Item>
					        <Nav.Item className={"profile-tab"}>
					        	<Nav.Link className={`tabs ${this.state.activeItem === "new_listing" ? 'active-item' : '' }`} onClick={this.toggleItem} name="new_listing" eventKey="new_listing"><img className="profile-icon" src='/content-browser-edit.png' alt='new-listing'></img>Post New Listing</Nav.Link>
					        </Nav.Item>
						</Nav>
					</div>
				</div>
				<div style={{width: '70%', backgroundColor:'whitesmoke', height:'80%', margin: '1% 2.5% 0 0'}}>
					<Tab.Content>
				    	<Tab.Pane style={{minHeight: '500px'}}eventKey="favorites">
				    		favorites
				    	</Tab.Pane>
				    	<Tab.Pane eventKey="listings" style={{border: 'none'}}>
				    		<ul class="grid cs-style-3">
					    		{this.props.currentUserPosts.reverse().map(post =>{
					    			return(
					    				<li key={post.id}>
						    				<figure>
						    					<img src={post.image} alt={post.title}/>
						    					<figcaption>
						    						<h3>{post.title}</h3>
						    						<span>Randy Gohmann</span>
						    						<a href="#">View Listing</a>
						    					</figcaption>
						    				</figure>
						    			</li>
					    			)
					    		})}
				    		</ul>
				    	</Tab.Pane>
				    	<Tab.Pane eventKey="exchange">
				    		exchange listings
				    	</Tab.Pane>
				    	<Tab.Pane eventKey="new_listing">
				    		<p>Choose an example picture of the plant.</p>
				    		<ImageUploader
				    		getUploadUrl={this.getUploadUrl}
				    		/>
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
				</div>
			</div>		
		</Tab.Container>
		)
	}
}

/*
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
				    		<Container>
				    			<Row>
					    		{this.props.currentUserPosts.reverse().map(post =>{
					    			return(
					    				<Col xs="4">
						    				<Card style={{
						    					height: '100%'
						    				}} key={post.id}>
						    					<Card.Img
						    					 style={{
											      	height:'70%'
											     }}
						    					 variant="top" src={post.image} />
						    					<Card.Body>
												      {
						    							<Card.Text>
												      		{post.title}
												    	</Card.Text>	
												      }
						    					</Card.Body>
						    				</Card>
						    			</Col>	
					    			)
					    		})}
					    		</Row>
				    		</Container>
				    	</Tab.Pane>
				    	<Tab.Pane eventKey="exchange">
				    		exchange listings
				    	</Tab.Pane>
				    	<Tab.Pane eventKey="new_listing">
				    		<p>Choose an example picture of the plant.</p>
				    		<ImageUploader
				    		getUploadUrl={this.getUploadUrl}
				    		/>
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
*/

export default ProfileContainer