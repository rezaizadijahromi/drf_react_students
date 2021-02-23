import React, { componentDidMount, Component } from "react";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";

import ReactBootstrap from "react-bootstrap";
import { CardDeck, Card, CardGroup, CardColumns, Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class ClassRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [
				{
					code: null,
					lesson: 'reza',
					ostad: "",
					day: 1,
                    image: "",
				},
				
			],
			
		};

		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	getCookie(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie !== "") {
			var cookies = document.cookie.split(";");
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].trim();
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === name + "=") {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}


	fetchData() {
        console.log("fetchiing")
		var url = "http://127.0.0.1:8000/api/";
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					products: data,
				});
			}).catch(err => {
          // Do something for an error here
          console.log("Error Reading data " + err);
        })
	}

	render() {
		console.log(this.state.lesson);

		var pro = this.state.products

		return (
            <Container>
                <Row xs={6} sm={3} md={8}>
                        {pro.map(function(product, index){

                            return(
                                <Card key={index} style={{ width: '18rem', top:"5rem", bottom:"100rem" }}>
                                    <Col xs={12} md={8}>
                                <Card.Img variant="top" src={product.image}  width={141}
    height={150}  />
                                </Col>
                                <Card.Body>
                                <Card.Title>{product.code}</Card.Title>
                                <Card.Title>{product.lesson.name}</Card.Title>
                                <Card.Text>
                                    {product.ostad}
                                </Card.Text>
								<Link to={`class/${product.code}`}>
										<Button >go to class</Button>

								</Link>
                                </Card.Body>
                            </Card>
                            )
                            
                        })}

                </Row>
            </Container>
		);
	}
}


export default ClassRoom;

// <Grid container spacing={2}>
// 	{this.state.products.map(function (product, index) {
// 		return (
// 			<Grid item xs={12} key={product.code}>
// 				<Typography>{product.code}</Typography>

// 				<Box component="span" m={1}>
// 				</Box>
// 			</Grid>
// 		);
// 	})}
// </Grid>
