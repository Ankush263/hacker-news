'use client';

import React from 'react';
import Image from 'next/image';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { CircleUserRound } from 'lucide-react';
import Link from 'next/link';
import * as actions from '@/actions';

function Header({ token, username }: any) {
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
					<Link href={`/newest`}>
						<div>New</div>
					</Link>
					<Link href={`/show`}>
						<div>Show</div>
					</Link>
					<Link href={`/ask`}>
						<div>Ask</div>
					</Link>
				</div>
				<div className="flex justify-center items-center gap-3">
					{token ? (
						<>
							<CircleUserRound />
							<Popover>
								<PopoverTrigger>{username}</PopoverTrigger>
								<PopoverContent>
									<form action={actions.logoutMethod}>
										<Button type="submit">Logout</Button>
									</form>
								</PopoverContent>
							</Popover>
						</>
					) : (
						<>
							<Link href={'/login'}>
								<Button>Login</Button>
							</Link>
							<Link href={'/signup'}>
								<Button>Signup</Button>
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
