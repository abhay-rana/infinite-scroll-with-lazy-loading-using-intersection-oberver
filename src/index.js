import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./app";
// import Header from "./header";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<>
		<>
			<ToastContainer />
			<App />
			{/* <Header /> */}
		</>
	</>
);
