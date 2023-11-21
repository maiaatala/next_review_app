import FeedbacksFeeds from "@components/FeedbacksFeeds";

const Page = () => {
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				<span className="orange_gradient text-center">Avaliações</span>
			</h1>
			<p className="desc text-center">Olhe o que outros estudantes pensam sobre as aulas</p>
      <FeedbacksFeeds/>
		</section>
	);
};

export default Page;
