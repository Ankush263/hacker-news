import Post from '@/components/posts/all-posts';
import { Suspense } from 'react';
import Loading from './Loading';

export default function Home({
	searchParams,
}: {
	searchParams: { page: string; type: string };
}) {
	const { page = '1', type = 'topstories' } = searchParams;

	const currentPage = parseInt(page, 10);

	return (
		<div className="flex w-[100%] flex-col items-center box-content overflow-hidden">
			<Suspense
				fallback={
					<div className="text-white mt-32 mb-32">
						<Loading />
					</div>
				}
			>
				<div className="md:w-[85%] w-[95%] mt-20 mb-10">
					<Post type={type} page={currentPage} />
				</div>
			</Suspense>
		</div>
	);
}
