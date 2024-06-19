'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Header2() {
	return (
		<div className="w-[100%] h-16 bg-slate-800 flex justify-center">
			<div className="w-[85%] h-full flex items-center justify-between gap-5">
				<div className="flex items-center gap-5">
					<Link href={'/'}>
						<Image
							src={'/images/logo.png'}
							alt={'Y Combinator Logo'}
							width={50}
							height={50}
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Header2;
