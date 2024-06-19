import ServerHeader from '@/components/headers/serverHeader';
import SubmitHeader from '@/components/headers/submitHeader';
import Post from '@/components/posts/all-posts';

export default function Ask() {
	return (
		<div className="flex w-[100%] flex-col items-center">
			<ServerHeader />
			<SubmitHeader />
			<div className="w-[90%] border-b-2 border-gray-700 mb-5 mt-5"></div>
			<div className="w-[85%]">
				<Post type="ask" />
			</div>
		</div>
	);
}
