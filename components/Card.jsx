import React from "react";
import Image from "next/image";

const Card = ({ image, title, children, action, grade }) => {
	return (
		<div className="prompt_card">
			<div className="flex justify-between items-start gap-5">
				<div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
					{image && <Image src={image} width={40} height={40} className="rounded-full object-contain" />}

					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900">{title}</h3>
					</div>
				</div>

				{grade && <div className="copy_btn text-right">{grade}/10</div>}
			</div>

			{children}
			{action}
		</div>
	);
};

export default Card;
