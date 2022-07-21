import React from "react";
import { useContext } from "react";
import { store } from "../reducer-context";

const Header = () => {
	const { state, dispatch } = useContext(store);
	console.log("header ji");
	return (
		<>
			<div>This is header component</div>
			<div>show the count : {state.count}</div>
		</>
	);
};

export default Header;
