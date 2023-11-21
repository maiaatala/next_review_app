"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";

const PromptCardList = ({ data }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data?.map((feedbackData) => {
				return (
					<Card key={feedbackData.id} title={feedbackData.class.label}
					grade={feedbackData.review}
					>
						<>
							<p>Professor: {feedbackData.class?.professor?.name}</p>
							{feedbackData.comment && <p>Comentario: {feedbackData.comment}</p>}
						</>
					</Card>
				);
			})}
		</div>
	);
};

const FeedbacksFeeds = () => {
	const [allFeedbacks, setAllFeedbacks] = useState([]);

	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchResults, setSearchResults] = useState([]);

	const fetchClasses = async () => {
		const response = await fetch("/api/feedback");
		const data = await response.json();
		setAllFeedbacks(data);
	};

	useEffect(() => {
		fetchClasses();
	}, []);

	const filterClasses = (searchText) => {
		const regex = new RegExp(searchText, "i");
		return allFeedbacks.filter((item) => regex.test(item.class?.label) || regex.test(item.class?.professor?.name));
	};

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterClasses(e.target.value);
				setSearchResults(searchResult);
			}, 500)
		);
	};

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input type="text" placeholder="procure uma aula" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
			</form>

			<PromptCardList data={searchText ? searchResults : allFeedbacks} />
		</section>
	);
};

export default FeedbacksFeeds;
