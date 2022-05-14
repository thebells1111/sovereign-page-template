<script context="module">
	import feedInfo from '../feed_info.json';

	export async function load({ url, param, fetch }) {
		const [feed, feedTitle, feedImage, feedItems, feedUrl] = await getFeed();

		return {
			props: {
				props: {
					feed: feed,
					feedTitle: feedTitle,
					feedImage: feedImage,
					feedItems: feedItems,
					feedUrl: feedUrl
				}
			}
		};

		async function getFeed() {
			const response = await fetch('/api/getfeed?url=' + encodeURIComponent(feedInfo.feedUrl), {
				// 'User-Agent': userAgent
			});
			const f = (await response.json()) || {};

			const feed = f.rss.channel;
			const feedTitle = feed.title;
			const feedImage = feed?.image?.['@_url'] || feed?.['itunes:image']?.['@_href'];
			const feedItems = [].concat(feed.item).map((v) => {
				v.slug = v.title
					.toLowerCase()
					.replace(/[^a-z0-9 ]/g, '')
					.replace(/[ ]/g, '_');
				return v;
			});
			return [feed, feedTitle, feedImage, feedItems, feedInfo.feedUrl];
		}
	}
</script>

<script>
	import { feed, feedTitle, feedImage, feedItems, feedUrl, apps } from '$/store';

	export let props;
	$feed = props.feed;
	$feedTitle = props.feedTitle;
	$feedImage = props.feedImage;
	$feedItems = props.feedItems;
	$feedUrl = props.feedUrl;

	console.log($feed);
	console.log($feedImage);

	import Nav from '$lib/Viewers/Desktop/Header/Nav.svelte';

	import '../app.css';

	getApps();

	async function getApps() {
		const response = await fetch(
			'https://raw.githubusercontent.com/Podcastindex-org/web-ui/master/server/data/apps.json',
			{
				'User-Agent': $feedTitle
			}
		);
		let a = (await response.json()) || {};
		$apps = a
			.filter((v) => {
				if (v.appType.includes('podcast player')) {
					v.appIconUrl = 'https://podcastindex.org/api/images/' + v.appIconUrl;
					return true;
				}
			})
			.sort((a, b) => (a.supportedElements.length > b.supportedElements.length ? -1 : 1));
	}
</script>

<svelte:head>
	<title>{$feedTitle}</title>
</svelte:head>
<Nav />

<slot />

<style>
</style>
