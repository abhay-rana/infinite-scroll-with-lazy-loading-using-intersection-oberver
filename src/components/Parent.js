import React, { useState, memo, useEffect } from "react";

const Parent = memo((props) => {
	const [state, setState] = useState(0);
	console.log("parent is mounted");
	// const obj = <Child />;
	return (
		<>
			<div>Parent</div>
			<button onClick={() => setState(state + 1)}>Change Count</button>
			<props.child />
			<ChildTwo />
			{/* {props.element} */}
			{/* <props.child /> */}
			{/* <Child /> */}
			{/* {obj} */}
			{/* {props.child()} */}
		</>
	);
});

const ChildTwo = () => {
	useEffect(() => {
		console.log("child two mounts");
		return () => {
			console.log("child two unmounts");
		};
	}, []);
	return (
		<>
			<div>Child two component</div>
		</>
	);
};

export default Parent;
