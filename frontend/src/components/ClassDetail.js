import React from "react";
import axiosInstance from "../axios";

import ReactBootstrap from "react-bootstrap";
import {
	CardDeck,
	Card,
	CardGroup,
	CardColumns,
	Container,
	Row,
	Col,
} from "react-bootstrap";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class ClassDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ostad: "",
			lessonName: "",
			day: 1,
			image: "",
		};
		this.code = this.props.match.params.code;
		this.getClassDetailsAxios();
		// this.getClassDetails();
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

	getClassDetailsAxios() {
		axiosInstance
			.get("class/" + this.code)
			.then((res) => {
				console.log(res.data);
				this.setState({
					ostad: res.data.ostad.name,
					lessonName: res.data.lesson.name,
					day: res.data.day,
					image: res.data.image,
				});
			})
			
	}

	

	render() {
		return (
			<div>
				<div>{this.code}</div>
				<Card>
					<Card.Img
						variant="top"
						src={`http://127.0.0.1:8000${this.state.image}`}
						width={30}
						height={600}
					/>
					<Card.Title>{this.state.lessonName}</Card.Title>
					<Card.Title>{this.state.ostad}</Card.Title>
					<Card.Title>{this.state.day}</Card.Title>
				</Card>
			</div>
		);
	}
}

export default ClassDetail;






// getClassDetails() {
	// 	var csrftoken = this.getCookie("csrftoken");
	// 	return fetch("http://127.0.0.1:8000/api/class/" + this.code, {
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Accept: "application/json",
	// 			"X-CSRFToken": csrftoken,
	// 		},
	// 	})
	// 		.then((res) => {
	// 			return res.json();
	// 		})
	// 		.then((data) => {
	// 			this.setState({
	// 				ostad: data.ostad.name,
	// 				lessonName: data.lesson.name,
	// 				day: data.day,
	// 				image: data.image,
	// 			});
	// 		})
	// 		.catch((err) => {
	// 			// Do something for an error here
	// 			console.log("Error Reading data " + err);
	// 		});
	// }