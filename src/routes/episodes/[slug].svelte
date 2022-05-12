<script context="module">
	export async function load({ url, param, fetch }) {
		const { pathname } = url;
		let slug = pathname.split('/')[2];

		return {
			props: {
				pathname: pathname,
				slug: slug
			}
		};
	}
</script>

<script>
	export let slug;

	import EpisodePage from '$lib/Viewers/Desktop/EpisodePage/EpisodePage.svelte';
</script>

<EpisodePage {slug} />
