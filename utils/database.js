import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

let isConnected = false;

export const connectToDB = async () => {
	if (isConnected) {
		console.log("Prisma Client is already connected to the database");
		return;
	}

	try {
		await prisma.$connect();
		isConnected = true;
		console.log("connected to prisma client");
	} catch (error) {
		console.error(error);
	}
};

export const disconnetFromDB = async () => {
	try {
		await prisma.$disconnect();
		isConnected = false;
		console.log("disconnected from prisma client");
	} catch (error) {
		console.error(error);
	}
};
