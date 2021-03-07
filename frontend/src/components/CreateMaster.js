import React, { Component, componentDidMount } from "react";
import axiosInstance from "../axios";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormHelperText from "@material-ui/core/FormHelperText";
import ReactBootstrap from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { render } from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default class CreateMaster extends Component {
	constructor(props) {
		super(props);
		this.state = {
			masters: [
				{
					name: "",
				},
			],
			name: "",
		};

		this.handelSubmitAxios = this.handelSubmitAxios.bind(this);
		this.handelName = this.handelName.bind(this);
		this.getMasterAxios = this.getMasterAxios.bind(this);
	}

	componentDidMount() {
		this.getMasterAxios();
	}

	handelName(e) {
		this.setState({
			name: e.target.value,
		});
	}

	getMasterAxios() {
		axiosInstance.get("/master/").then((res) => {
			this.setState({
				masters: res.data,
			});
		});
	}

	handelSubmitAxios(e) {
		e.preventDefault();
		const name = this.state.name;
		axiosInstance.post("/create-master/", { name }).then((res) => {
			this.getMasterAxios();
			this.setState({
				name: "",
			});
			console.log(res.data);
		});
	}

	render() {
		return (
			<Container fixed>
				<Grid container spacing={2} align="center">
					<Grid item xs={12} align="center">
						<Typography variant="h6">Created masters</Typography>
						<AvatarGroup max={10} align="center">
							{this.state.masters.map(function (ms, index) {
								return (
									<Grid container spacing={2}>
										<Grid item xs={12} md={6}>
											<div>
												<List>
													<ListItem>
														<ListItemAvatar max={10}>
															<Avatar>
															<Avatar src="/broken-image.jpg" />
															</Avatar>
														</ListItemAvatar>
														<ListItemText primary={ms.name} />
													</ListItem>
												</List>
											</div>
										</Grid>
									</Grid>
								);
							})}
						</AvatarGroup>

						<div>
							<Grid container spacing={1} alignItems="flex-end">
								<AccountCircle />

								<TextField
									id="filled-full-width"
									onChange={this.handelName}
									value={this.state.name}
									label="add new master"
									fullWidth
									margin="normal"
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={12}>
								<Button color="primary" onClick={this.handelSubmitAxios}>
									Create new master
								</Button>
							</Grid>
						</div>
					</Grid>
				</Grid>
			</Container>
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
// {
// 	/* <Grid>
// 							<FormControl
// 								component="fieldset"
// 								onSubmit={this.handelSubmitAxios}
// 							>
// 								<FormHelperText>
// 									<div align="center">Add new master</div>
// 								</FormHelperText>
// 								<TextField
// 									variant="outlined"
// 									onChange={this.handelName}
// 									value={this.state.name}
// 								></TextField>
// 							</FormControl>
// 						</Grid> */
// }
