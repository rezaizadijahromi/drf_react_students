import React, { componentDidMount, Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";
import axiosInstance from "../axios";
import { render } from "react-dom";
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
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import ReactBootstrap from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Answer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: "",
			image: "",
		};

		this.code = this.props.match.params.code;
		this.slug = this.props.match.params.slug;
		this.getDataAxsios = this.getDataAxsios.bind(this);
	}

	componentDidMount() {
		this.getDataAxsios()
	}

	getDataAxsios() {
		axiosInstance
			.get(`/class/${this.code}/answer/${this.slug}/`)
			.then((res) => {
				console.log(res.data.description);
				this.setState({
					description: res.data.description,
					image: res.data.image,
				});
			});
	}

	render() {
		return (
			<div>
				<Container>
					<Grid container spacing={2}>
						<Grid item={true} xs={12}>
							<CardContent>
								<Typography gutterBottom variant="h5" component="h2">
									description: {this.state.description}
								</Typography>
							</CardContent>
							<Card >
								<CardMedia
									component="img"
									src={`http://127.0.0.1:8000${this.state.image}`}
									width={"100%"}
									height={"100%"}
								/>
							</Card>
						</Grid>
					</Grid>
					</Container>
			</div>
		);
	}
}

export default Answer;
