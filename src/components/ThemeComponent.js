import React, { useContext } from "react";
import { theme_context } from "../reducer-context";

const ThemeComponent = () => {
	console.log("will theme component re-renders");
	const { state, setTheme } = useContext(theme_context);
	const changeTheme = () => {
		if (state.mode === "light") setTheme({ ...state, mode: "dark" });
		else setTheme({ ...state, mode: "light" });
	};
	return (
		<>
			<div>
				<p>this is a theme component</p>
				<p className="text-green-400">theme is {state.mode}</p>
				<button onClick={changeTheme} className="p-4 m-2 bg-red-300">
					toggle theme
				</button>
			</div>
		</>
	);
};

export default ThemeComponent;
