import './globals.css';
import ServerHeader from '@/components/headers/serverHeader';
import SubmitHeader from '@/components/headers/submitHeader';
import Post from '@/components/posts/all-posts';
import { getToken } from '@/lib/getToken';
import { Suspense } from 'react';
import { PostLoading } from '@/components/posts/post-loading';

export default async function Home() {
	const token = await getToken();

	return (
		<div className="flex w-[100%] flex-col items-center">
			<ServerHeader />
			{token ? (
				<>
					<SubmitHeader />
					<div className="w-[85%] border-b-2 border-gray-700 mb-5 mt-5"></div>
				</>
			) : (
				''
			)}

			<Suspense fallback={<PostLoading />}>
				<div className="w-[85%]">
					<Post type="desc" />
				</div>
			</Suspense>
		</div>
	);
}
