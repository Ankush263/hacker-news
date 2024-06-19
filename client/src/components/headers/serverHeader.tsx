'use server';

import React from 'react';
import { cookies } from 'next/headers';
import Header from './header';

function ServerHeader() {
	const token = cookies().get('Token') ? cookies()?.get('Token')?.value : null;
	return <Header token={token} />;
}

export default ServerHeader;
