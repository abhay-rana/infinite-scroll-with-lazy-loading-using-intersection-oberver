import React, { useCallback, useMemo, useState, memo, useEffect } from "react";

import Parent from "./Parent";

const WrapperComponent = () => {
	const object = <Child />; //just returns the react object
	console.log(object);
	const [state, setState] = useState(0);
	const render = useCallback(() => <Child />, [state]);
	// const render_child = useMemo(() => <Child />, []);
	return (
		<>
			<Parent child={render} />
			<button onClick={() => setState(state + 1)} className="p-2 -2 border-red border-2">
				Count Wrapper component plz
			</button>
		</>
	);
};

const Child = (props) => {
	const [state, setState] = useState(0);
	// setState(count + 1);
	useEffect(() => {
		console.log("mounts child component");
		return () => {
			console.log("unmounts child component");
		};
	}, []);

	return (
		<>
			<div>hello this is a child component</div>
		</>
	);
};

export default WrapperComponent;
