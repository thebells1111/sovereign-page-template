<script>
	import { goto } from '$app/navigation';
	import { decode } from 'html-entities';
	import prettyDate from '$functions/prettyDate';
	import stripHtml from 'striptags';
	export let item;

	function handleLinkClick(item) {
		goto(`/episodes/${item.slug}`);
	}
</script>

<div on:click={handleLinkClick.bind(this, item)} class="container">
	<div class="card">
		<img src={item?.['itunes:image']?.['@_href']} />
		<div class="description">
			<div class="head">
				{#if item?.pubDate}
					<p>{prettyDate(item?.pubDate)}</p>
				{/if}
				<h3>{item?.title}</h3>
			</div>
			<div class="slug">
				<p>{decode(stripHtml(item?.description)).slice(0, 250)}</p>
			</div>
		</div>
	</div>
</div>

<style>
	.card > img {
		margin: 8px;
		border-radius: 6px;
		width: 130px;
		height: 130px;
		object-fit: contain;
	}
	.container {
		height: 154px;
		width: 100%;
		max-width: 750px;
		margin: 0;
		padding: 0 8px 8px 8px;
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
		position: relative;
		overflow: hidden;
		background-color: var(--item-card-background-color);
		box-shadow: 0 2px 6px 2px hsl(0deg 0% 0% / 10%);
		border-radius: 8px;
		color: #333;
	}
	.card:hover {
		background-color: var(--item-card-background-color-hover);
		color: var(--item-card-text-color-hover);
	}
	.description {
		width: 100%;
	}
	.head {
		position: relative;
		width: 100%;
	}
	.head h3 {
		width: calc(100% - 32px);
		margin: 2px 0 2px 0;
		font-size: 1.17em;
		font-weight: 650;
		max-height: 48px;
		overflow: hidden;
		text-align: start;
		display: inline-block;
		line-height: 1.17em;
	}
	.head p {
		font-size: 0.8em;
		margin: 0;
		padding: 0;
	}
	.slug {
		padding-right: 8px;
	}
</style>
