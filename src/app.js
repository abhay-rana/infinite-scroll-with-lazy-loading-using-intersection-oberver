import React, { memo, useCallback, useEffect, useMemo, useState, useRef } from "react";
import { data } from "./res";
import useTilg from "tilg";

const App = () => {
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(1);

	useTilg()`images=${images},page=${page}`;

	useEffect(() => {
		console.log("page is change", page);
		fetch(`https://api.pexels.com/v1/search/?page=${page}&per_page=15&query=people`, {
			headers: {
				Authorization: process.env.REACT_APP_AUTH_KEY,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setImages([...images, ...data.photos]);
			})
			.catch(console.log);
		// setImages([...images, ...data.data.photos]);
	}, [page]);

	const changePage = useCallback(() => {
		setPage((page) => page + 1);
		console.log("page is chnaged");
	}, []);

	const renderComponent = useCallback(() => {
		return <Children images={images} />;
	}, [images]);

	console.log(renderComponent());

	return (
		<>
			<div className=" h-screen">
				{!!images.length ? (
					<InfiniteImageLazyLoad changePage={changePage} renderComponent={renderComponent} />
				) : (
					<>
						<div>No images</div>
					</>
				)}
			</div>
		</>
	);
};

const Children = memo(({ images }) => {
	return images.map((res, index) => (
		<React.Fragment key={res.id}>
			<div className="flex element w-[350px] h-[350px]">
				<img src={res.src.small} data-src={res.src.large} className="rounded-lg filter blur-sm unobserved" id={index} />
				<p>{`${res.id},${index},`}</p>
			</div>
		</React.Fragment>
	));
});

const InfiniteImageLazyLoad = memo((props) => {
	useTilg();
	console.log("makes a new re-render");
	const current_count = useRef(0);
	let infinite_observer;
	let lazy_load_observer;

	useEffect(() => {
		infiniteScrollObserver();
		lazyLoadObserver();
		countTotalItems();
		return () => {
			// infinite_observer.disconnect();
			// lazy_load_observer.disconnect();
		};
	}, [props.renderComponent]);

	const countTotalItems = () => {};

	const infiniteScrollObserver = () => {
		const renderDiv = document.querySelectorAll(".element");
		const lastrenderDiv = renderDiv[renderDiv.length - 1];
		//observe the last element for the inifinte scrolling
		infinite_observer = new IntersectionObserver((entries) => {
			// Callback to be fired
			// Entries is a list of elements out of our targets that reported a change.
			entries.forEach((entry) => {
				// Only add to list if element is coming into view not leaving
				if (!!entry.isIntersecting) {
					// Perform some operation here
					//render new images by making a fetch or change the page_no
					infinite_observer.unobserve(entry.target);
					props.changePage();
				}
			});
		});
		infinite_observer.observe(lastrenderDiv);
	};
	const lazyLoadObserver = () => {
		//initially all the images are unobserved if they are loaded then we removed the unobserved classname with it

		let renderImg = document.querySelectorAll("img[data-src].unobserved");

		//observe the every image tag element for the lazy loading and progressive image
		lazy_load_observer = new IntersectionObserver(
			(entries) => {
				// console.log(entries);
				entries.forEach((entry) => {
					// Only add to list if element is coming into view not leaving

					if (!!entry.isIntersecting) {
						current_count.current = entry.target.id;
						// console.log("observed", current_count.current);
						entry.target.src = entry.target.dataset.src;
						entry.target.addEventListener("load", () => {
							entry.target.classList.remove("rounded-lg", "filter", "blur-sm", "unobserved");
						});
					} else return;
					// console.log("not observed", entry.target.id);
				});
			},
			{ threshold: 0.5 }
		);
		renderImg.forEach((img) => lazy_load_observer.observe(img));
	};
	return <React.Fragment>{props.renderComponent()}</React.Fragment>;
});

export default App;
