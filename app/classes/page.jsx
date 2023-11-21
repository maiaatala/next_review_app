import ClassesFeed from "@components/ClassesFeed";

const Page = () => {
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				<span className="orange_gradient text-center">Aulas</span>
			</h1>
			<p className="desc text-center">Procure aulas disponivels</p>
			<ClassesFeed />
		</section>
	);
};

export default Page;
