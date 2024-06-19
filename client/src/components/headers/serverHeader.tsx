'use server';

import React from 'react';
import { cookies } from 'next/headers';
import { getUsername } from '@/lib/getToken';
import Header from './header';

function ServerHeader() {
	const token = cookies().get('Token') ? cookies()?.get('Token')?.value : null;
	const name = getUsername();
	return <Header token={token} username={name} />;
}

export default ServerHeader;
