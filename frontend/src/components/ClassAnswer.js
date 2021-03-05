import React, { Component } from "react";
import axiosInstance from "../axios";
import { render } from "react-dom";

import ReactBootstrap from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

export default class ClassAnswer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			answers: {
				description: "",
				image: null
			}


		};
		this.code = this.props.match.params.code;

		this.handelSubmitAxios = this.handelSubmitAxios.bind(this);
		this.handelDescription = this.handelDescription.bind(this);
		this.handleImage = this.handleImage.bind(this);
	}

	handelDescription(e) {
		this.setState({
			answers: {
				...this.state.answers,
				description: e.target.value,
			}
		});
	}

	handleImage(e) {
		this.setState({
			answers: {
				...this.state.answers,
				image: e.target.files[0],
			}
		});
	}

	handelSubmitAxios(e) {
		e.preventDefault();
		let formData = new FormData();
		formData.append("description", this.state.answers.description);
		formData.append("image", this.state.answers.image);
		axiosInstance.post(`/class/${this.code}/answer/`, formData);
		console.log("done");
		// this.props.history.push({
		// 	pathname: `/`,
		// });
		// window.location.reload();
	}

	

	

	render() {
		return (
				<Form onSubmit={this.handelSubmitAxios}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							onChange={this.handelDescription}
							value={this.state.answers.description}
						></Form.Control>
					</Form.Group>
					<br />
				<Form.Group>
					<input type="file" name="image" onChange={this.handleImage} />
				</Form.Group>

				<br />

				<Button onSubmit={this.handelSubmitAxios} type="submit">
						submit
					</Button>
				</Form>
		);
	}
}

// fetchData() {
// 	console.log("fetchiing");
// 	var url = `http://127.0.0.1:8000/api/class/${this.code}`;
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

// handelSubmit(e) {
	// 	e.preventDefault();
	// 	var url = `http://127.0.0.1:8000/api/class/${this.code}/answer/`;
	// 	fetch(url, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			description: this.state.description,
	// 		}),
	// 	}).then((res) => {
	// 		res.json();
	// 		this.fetchData();
	// 	});
	// }

		// componentDidMount() {
	// 	console.log("here");
	// 	this.fetchDataAxios();
	// }

	// fetchDataAxios() {
	// 	axiosInstance.get(`/class/${this.code}`).then((res) => {
	// 		this.setState({
	// 			items: res.data,
	// 		});
	// 	});
	// }