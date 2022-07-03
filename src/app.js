import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { data } from "./res";
const App = () => {
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(1);
	useEffect(() => {
		console.log("page is chnaged", page);
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
		// setImages(data.data.photos);
	}, [page]);

	const changePage = useCallback(() => {
		setPage((page) => page + 1);
	}, []);

	const memoChildren = useMemo(() => {
		images.map((res) => (
			<React.Fragment key={res.id}>
				{console.log("re-rendered how many tiumes")}
				<div className="element w-[350px] h-[350px]">
					<img src={res.src.small} data-src={res.src.large} className="rounded-lg filter blur-sm" />
				</div>
			</React.Fragment>
		));
	}, [images]);

	return (
		<>
			<div className=" h-screen">
				{!!images.length ? (
					<InfiniteImageLazyLoad changePage={changePage} images={images}>
						{memoChildren}
					</InfiniteImageLazyLoad>
				) : (
					<>
						<div>No images</div>
					</>
				)}
			</div>
		</>
	);
};

const InfiniteImageLazyLoad = memo((props) => {
	console.log("props.children", props.children);
	useEffect(() => {
		infiniteScrollObserver();
		lazyLoadObserver();
		return () => {
			// observer.disconnect();
		};
	}, [props.images]);

	const infiniteScrollObserver = () => {
		const renderDiv = document.querySelectorAll(".element");
		const lastrenderDiv = renderDiv[renderDiv.length - 1];

		//observe the last element for the inifinte scrolling

		const observer = new IntersectionObserver((entries) => {
			// Callback to be fired
			// Entries is a list of elements out of our targets that reported a change.
			entries.forEach((entry) => {
				// Only add to list if element is coming into view not leaving
				if (!!entry.isIntersecting) {
					// Perform some operation here
					observer.unobserve(entry.target);
					//render new images by making a fetch or change the page_no
					props.changePage();
				}
			});
		});
		observer.observe(lastrenderDiv);
	};
	const lazyLoadObserver = () => {
		const renderImg = document.querySelectorAll("img[data-src]");

		//observe the every image tag element for the lazy loading and progressive image

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				// Only add to list if element is coming into view not leaving

				if (!!entry.isIntersecting) {
					entry.target.src = entry.target.dataset.src;
					entry.target.addEventListener("load", () => {
						entry.target.classList.remove("rounded-lg", "filter", "blur-sm");
						observer.unobserve(entry.target);
					});
				} else return;
			});
		});
		renderImg.forEach((img) => observer.observe(img));
	};

	return <React.Fragment>{props.children}</React.Fragment>;
});

export default App;
