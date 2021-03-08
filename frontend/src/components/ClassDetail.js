import React from "react";
import axiosInstance from "../axios";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import Link from "@material-ui/core/Link";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	NavLink,
} from "react-router-dom";

class ClassDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			answers: [
				{
					description: "",
					image: null,
					slug: "",
					liked: 0,
				},
			],
			ostad: "",
			lessonName: "",
			day: 1,
			image: "",
		};
		this.code = this.props.match.params.code;
		this.getClassDetailsAxios();
		this.getLike = this.getLike.bind(this);
		// this.getClassDetails();
	}

	componentDidMount() {
		this.getClassDetailsAxios();
	}

	getClassDetailsAxios() {
		axiosInstance.get("class/" + this.code + "/").then((res) => {
			this.setState({
				ostad: res.data.ostad.name,
				lessonName: res.data.lesson.name,
				day: res.data.deadline,
				image: res.data.image,
				answers: res.data.answers,
			});
			// console.log(res.data);
		});
	}
	
	
	getLike(e, slug) {
		e.preventDefault();
		console.log(e);
		axiosInstance.post(`class/${this.code}/answer-like/${slug}/`);
		this.props.history.push({
			pathname: `/class/${this.code}`,
		});
		window.location.reload();
		console.log("Here");
	}

	render() {
		var answers = this.state.answers;
		var code = this.code;
		var self = this;
		return (
			<div>
				<Container>
					<Grid container>
						<Grid item={true} xs={12}>
							<Card>
								<CardMedia
									component="img"
									src={`http://127.0.0.1:8000${this.state.image}`}
									width={30}
									height={600}
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										Question code: {this.code}
									</Typography>
									<Typography>Lesson: {this.state.lessonName}</Typography>
									<Typography>Master: {this.state.ostad}</Typography>
									<Typography>Days left to answer: {this.state.day}</Typography>
								</CardContent>
								<CardActions>
									{/* <Link
										color="textPrimary"
										// href={`${this.code}/answer/`}
										// component={Link}
										// to="/answer"
									>
										Answer here
									</Link> */}

									<NavLink to={`${this.code}/answer/`}>Answer here</NavLink>
								</CardActions>
							</Card>
						</Grid>
					</Grid>

					<Grid container>
						{answers.map(function (ans, index) {
							return (
								<Grid
									item
									key={index}
									xs={12}
									sm={6}
									md={3}
									style={{ height: "100%", width: "100%", padding: 20 }}
								>
									<Button variant="contained" color="secondary" onClick={(e) => self.getLike(e, ans.slug)} >
										Liked: {ans.liked}
									</Button>
									<NavLink to={`${code}/answer/${ans.slug}/`}>
										<Typography>{ans.description}</Typography>
										<CardMedia
											component="img"
											src={`http://127.0.0.1:8000${ans.image}`}
											style={{
												height: 250,
												width: 250,
												padding: 20,
												borderRadius: "50%",
												objectFit: "cover",
											}}
										></CardMedia>
									</NavLink>
								</Grid>
							);
						})}
					</Grid>
				</Container>
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

// getCookie(name) {
// 	var cookieValue = null;
// 	if (document.cookie && document.cookie !== "") {
// 		var cookies = document.cookie.split(";");
// 		for (var i = 0; i < cookies.length; i++) {
// 			var cookie = cookies[i].trim();
// 			// Does this cookie string begin with the name we want?
// 			if (cookie.substring(0, name.length + 1) === name + "=") {
// 				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
// 				break;
// 			}
// 		}
// 	}
// 	return cookieValue;
// }
// {/* <div>{this.code}</div>
// 				<Card>
// 					<Card.Img
// 						variant="top"
// 						src={`http://127.0.0.1:8000${this.state.image}`}
// 						width={30}
// 						height={600}
// 					/>
// 					<Card.Title>{this.state.lessonName}</Card.Title>
// 					<Card.Title>{this.state.ostad}</Card.Title>
// 					<Card.Title>{this.state.day}</Card.Title>
// 				</Card> */}
