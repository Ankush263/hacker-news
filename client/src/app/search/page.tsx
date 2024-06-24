import PostComponent from '@/components/posts/post';
import { ListItemInterface } from '@/types';

export default async function Search({
	searchParams,
}: {
	searchParams: { search: string };
}) {
	const { search } = searchParams;

	const URL = 'https://hn.algolia.com/api/v1';

	let posts;
	let response;

	response = await fetch(`${URL}/search?query=${search}&tags=story`);

	if (response.ok) {
		posts = await response.json();
	}

	return (
		<div className="flex w-[100%] flex-col items-center">
			<div className="w-[85%] mt-20 mb-10">
				{posts?.hits.map((post: ListItemInterface) => {
					return (
						<PostComponent
							key={post?.id}
							id={post?.story_id}
							score={post?.points}
							title={post?.title}
							url={post?.url}
							by={post?.by}
							descendants={post?.descendants}
						/>
					);
				})}
			</div>
		</div>
	);
}
