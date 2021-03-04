import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import axiosInstance from "../axios";
import ReactBootstrap from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import {
// 	BrowserRouter as Router,
// 	Route,
// 	Link,
// 	Redirect,
// } from "react-router-dom";

class CreateClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			lesson: [
				{
					name: "",
				},
			],
			master: [
				{
					name: "",
				},
			],
			day: 1,
			products: {
				id: null,
				lesson: {
					name: "",
				},
				master: {
					name: "",
				},
				image: null,
				day: 0,
			},
		};

		this.handelDay = this.handelDay.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handelLesson = this.handelLesson.bind(this);
		this.handelOstad = this.handelOstad.bind(this);
		this.handelChange = this.handelChange.bind(this);
		this.getMasterAxios = this.getMasterAxios.bind(this);
		this.getLessonAxios = this.getLessonAxios.bind(this);
		this.fetchDataAxios = this.fetchDataAxios.bind(this);
		this.handelSubmitAxios = this.handelSubmitAxios.bind(this)
		// this.handelRoomButtonPressed = this.handelRoomButtonPressed.bind(this);
		// this.handelRoomButtonPressedAXIOS = this.handelRoomButtonPressedAXIOS.bind(
		// 	this
		// );
	}

	componentDidMount() {
		this.getMasterAxios();
		this.getLessonAxios();
		this.fetchDataAxios();
	}

	getMasterAxios() {
		axiosInstance.get("/master/").then((res) => {
			this.setState({
				master: res.data,
			});
		});
	}

	getLessonAxios() {
		axiosInstance.get("/lesson/").then((res) => {
			this.setState({
				lesson: res.data,
			});
		});
	}

	fetchDataAxios() {
		axiosInstance.get().then((res) => {
			console.log("Axios", res.data);
			this.setState({
				item: res.data,
			});
		});
	}

	handelOstad(e) {
		this.setState({
			products: {
				...this.state.products,
				master: e.target.value,
			},
		});
	}

	handelLesson(e) {
		this.setState({
			products: {
				...this.state.products,
				lesson: e.target.value,
			},
		});
	}

	handleInputChange(e) {
		e.preventDefault();
		this.setState({
			products: {
				...this.state.products,
				image: e.target.files[0],
			},
		});
	}

	handelDay(e) {
		// console.log("day", e.target.name);
		this.setState({
			products: {
				...this.state.products,
				day: e.target.value,
			},
		});
	}

	// const initialFormData = Object.freeze({
	// 	master: '',
	// 	lesson: '',
	// 	day: '',
	// 	// content: '',
	// });

	handelChange(e) {
		if ([e.target.name] == "image") {
			this.setState({
				products: {
					...this.state.products,
					image: e.target.files,
				},
			});
		}
		if ([e.target.name] == "title") {
			this.setState({
				...this.state.products,
				[e.target.name]: e.target.value.trim(),
			});
		} else {
			this.setState({
				...this.state.products,
				[e.target.name]: e.target.value.trim(),
			});
		}
	}

	


	handelSubmitAxios(e) {
		e.preventDefault();
		let formData = new FormData();
		formData.append("master", this.state.products.master);
		formData.append("lesson", this.state.products.lesson);
		formData.append("day", this.state.products.day);
		formData.append("image", this.state.products.image);
		axiosInstance.post(`create-class/`, formData);
		this.props.history.push({
			pathname: "/",
		});
		window.location.reload();
	}



	render() {
		// console.log("pros", this.state.products);
		
		return (
			<Form onSubmit={this.handelSubmitAxios}>
				<Form.Group>
					<Form.Label>Ostad</Form.Label>

					<Form.Control
						as="select"
						onChange={this.handelOstad}
						value={this.state.products.master.name}
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
						value={this.state.products.lesson.name}
					>
						{this.state.lesson.map(function (lesson, index) {
							return <option key={index}>{lesson.name}</option>;
						})}
					</Form.Control>
				</Form.Group>

				<br />
				<Form.Group>
					<input type="file" name="image" onChange={this.handleInputChange} />
				</Form.Group>

				<br />
				<Form.Group>
					<Form.Label>days</Form.Label>
					<Form.Control
						type="text"
						placeholder="day"
						onChange={this.handelDay}
						value={this.state.products.day}
					/>
					<Button onSubmit={this.handelSubmitAxios} type="submit">
						submit
					</Button>
				</Form.Group>
			</Form>
		);
	}
}

export default CreateClass;

// {
// 	lesson: this.state.products.lesson.name,
// 	ostad: this.state.products.master.name,
// 	day: this.state.day,
// }

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

// getMaster() {
// 	fetch("http://127.0.0.1:8000/api/master/")
// 		.then((res) => res.json())
// 		.then((data) => {
// 			this.setState({
// 				master: data,
// 			});
// 		});
// }
// getLesson() {
// 	fetch("http://127.0.0.1:8000/api/lesson/")
// 		.then((res) => res.json())
// 		.then((data) => {
// 			this.setState({
// 				lesson: data,
// 			});
// 		});
// }

	// handelRoomButtonPressed(e) {
	// 	console.log("item", this.state.products);
	// 	e.preventDefault();
	// 	let data = new FormData();
	// 	data.append("image", this.state.products.image);
	// 	console.log("image", data);

	// 	var url = "http://127.0.0.1:8000/api/create-class/";
	// 	try {
	// 		fetch(url, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-type": "application/json",
	// 			},
	// 			body: JSON.stringify({
	// 				lesson: {
	// 					name: this.state.products.lesson,
	// 				},
	// 				ostad: {
	// 					name: this.state.products.master,
	// 				},
	// 				day: this.state.products.day,
	// 			}),
	// 		})
	// 			.then((res) => {
	// 				res.json();
	// 				this.fetchDataAxios();
	// 			})
	// 			.then((data) => console.log(data));
	// 	} catch (error) {
	// 		console.log("catch");
	// 	}
	// }

	// handelRoomButtonPressedAXIOS(e) {
	// 	console.log("item", this.state.products);
	// 	e.preventDefault();
	// 	const config = { headers: { "Content-Type": "multipart/form-data" } };
	// 	const url = "http://127.0.0.1:8000/api/create-class/";
	// 	let data = new FormData();
	// 	data.append(ostad:{name}, this.state.products.master.name);
	// 	data.append("lesson", this.state.products.lesson.name);
	// 	data.append("image", this.state.products.image);
	// 	data.append("day", this.state.products.day);

	// 	console.log(data);
	// 	axios.post(url, data, config).then((res) => {
	// 		console.log(res.data);
	// 	});
	// }