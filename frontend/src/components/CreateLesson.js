import React, { Component } from "react";
import axiosInstance from "../axios";
import { render } from "react-dom";

import ReactBootstrap from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class CreateMaster extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lessons: [],
			name: "",
		};

		this.handelSubmitAxios = this.handelSubmitAxios.bind(this);
		this.handelName = this.handelName.bind(this);
		// this.handelSubmit = this.handelSubmit.bind(this);
		// this.fetchDataAxios = this.fetchDataAxios.bind();
	}


	handelName(e) {
		this.setState({
			name: e.target.value,
		});
	}

	handelSubmitAxios(e) {
		e.preventDefault();
		const name = this.state.name;
		axiosInstance.post("/create-lesson/", { name }).then((res) => {
			console.log(res.data);
		});
	}

	

	render() {
		return (
			<div>
				<Form onSubmit={this.handelSubmitAxios}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							onChange={this.handelName}
							value={this.state.name}
						></Form.Control>
					</Form.Group>
				</Form>
			</div>
		);
	}
}


	// componentDidMount() {
	// 	this.fetchDataAxios();
	// }

	// fetchDataAxios() {
	// 	axiosInstance.get("/lesson/").then((res) => {
	// 		this.setState({
	// 			lessons: res.data,
	// 		});
	// 	});
	// }

// fetchData() {
// 	console.log("fetchiing");
// 	var url = "http://127.0.0.1:8000/api/lesson";
// 	fetch(url)
// 		.then((res) => res.json())
// 		.then((data) => {
// 			this.setState({
// 				lessons: data,
// 			});
// 		})
// 		.catch((err) => {
// 			// Do something for an error here
// 			console.log("Error Reading data " + err);
// 		});
// }


// handelSubmit(e) {
// 	e.preventDefault();
// 	var url = "http://127.0.0.1:8000/api/create-lesson/";
// 	fetch(url, {
// 		method: "POST",
// 		headers: {
// 			"Content-type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			name: this.state.name,
// 		}),
// 	}).then((res) => {
// 		res.json();
// 		this.fetchData();
// 	});
// }