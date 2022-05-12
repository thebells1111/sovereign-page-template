<script>
	import prettyDate from '$functions/prettyDate';
	import { goto } from '$app/navigation';

	export let item;
	export let height;

	function handleLinkClick() {
		goto(`/episodes/${item.slug}`);
	}
</script>

<div
	on:click={handleLinkClick}
	class="container"
	style="height: {height || 154}px; width: {height || 154}px;"
>
	<div class="card">
		<img src={item?.['itunes:image']?.['@_href']} />
		<div class="title">
			{#if item?.pubDate}
				<p>{prettyDate(item?.pubDate)}</p>
			{/if}
			<h3>{item?.title}</h3>
		</div>
	</div>
</div>

<style>
	.card > img {
		margin: 8px;
		border-radius: 6px;
		width: calc(100% - 70px);
		height: calc(100% - 70px);
		object-fit: contain;
	}

	.container {
		margin: 0;
		padding: 0;
		list-style: none;
		cursor: pointer;
		box-sizing: border-box;
		display: flex;
		position: relative;
		overflow: hidden;
	}

	.card {
		height: 100%;
		width: 100%;
		margin: 0;
		list-style: none;
		cursor: pointer;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		overflow: hidden;
		background-color: var(--item-card-background-color);
		box-shadow: 0 2px 6px 2px hsl(0deg 0% 0% / 10%);
		border-radius: 8px;
		color: var(--item-card-text-color);
	}

	.card:hover {
		background-color: var(--item-card-background-color-hover);
	}

	.title {
		position: relative;
		width: 100%;
		padding: 0 8px;
		color: var(--secondary-text-color);
	}

	.title h3 {
		width: 100%;
		margin: 2px 0;
		font-size: 1.17em;
		font-weight: 650;
		max-height: 48px;
		overflow: hidden;
		text-align: start;
		display: inline-block;
		line-height: 1.17em;
	}

	.title p {
		font-size: 0.8em;
		margin: 0;
		padding: 0;
	}
</style>
