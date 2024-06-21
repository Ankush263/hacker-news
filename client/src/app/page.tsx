import Post from '@/components/posts/all-posts';
import Header from '@/components/headers/header';
import PaginationControl from '@/components/posts/pagination-control';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function Home({
	searchParams,
}: {
	searchParams: { page: string; type: string };
}) {
	const { page = '1', type = 'topstories' } = searchParams;

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
				<div className="md:w-[85%] w-[95%] mt-20 mb-10">
					<Post type={type} page={currentPage} />
				</div>
			</Suspense>

			<div className="mb-10">
				<PaginationControl type={type} currentPage={currentPage} />
			</div>
		</div>
	);
}
