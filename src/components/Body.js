import React, { useCallback, useContext, memo, useMemo } from "react";

import { ChangeCount, ChangeName } from "../actions/action";

import { store } from "../reducer-context";

const Body = memo(() => {
	const { dispatch } = useContext(store);
	const changeCount = useCallback(() => ChangeCount(dispatch), []);
	const changeName = useCallback(() => ChangeName(dispatch), []);

	return useMemo(
		() => (
			<>
				{console.log("it is not renderings")}
				<div className="border-red-300 border-2">
					change the count Total
					<div>
						<button onClick={changeCount} className="bg-slate-400 p-4 cursor-pointer m-2">
							Change Count
						</button>
						<button onClick={changeName} className="bg-slate-400 p-4 cursor-pointer m-2">
							Change Name
						</button>
					</div>
				</div>
			</>
		),
		[]
	);
});

export default Body;
