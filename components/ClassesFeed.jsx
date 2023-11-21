"use client";

import React, { useEffect, useState } from "react";
import { useSession} from "next-auth/react";
import { useRouter } from 'next/navigation';
import Card from "./Card";

const PromptCardList = ({ data }) => {
	const { data: userData } = useSession();
	const router = useRouter();
	return (
		<div className="mt-16 prompt_layout">
			{data?.map((classData) => {
				const startDate = new Date(classData.startDate).toLocaleString("pt-BR", { day: "numeric", month: "numeric", year: "numeric" });
				const endDate = new Date(classData.endDate).toLocaleString("pt-BR", { day: "numeric", month: "numeric", year: "numeric" });
				const hasUserReviewed = classData.feedbacks.some((feed) => feed.student.id === userData?.user?.id)

				return (
					<Card key={classData.id} title={classData.label}
						action={
							<>
								{!hasUserReviewed && (
									<div className="mt-2">
										<button type="button" className="outline_btn" onClick={() => router.push(`/review/create/${classData.id}`)}>
											Avaliar
										</button>
									</div>
								)}
							</>
						}
					
					>
						<>
							<p>{`${startDate} - ${endDate}`}</p>
							<p>Professor: {classData.professor?.name}</p>
						</>
					</Card>
				);
			})}
		</div>
	);
};

const ClassesFeed = () => {
	const [allClasses, setAllClasses] = useState([]);

	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchResults, setSearchResults] = useState([]);

	const fetchClasses = async () => {
		const response = await fetch("/api/classes");
		const data = await response.json();
		setAllClasses(data);
	};

	useEffect(() => {
		fetchClasses();
	}, []);

	const filterClasses = (searchText) => {
		const regex = new RegExp(searchText, "i");
		return allClasses.filter((item) => regex.test(item.label) || regex.test(item.professor.name));
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

			<PromptCardList data={searchText ? searchResults : allClasses} />
		</section>
	);
};

export default ClassesFeed;
