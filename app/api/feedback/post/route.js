import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req) => {
	if (req.method !== "POST") {
		return new Response("method not allowed", {
			status: 500,
		});
	}
	try {
		const data = await req.json();
		console.log("data", data);

		if (isNaN(parseFloat(data.review))) {
			console.log("review", data.review);
			return new Response("review is wrong type", {
				status: 500,
			});
		}

		const feedback = await prisma.feedbacks.create({
			data: {
				...data,
			},
		});

		return new Response(JSON.stringify(feedback), { status: 200 });
	} catch (error) {
		console.error("Failed to create feedback", error);
		return new Response("failed to create", {
			status: 500,
		});
	}
};
