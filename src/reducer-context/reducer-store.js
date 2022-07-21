export const INITIAL_STATE = {
	count: 0,
	name: "",
	data: null,
};

export const reducer = (state = INITIAL_STATE, action) => {
	let newState = Object.assign({}, state);
	if (action.type == "change_count") {
		newState.count = newState.count + 1;
		return newState;
	}
	if (action.type == "change_name") {
		newState.name = action.data;
		return newState;
	}
	return state;
};
