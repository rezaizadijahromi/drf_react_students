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
			masters: [],
			name: "",
		};

		this.handelSubmitAxios = this.handelSubmitAxios.bind(this);
		this.handelName = this.handelName.bind(this);
	}


	handelName(e) {
		this.setState({
			name: e.target.value,
		});
	}

	handelSubmitAxios(e) {
		e.preventDefault();
		const name = this.state.name;
		axiosInstance.post("/create-master/", { name }).then((res) => {
			console.log(res.data);
		});
	}

	

	render() {
		return (
			<div>
				<Form onSubmit={this.handelSubmitAxios}>
					<Form.Group>
						<Form.Label>Add Master Name</Form.Label>
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
// 	this.fetchData();
// }

// fetchData() {
// 	console.log("fetchiing");
// 	var url = "http://127.0.0.1:8000/api/master";
// 	fetch(url)
// 		.then((res) => res.json())
// 		.then((data) => {
// 			this.setState({
// 				masters: data,
// 			});
// 		})
// 		.catch((err) => {
// 			// Do something for an error here
// 			console.log("Error Reading data " + err);
// 		});
// }

// handelSubmit(e) {
// 	e.preventDefault();
// 	var url = "http://127.0.0.1:8000/api/create-master/";
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
