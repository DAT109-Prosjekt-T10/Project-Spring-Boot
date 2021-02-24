import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
	const [message, setMessage] = useState("");

	const baseUrl = "http://localhost:3001/home";

	let fetchData = async () => {
		fetch(baseUrl)
			.then((res) => {
				return res.text();
			})
			.then((text) => {
				setMessage(text);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="App">
			<h1>Hello</h1>
			<p>{message}</p>
		</div>
	);
}

export default App;
