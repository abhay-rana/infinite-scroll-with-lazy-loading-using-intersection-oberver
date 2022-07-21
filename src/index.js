import React from "react";
import ReactDOM from "react-dom/client";
import { ClickToComponent } from "click-to-react-component";

import "./styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./app";
import { StoreProvider, ThemeProvider } from "./reducer-context";

import Header from "./components/Header";
import Body from "./components/Body";

import ThemeComponent from "./components/ThemeComponent";
import WrapperComponent from "./components/WrapperComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<>
		<StoreProvider>
			{" "}
			<ThemeProvider>
				{" "}
				<ClickToComponent />
				{/* <ToastContainer /> */}
				{/* <App /> */}
				{/* <Header /> */}
				{/* <Body /> */}
				<WrapperComponent />
				{/* <ThemeComponent /> */}
			</ThemeProvider>
		</StoreProvider>
	</>
);
