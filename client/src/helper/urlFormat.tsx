export default function urlFormat(url: string) {
	let domain;

	if (url && url.includes('//')) {
		if (url.indexOf('//') > -1) {
			domain = url.split('/')[2];
		} else {
			domain = url.split('/')[0];
		}

		domain = domain.split(':')[0];
		domain = domain.split('?')[0];

		domain = domain.replace(/www./g, '');

		return domain;
	}

	return false;
}
