"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
	const [providers, setProviders] = useState(null);
	const { data: session } = useSession();
	useEffect(() => {
		const fetchProviders = async () => {
			const response = await getProviders();

			setProviders(response);
		};

		fetchProviders();
	}, []);

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				Home
			</Link>
			{/* desktop nav */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/classes" className="black_btn">
							Aulas
						</Link>
						<Link href="/reviews" className="black_btn">
							Avaliações
						</Link>
						<Link href="/professors" className="black_btn">
							Professores
						</Link>

						<button type="button" onClick={signOut} className="outline_btn">
							Sair
						</button>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
									Logar
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
