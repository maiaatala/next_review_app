import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
	try {
		const feedbackWithClass = await prisma.feedbacks.findMany({
			orderBy: [
				{
					createdAt: "desc",
				},
			],
			include: {
				class: {
					include: {
						professor: true,
					},
				},
			},
		});

		return new Response(JSON.stringify(feedbackWithClass), { status: 200 });
	} catch (error) {
		console.error("Failed fetch feedbacks", error);
		return new Response("Failed fetch feedbacks", {
			status: 500,
		});
	}
};
