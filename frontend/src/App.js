import React, { componentDidMount, Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";

import ClassRoom from "./components/ClassRoom";
import NavR from "./components/NavR";
import Footer from "./components/Footer";
import ClassDetail from "./components/ClassDetail";
import CreateClass from "./components/CreateClass";
import CreateMaster from "./components/CreateMaster";
import CreateLesson from "./components/CreateLesson";
import ClassAnswer from "./components/ClassAnswer";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";

class App extends Component {
	constructor(props) {
		super(props);
		this.setState({});
	}

	componentDidMount() {}

	render() {
		return (
			<Router>
				<Navbar />
				<Route path="/" component={ClassRoom} exact />
				<Route path="/create-class" component={CreateClass} />
				<Route path="/create" component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} />
				<Route path="/create-master" component={CreateMaster} />
				<Route path="/create-lesson" component={CreateLesson} />
				<Route path="/class/:code" component={ClassDetail} />
				<Route path="/class/:code/answer/" component={ClassAnswer} />

				<Footer />
			</Router>
		);
	}
}

export default App;
