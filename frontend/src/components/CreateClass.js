import React, { componentDidMount, Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";

import ReactBootstrap from "react-bootstrap";
import {
	CardDeck,
	Card,
	Form,
	CardColumns,
	Container,
	Row,
	Col,
} from "react-bootstrap";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class CreateClass extends Component {
	constructor(props) {
		super(props);
		this.state = {
            items: [],
			products: 
				{
					lesson: "",
					ostad: "",
					day: 1,
					image: "",
				},
			
		};

		this.handelSubmit = this.handelSubmit.bind(this);
		this.handelChange = this.handelChange.bind(this);
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
		console.log("fetchiing");
		var url = "http://127.0.0.1:8000/api/";
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					items: data,
				});
			})
			.catch((err) => {
				// Do something for an error here
				console.log("Error Reading data " + err);
			});
	}

	handelChange(e) {
		var { name, value } = e.target;
		this.setState({
			products:{
				...this.state.products,
				[name]: value,
			},
		});
	}

	handelSubmit(e) {
		e.preventDefault();
		console.log("Here bitches", this.state.products);

		var csrftoken = this.getCookie("csrftoken");
		var url = "http://127.0.0.1:8000/api/create-class";

		fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"X-CSRFToken": csrftoken,
			},
			body: JSON.stringify(this.state.products),
		})
			.then((res) => {
				this.fetchData();
				this.setState({
					products: 
						{
							lesson: "",
							ostad: "",
							day: 1,
						},
					
				});
			})
			.catch(function (err) {
				console.log("Error", err);
			});
	}

	render() {
		var pro = this.state.items;
		console.log("pro", pro);
		return (
			<Form onSubmit={this.handelSubmit}>
				<Form.Group>
					<Form.Label>Ostad</Form.Label>

					<Form.Control
						as="select"
						onChange={this.handelChange}
						value={this.state.products.ostad.name}
					>
						{pro.map(function (master, index) {
							return <option key={index}>{master.ostad.name}</option>;
						})}
					</Form.Control>
				</Form.Group>

				<br />
				<Form.Group>
					<Form.Label>Lesson</Form.Label>

					<Form.Control
						as="select"
						onChange={this.handelChange}
						value={this.state.products.lesson}
					>
						{pro.map(function (lesson, index) {
							return <option key={index}>{lesson.lesson.name}</option>;
						})}
					</Form.Control>
				</Form.Group>

				<br />
				{/* <Form.Group>

					<Form.File id="exampleFormControlFile1" label="image file "  onChange={this.handelChange}/>
				</Form.Group>

					<br /> */}
				<Form.Group>
					<Form.Label>days</Form.Label>
					<Form.Control
						type="text"
						placeholder="day"
						onChange={this.handelChange}
						value={this.state.products.day}
					/>
					<Button type="submit" onSubmit={this.handelSubmit}>submit</Button>
				</Form.Group>
			</Form>
		);
	}
}

export default CreateClass;
