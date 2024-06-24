import Post from '@/components/posts/all-posts';
import Loading from '../Loading';
import { Suspense } from 'react';

export default async function New({
	searchParams,
}: {
	searchParams: { page: string; type: string };
}) {
	const { page = '1', type = 'newstories' } = searchParams;

	const currentPage = parseInt(page, 10);

	return (
		<div className="flex w-[100%] flex-col items-center">
			<Suspense
				fallback={
					<div className="text-white mt-32 mb-32">
						<Loading />
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
