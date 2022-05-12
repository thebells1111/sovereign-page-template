<script>
	import { feedItems, player, chapterImage, chapterText } from '$/store';
	import EpisodeData from './EpisodeData.svelte';
	import Player from '$lib/Player/Player.svelte';

	import prettyDate from '$functions/prettyDate';

	let item;
	let mounted;
	export let slug;

	$: loadItem(slug);

	loadItem();
	function loadItem() {
		item = $feedItems.find((item) => item.slug === slug);
		if (item) {
			mounted = true;
		}
	}
</script>

{#if mounted}
	<div class="grid-container">
		<div class="episode">
			<div class="title">
				<h2>{item?.title}</h2>
				{#if item?.pubDate}
					<p>{prettyDate(item?.pubDate)}</p>
				{/if}
			</div>
			<div class="image-container">
				<div class="image-center">
					<img src={$chapterImage || item?.['itunes:image']?.['@_href']} />
				</div>
			</div>
			<div class="chapter-text">
				{#if $chapterText}
					<h3>{$chapterText}</h3>
				{/if}
			</div>

			<div class="player">
				<Player {item} />
			</div>
		</div>
		<div class="data">
			<EpisodeData {item} />
		</div>
	</div>
{/if}

<style>
	.grid-container {
		height: calc(100% - 50px);
		display: grid;
		grid-template-columns:
			min(50%, min(calc(100vw - 100px), calc(100vh - 100px)))
			1fr;
		grid-template-rows: 1fr;
		gap: 0px 0px;
		grid-template-areas: 'episode data';
		overflow: hidden;
		padding: 0 8px;
	}

	.image-container {
		width: 80%;
		position: relative;
	}

	.image-center {
		width: 100%;
		max-height: 100%;
		aspect-ratio: 1;
		position: relative;
		margin: auto;
		top: 50%;
		transform: translateY(-50%);
		display: grid;
		place-content: center;
	}

	img {
		width: 100%;
		border-radius: 8px;
		object-fit: contain;
		box-shadow: 0 2px 6px 2px hsl(0deg 0% 0% / 10%);
	}

	.chapter-text {
		width: 100%;
		flex-grow: 1;
	}

	.chapter-text h3 {
		text-align: center;
	}

	.player {
		grid-area: player;
		width: 100%;
	}

	.episode {
		grid-area: episode;
		overflow: auto;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 8px 0;
	}

	h2 {
		margin: 0;
	}

	.title {
		width: 100%;
		margin-bottom: 12px;
	}
	.title h2 {
		text-align: left;
		padding: 0 16px;
		width: 100%;
		color: var(--episode-title-text-color);
	}

	.title p {
		text-align: right;
		padding: 0 24px;
		width: 100%;
		color: var(--episode-pubdate-text-color);
	}

	.data {
		grid-area: data;
		overflow: auto;
		height: calc(100% - 20px);
		background-color: var(--item-card-background-color);
		border-radius: 8px;
		padding: 8px;
		box-shadow: 0 2px 6px 2px hsl(0deg 0% 0% / 10%);
		margin-top: 8px;
	}

	p {
		margin: 0;
	}
</style>
