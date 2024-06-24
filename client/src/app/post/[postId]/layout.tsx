import Loading from '@/app/Loading';
import Header from '@/components/headers/header';
import { Suspense } from 'react';

export default function SinglePostLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col">
			<nav className="w-[100%] fixed top-0 z-10">
				<Suspense fallback={<Loading />}>
					<nav className="w-[100%] fixed top-0 z-10">
						<Header />
					</nav>
				</Suspense>
			</nav>
			<div className="mt-16 md:mt-20">{children}</div>
		</div>
	);
}
