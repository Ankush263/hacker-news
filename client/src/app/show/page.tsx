import ServerHeader from '@/components/headers/serverHeader';
import SubmitHeader from '@/components/headers/submitHeader';
import Post from '@/components/posts/all-posts';
import { getToken } from '@/lib/getToken';

export default async function Show() {
	const token = await getToken();

	return (
		<div className="flex w-[100%] flex-col items-center">
			<ServerHeader />
			{token ? (
				<>
					<SubmitHeader />
					<div className="w-[90%] border-b-2 border-gray-700 mb-5 mt-5"></div>
				</>
			) : (
				''
			)}
			<div className="w-[85%]">
				<Post type="show" />
			</div>
		</div>
	);
}
