<script>
	import { feedImage, feed } from '$/store';
	export let showModal;

	function handleSupportClick() {
		let link = [].concat($feed?.['podcast:funding'])?.[0]?.['@_url'];

		if (link) {
			window.open(link, '_blank', 'menubar=no, status=no,top=200,left=0,width=800,height=800');
		}
	}

	$: console.log($feedImage);
</script>

<div class="container">
	<div class="cover-art">
		<img src={$feedImage} class="cover-art-image" />
	</div>
	<div class="feed-data">
		<div class="description">
			{#if $feed.description}
				<h2>{@html $feed.description}</h2>
			{/if}
			{#if $feed['itunes:summary'] && $feed['itunes:summary'] !== $feed.description}
				<h2>{$feed['itunes:summary']}</h2>
			{/if}
		</div>
		<div class="button-bar">
			<button class="support" on:click={handleSupportClick}>
				{[].concat($feed['podcast:funding'])[0]?.['#text'] || 'Support the Show'}
			</button>
			<button class="subscribe" on:click={() => (showModal = true)}> Subscribe </button>
		</div>
	</div>
</div>

<style>
	.container {
		margin: 0;
		margin-bottom: 16px;
		min-height: 400px;
		width: 100%;
		list-style: none;
		box-sizing: border-box;
		display: flex;
		position: relative;
		overflow: hidden;
		background-color: var(--item-card-background-color);
		box-shadow: 0 2px 4px 0 hsla(0, 0%, 0%, 0.1);
		border-radius: 8px;
		color: var(--item-card-text-color);
	}
	.cover-art {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 400px;
	}

	.feed-data {
		padding: 32px 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
	}

	h2 {
		color: var(--primary-text-color);
		margin: 0 0 8px 0;
	}

	.cover-art-image {
		width: 360px;
		height: 360px;
		border-radius: 8px;
	}

	.button-bar {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button {
		margin: 0 8px;
		padding: 0 8px;
		min-height: 36px;
		min-width: 138px;
		font-weight: 525;
		color: var(--primary-button-text-color);
		text-shadow: 0 1px #c0c0c0;
		background: var(--primary-button-background-color);
		background-image: var(--primary-button-background-image);
		border-radius: 50px;
		border: none;
		outline: 0;
		cursor: pointer;
	}

	.support {
		background: var(--support-button-background-color);
		background-image: var(--support-button-background-image);
	}
</style>
