import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async () => {
	try {
		const classesWithProfessorAndAverageGrade = await prisma.classes.findMany({
			include: {
				professor: {
					select: {
						id: true,
						name: true, // Replace with the actual field for the professor's name
					},
				},
				StudentClasses: {
					include: {
						Feedback: {
							select: {
								review: true,
							},
						},
					},
				},
			},
			select: {
				id: true,
				label: true,
				startDate: true,
				endDate: true,
				professor: true,
				averageGrade: {
					select: {
						value: {
							avg: {
								review: true,
							},
						},
					},
				},
			},
		});

		return new Response(JSON.stringify(classesWithProfessorAndAverageGrade), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch all prompts", { status: 500 });
	}
};
