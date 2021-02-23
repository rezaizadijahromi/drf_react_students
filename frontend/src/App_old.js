import React, { componentDidMount, Component } from "react";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			library: [],
			books: {
				id: null,
				name: "",
				description: "",
			},
		};

		this.showBook = this.showBook.bind(this);
		this.handelChange = this.handelChange.bind(this);
		this.handelSubmit = this.handelSubmit.bind(this);
		this.getCookie = this.getCookie.bind(this);
		this.deleteBook = this.deleteBook.bind(this);
	}

	componentDidMount() {
		this.showBook();
	}

	showBook() {
		// console.log("Books");
		var url = "http://127.0.0.1:8000/api/list/";
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				this.setState({
					library: data,
				});
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

	handelChange(e) {
		// var name = e.target.name
		// var value = e.target.value
		var { name, value } = e.target;
		this.setState({
			books: {
				...this.state.books,
				[name]: value,
			},
		});
	}

	handelSubmit(e) {
		e.preventDefault();
		console.log("item", this.state.books);

		var csrftoken = this.getCookie("csrftoken");
		var url = "http://127.0.0.1:8000/api/create-book/";
		const requestOption = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrftoken,
			},
			body: JSON.stringify(this.state.books),
		};
		fetch(url, requestOption)
			.then((res) => {
				this.showBook();
				this.setState({
					books: {
						name: "",
						description: "",
					},
				});
			})
			.catch(function (err) {
				console.log("Error", err);
			});
	}

	deleteBook(task) {
		console.log("book", task.id);
		var csrftoken = this.getCookie("csrftoken");
		fetch(`http://127.0.0.1:8000/api/delete-book/${task.id}/`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
				"X-CSRFToken": csrftoken,
			},
		}).then((res) => {
			this.showBook();
		});
	}

	render() {
		// var books_tasks = this.state.library;
		var self = this;
		return (
			<div>
				<div>
					{this.state.library.map(function (task, index) {
						return (
							<div key={index}>
								<span>{task.name}</span>
								<p>{task.description}</p>

								<div>
									<button onClick={() => self.deleteBook(task)}>delete</button>
								</div>
							</div>
						);
					})}
				</div>

				<form onSubmit={this.handelSubmit}>
					<div>
						<input
							onChange={this.handelChange}
							type="text"
							value={this.state.books.name}
							name="name"
							placeholder="add name of your bood"
						/>
					</div>
					<div>
						<input
							onChange={this.handelChange}
							type="text"
							value={this.state.books.description}
							name="description"
						/>
					</div>

					<input
						id="submit"
						className="btn btn-warning"
						type="submit"
						name="Add"
					/>
				</form>
			</div>
		);
	}
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
