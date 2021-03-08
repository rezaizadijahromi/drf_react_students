import React, { componentDidMount, Component } from "react";
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

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	NavLink,
} from "react-router-dom";
class ClassRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [
				{
					code: null,
					lesson: "",
					ostad: "",
					day: 1,
					image: "",
				},
			],
		};

		// this.fetchData = this.fetchData.bind(this);
		this.fetchDataAxios = this.fetchDataAxios.bind(this);
	}

	componentDidMount() {
		this.fetchDataAxios();
		// this.fetchData();
	}
	fetchDataAxios() {
		axiosInstance.get().then((res) => {
			console.log("Axios", res.data);
			this.setState({
				products: res.data,
			});
		});
	}

	render() {
		var pro = this.state.products;

		return (
			<React.Fragment>
				<main>
					<Container maxWidth="md">
						{/* End hero unit */}
						<Grid container spacing={4}>
							{pro.map((product, index) => (
								<Grid item key={index} xs={12} sm={6} md={4}>
									<Card
										// className={{
										// 	height: "80%",
										// 	display: "flex",
										// 	flexDirection: "column",
										// }}
										spacing={8}
									>
										<CardMedia
											// className={{
											// 	paddingTop: "56.25%",
											// }}
											component="img"
											src={product.image}
										></CardMedia>
										<CardContent>
											<Typography gutterBottom variant="h5" component="h2">
												{product.code}
											</Typography>
											<Typography>{product.lesson.name}</Typography>
											<Typography>{product.ostad.name}</Typography>
										</CardContent>
										<CardActions>
											<NavLink
												to={`class/${product.code}`}
											>
												Go to class
											</NavLink>
											<Button size="small" color="primary">
												request
											</Button>
										</CardActions>
									</Card>
								</Grid>
							))}
						</Grid>
					</Container>
				</main>
			</React.Fragment>
		);
	}
}
export default ClassRoom;
