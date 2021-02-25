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
			lesson: [{
				name: ""
			}],
			master: [{
				name: ""
			}],
			day: 1

		};

		// this.handelDay = this.handelDay.bind(this);
		// this.handelLesson = this.handelLesson.bind(this);
		// this.handelOstad = this.handelOstad.bind(this);
		this.getMaster = this.getMaster.bind(this)
		this.getLesson = this.getLesson.bind(this)
		this.handelRoomButtonPressed = this.handelRoomButtonPressed.bind(this);
	}

	componentWillMount() {
		this.getMaster();
		this.getLesson();
	}

	getMaster(){
		fetch("http://127.0.0.1:8000/api/master/")
		.then((res) => res.json())
		.then((data) =>{
			this.setState({
				master: data
			})
		})
	}

	getLesson(){
		fetch("http://127.0.0.1:8000/api/lesson/")
		.then((res) => res.json())
		.then((data) =>{
			this.setState({
				lesson: data
			})
		})
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

	// handelOstad(e) {
	// 	this.setState({
	// 		products: {
	// 			...this.state.products,
	// 			ostad: e.target.value,
	// 		},
	// 	});
	// }

	// handelLesson(e) {
	// 	this.setState({
	// 		products: {
	// 			...this.state.products,
	// 			lesson: e.target.value,
	// 		},
	// 	});
	// }

	// handelDay(e) {
	// 	this.setState({
	// 		products: {
	// 			...this.state.products,
	// 			day: e.target.value,
	// 		},
	// 	});
	// }

	handelRoomButtonPressed() {
		// console.log(this.state)
		console.log("Here bitches", this.state.products);
		var csrftoken = this.getCookie("csrftoken");
		var url = "http://127.0.0.1:8000/api/create-class";

		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken },
			body: JSON.stringify(this.state.products),
		})
			.then((res) => {
				res.json();
			})
			.catch(function (err) {
				console.log("Error", err);
			});
	}

	render() {
		return (
			<Form onSubmit={this.handelRoomButtonPressed}>
				<Form.Group>
					<Form.Label>Ostad</Form.Label>

					<Form.Control
						as="select"
						onChange={this.handelOstad}
						// value={this.state.products.ostad.name}
					>
						{this.state.master.map(function (master, index) {
							return <option key={index}>{master.name}</option>;
						})}
					</Form.Control>
				</Form.Group>

				<br />
				<Form.Group>
					<Form.Label>Lesson</Form.Label>

					<Form.Control
						as="select"
						onChange={this.handelLesson}
						// value={this.state.products.lesson}
					>
						{this.state.lesson.map(function (lesson, index) {
							return <option key={index}>{lesson.name}</option>;
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
						// onChange={this.handelDay}
						// value={this.state.products.day}
					/>
					<Button type="submit" onSubmit={this.handelRoomButtonPressed}>
						submit
					</Button>
				</Form.Group>
			</Form>
		);
	}
}

export default CreateClass;

// handelSubmit(e) {
// 	e.preventDefault();
// 	console.log("Here bitches", this.state.products);

// 	var csrftoken = this.getCookie("csrftoken");
// 	var url = "http://127.0.0.1:8000/api/create-class";

// 	fetch(url, {
// 		method: "POST",
// 		headers: {
// 			"Content-type": "application/json",
// 			"X-CSRFToken": csrftoken,
// 		},
// 		body: JSON.stringify(this.state.products),
// 	})
// 		.then((res) => {
// 			this.fetchData();
// 			this.setState({
// 				products: {
// 					lesson: this.state.products.lesson,
// 					ostad: this.state.products.ostad,
// 					day: this.state.products.day,
// 				},
// 			});
// 		})
// 		.catch(function (err) {
// 			console.log("Error", err);
// 		});
// }

// componentDidMount() {
// 	this.fetchData();
// }
// fetchData() {
// 	console.log("fetchiing");
// 	var url = "http://127.0.0.1:8000/api/";
// 	fetch(url)
// 		.then((res) => res.json())
// 		.then((data) => {
// 			this.setState({
// 				items: data,
// 			});
// 		})
// 		.catch((err) => {
// 			// Do something for an error here
// 			console.log("Error Reading data " + err);
// 		});
// }

// handelChange(e) {
// 	var { name, value } = e.target;
// 	this.setState({
// 		products: {
// 			...this.state.products,
// 			[name]: value,
// 		},
// 	});
// }
