import React from "react";

const Form = ({ type, review, setReview, submitting, handleSubmit }) => {
	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text text-left">
				<span className="blue_gradient">Avaliação</span>
			</h1>
			<p className="desc text-left max-w-md">De uma nota para a aula com um comentário construtivo</p>

			<form onSubmit={handleSubmit} className="mt-10 w-full max-w-2x1 flex flex-col gat-7 glassmorphism">
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">Nota</span>

					<input
						value={review.description}
						type="number"
						onChange={(e) => setReview({ ...review, description: e.target.value })}
						placeholder="8"
						className="form_input "
					/>
				</label>

				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">Seu comentário</span>

					<textarea
						value={review.description}
						onChange={(e) => setReview({ ...review, description: e.target.value })}
						placeholder="escreva um comentário construtivo"
						className="form_textarea "
					/>
				</label>

				<div className="flex-end mx-3 mb-5 gap-4">
					<Link href="/" className="text-gray-500 text-sm">
						Cancelar
					</Link>

					<button type="submit" disabled={submitting} className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
						{submitting ? `submetendo` : "submeter"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
