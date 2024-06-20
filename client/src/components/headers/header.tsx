// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Input } from '@/components/ui/input';
// import { Button } from '../ui/button';
// import { useRouter, useSearchParams } from 'next/navigation';

// function Header() {
// 	const searchParams = useSearchParams();
// 	const router = useRouter();
// 	const [searchValue, setSearchValue] = useState('');

// 	const handleSubmit = () => {
// 		const params = new URLSearchParams(searchParams.toString());
// 		params.set('search', searchValue);
// 		router.push(`/search?${params.toString()}`);
// 	};

// 	return (
// 		<div className="w-full h-16 bg-slate-800 flex justify-center">
// 			<div className="w-11/12 h-full flex flex-col sm:flex-row items-center justify-between gap-5">
// 				<div className="flex w-full items-center gap-5">
// 					<Link href={'/'}>
// 						<Image
// 							src={'/images/logo.png'}
// 							alt={'Y Combinator Logo'}
// 							priority={false}
// 							width={50}
// 							height={50}
// 						/>
// 					</Link>
// 					<Link href={`/newest`}>
// 						<div>New</div>
// 					</Link>
// 					<Link href={`/show`}>
// 						<div>Show</div>
// 					</Link>
// 					<Link href={`/ask`}>
// 						<div>Ask</div>
// 					</Link>
// 					<Link href={`/job`}>
// 						<div>Job</div>
// 					</Link>

// 					{/* <div className="flex gap-2 ml-auto"> */}
// 					<div className="flex w-full sm:w-auto gap-2 mt-2 sm:mt-0">
// 						<Input
// 							type="text"
// 							placeholder="Search"
// 							value={searchValue}
// 							onChange={(e) => setSearchValue(e.target.value)}
// 						/>
// 						<Button onClick={handleSubmit}>search</Button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Header;

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

function Header() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [searchValue, setSearchValue] = useState('');

	const handleSubmit = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('search', searchValue);
		router.push(`/search?${params.toString()}`);
	};

	return (
		<div className="w-full h-16 bg-slate-800 flex justify-center">
			<div className="w-11/12 h-full flex flex-col sm:flex-row items-center justify-start gap-5">
				<div className="flex w-full items-center gap-5 mt-2 md:mt-0">
					<Link href={'/'}>
						<Image
							src={'/images/logo.png'}
							alt={'Y Combinator Logo'}
							priority={false}
							width={50}
							height={50}
						/>
					</Link>
					<Link href={`/newest`}>
						<div>New</div>
					</Link>
					<Link href={`/show`}>
						<div>Show</div>
					</Link>
					<Link href={`/ask`}>
						<div>Ask</div>
					</Link>
					<Link href={`/job`}>
						<div>Job</div>
					</Link>
				</div>

				<div className="flex w-full sm:w-auto gap-2 sm:mt-0">
					<Input
						type="text"
						placeholder="Search"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					<Button onClick={handleSubmit}>Search</Button>
				</div>
			</div>
		</div>
	);
}

export default Header;
