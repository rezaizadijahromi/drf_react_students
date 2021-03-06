import React, { Component } from "react";
import axiosInstance from "../axios";
import { render } from "react-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import axios from "axios";

export default class ClassAnswer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			answers: {
				description: "",
				image: null,
			},
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
			},
		});
	}

	handleImage(e) {
		this.setState({
			answers: {
				...this.state.answers,
				image: e.target.files[0],
			},
		});
	}

	handelSubmitAxios(e) {
		e.preventDefault();
		let formData = new FormData();
		formData.append("description", this.state.answers.description);
		formData.append("image", this.state.answers.image);
		axiosInstance.post(`/class/${this.code}/answer/`, formData);
		console.log("done");
		this.props.history.push({
			pathname: `/class/${this.code}`,
		});
		window.location.reload();
	}

	render() {
		return (
			<Grid container spacing={1} align="center">
				<Grid item xs={12}>
					<FormControl component="fieldset" xs={12}>
						<TextField
							id="filled-full-width"
							onChange={this.handelDescription}
							value={this.state.answers.description}
							style={{ margin: 8 }}
							placeholder="Title"
							fullWidth
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
							variant="filled"
						/>
						<br />
						<Button variant="contained" component="label">
							Upload File
							<input
								type="file"
								hidden
								name="image"
								onChange={this.handleImage}
							/>
						</Button>
					</FormControl>
				</Grid>

				<Grid item xs={12}>
					<Button
						color="primary"
						variant="contained"
						onClick={this.handelSubmitAxios}
					>
						Submit your answer
					</Button>
				</Grid>
			</Grid>
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
