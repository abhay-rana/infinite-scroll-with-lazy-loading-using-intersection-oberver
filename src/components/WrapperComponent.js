import React, { useCallback, useMemo, useState, memo, useEffect } from "react";

const WrapperComponent = () => {
	const [state, setState] = useState(0);
	const render = useCallback(() => <Child />, [state]); // on every re-rendering render function  make a new reference and when react reconcile and compare the render function reference so the old reference is deleted and so then the child component is unmounted

	return (
		<>
			<Parent child={render} />
			<button onClick={() => setState(state + 1)} className="p-2 -2 border-red border-2">
				Change Count Wrapper Component
			</button>
		</>
	);
};

const Child = (props) => {
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

const Parent = memo((props) => {
	const [state, setState] = useState(0);
	console.log("parent is mounted");
	return (
		<>
			<div>Parent Component</div>
			<button onClick={() => setState(state + 1)} className="cursor-pointer p-2 bg-red-500">
				Change Child Count
			</button>
			<props.child />
		</>
	);
});

export default WrapperComponent;
