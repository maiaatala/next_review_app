import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
	try {
		const classesWithProfessor = await prisma.classes.findMany({
			include: {
				professor: true,
				feedbacks: true,
			},
		});

		return new Response(JSON.stringify(classesWithProfessor), { status: 200 });
	} catch (error) {
		console.error("Failed to fetch classes with average feedback", error);
		return new Response("Failed to fetch classes with average feedback", {
			status: 500,
		});
	}
};
