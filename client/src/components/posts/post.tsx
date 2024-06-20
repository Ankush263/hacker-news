import {
	MessageCircle,
	SquareArrowOutUpRight,
	Triangle,
	User,
} from 'lucide-react';
import Link from 'next/link';
import urlFormat from '@/helper/urlFormat';

export default function PostComponent({
	id,
	score,
	title,
	url,
	by,
	descendants,
}: {
	id: number;
	score: number;
	title: string;
	url: string;
	by: string;
	descendants: number;
}) {
	return (
		<div className="border-gray-700 w-[100%] h-auto border-b-2 flex flex-col md:flex-row justify-between items-start md:items-center p-10 md:p-4 ">
			<div className="flex items-center mb-2 md:mb-0 w-[100%] ">
				<div className="gap-1 hidden md:flex">
					<Triangle size={15} className="cursor-pointer" />
					<span className="text-sm ml-2">{score}</span>
				</div>
				<Link
					href={`/post/${id}`}
					className="text-sm font-semibold sm:text-sm text-start mb-0 sm:ml-2"
				>
					{title}
				</Link>
			</div>
			<div className="flex flex-row md:flex-row items-start md:items-center gap-2 md:gap-5">
				<div className="flex gap-0 sm:hidden">
					<Triangle size={15} className="cursor-pointer" />
					<span className="text-xs ml-2">{score}</span>
				</div>
				<div className="flex gap-1">
					<User size={15} />
					<span className="text-xs">{by}</span>
				</div>
				{url ? (
					<Link href={url} target="_blank" className="flex gap-1">
						<SquareArrowOutUpRight size={15} />
						<span className="text-xs truncate max-w-[200px] md:max-w-none">
							{urlFormat(url)}
						</span>
					</Link>
				) : null}
				<Link href={`/post/${id}`} className="flex gap-1">
					<MessageCircle size={15} />
					<span className="text-xs">{descendants}</span>
				</Link>
			</div>
		</div>
	);
}
