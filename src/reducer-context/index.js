import { createContext, useReducer, useState } from "react";
import { reducer, INITIAL_STATE } from "./reducer-store";

export const store = createContext();
export const theme_context = createContext();
export const StoreProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	return <store.Provider value={{ state, dispatch }}>{props.children}</store.Provider>;
};

export const ThemeProvider = (props) => {
	const theme_state = {
		mode: "light",
	};
	const [state, setTheme] = useState(theme_state);
	return <theme_context.Provider value={{ state, setTheme }}>{props.children}</theme_context.Provider>;
};
