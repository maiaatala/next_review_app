import Link from "next/link";
import React from "react";

const Form = ({ feedback, setFeedback, submitting, handleSubmit }) => {
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
						value={feedback.review}
						type="number"
						onChange={(e) => {
							if (!e.target.value) return setFeedback({ ...feedback, review: undefined });
							const value = Number(e.target.value);
							if (value >= 0 && value <= 10) {
								setFeedback({ ...feedback, review: value });
							}
						}}
						placeholder="8"
						className="form_input "
						max="10"
						min="0"
						/>
				</label>

				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">Seu comentário</span>

					<textarea
						value={feedback.comment}
						onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
						placeholder="escreva um comentário construtivo"
						className="form_textarea "
					/>
				</label>

				<div className="flex-end mx-3 mt-2 mb-5 gap-4 items-center justify-center">
					<Link href="/" className="text-gray-500 text-sm">
						Cancelar
					</Link>

					<button type="submit" disabled={submitting} className=" px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
						{submitting ? `submetendo` : "submeter"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
