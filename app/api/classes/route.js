import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
	try {
		const classesWithProfessor = await prisma.classes.findMany({
			orderBy: [
				{
					endDate: "desc",
				},
			],
			include: {
				professor: true,
				feedbacks: {
					include: {
						student: true,
					},
				},
			},
		});

		const avgGrade = await prisma.feedbacks.groupBy({
			by: ["classId"],
			_avg: {
				review: true,
			},
		});
		const classesWithAVG = classesWithProfessor.map((c) => {
			return {
				...c,
				overallGrade: avgGrade.find((avg) => avg.classId === c.id)?._avg?.review,
			};
		});
		return new Response(JSON.stringify(classesWithAVG), { status: 200 });
	} catch (error) {
		console.error("Failed to fetch classes with average feedback", error);
		return new Response("Failed to fetch classes with average feedback", {
			status: 500,
		});
	}
};
