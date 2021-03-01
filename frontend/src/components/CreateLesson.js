import React, { Component } from "react";
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

		this.handelSubmit = this.handelSubmit.bind(this);
		this.handelName = this.handelName.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		console.log("fetchiing");
		var url = "http://127.0.0.1:8000/api/lesson";
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					lessons: data,
				});
			})
			.catch((err) => {
				// Do something for an error here
				console.log("Error Reading data " + err);
			});
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

	handelName(e) {
		this.setState({
			name: e.target.value,
		});
	}

	handelSubmit(e) {
		e.preventDefault();
		var url = "http://127.0.0.1:8000/api/create-lesson/";
		fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
                name:this.state.name
            }),
		}).then((res) => {
			res.json();
			this.fetchData();
		});
	}

	render() {
		return (
			<div>
				<Form onSubmit={this.handelSubmit}>
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
