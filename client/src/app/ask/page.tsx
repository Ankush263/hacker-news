import Header from '@/components/headers/header';
import Post from '@/components/posts/all-posts';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default async function Ask({
	searchParams,
}: {
	searchParams: { page: string; type: string };
}) {
	const { page = '1', type = 'askstories' } = searchParams;

	const currentPage = parseInt(page, 10);

	return (
		<div className="flex w-[100%] flex-col items-center">
			<div className="w-full fixed top-0 z-10">
				<Header />
			</div>

			<Suspense
				fallback={
					<div className="text-white mt-32 mb-32">
						<Loader2 className="mr-2 animate-spin" size={50} />
					</div>
				}
			>
				<div className="w-[85%] mt-20 mb-10">
					<Post type={type} page={currentPage} />
				</div>
			</Suspense>
		</div>
	);
}
