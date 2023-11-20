import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await prisma.user.findUnique({
				where: {
					email: session.user.email,
				},
			});

			session.user.id = sessionUser.id.toString();

			return session;
		},
		async signIn({ profile }) {
			try {
				//check if user already exists
				const maybeUser = await prisma.user.findUnique({
					where: {
						email: profile.email,
					},
				});
				//if not, create a new user
				if (!maybeUser) {
					await prisma.user.create({
						data: {
							email: profile.email,
						},
					});
				}
				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
