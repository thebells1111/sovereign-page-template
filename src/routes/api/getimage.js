export const get = async (request) => {
	try {
		let response;
		let url = request.url.searchParams.get('url');
		url = url !== 'undefined' ? url : undefined;
		if (url) {
			const res = await fetch(url, {});

			let proxy = await res.arrayBuffer();

			response = {
				status: res.status,
				headers: {
					'Content-Type': res.headers.get('Content-Type'),
					'Cache-Control': res.headers.get('Cache-Control')
				},
				body: new Uint8Array(proxy)
			};
		}

		if (response.status === 404 || !url) {
			return { body: [] };
		}

		return response;
	} catch (err) {
		console.log(err);
		return {
			status: 500,
			body: { message: 'Server Error' }
		};
	}
};
