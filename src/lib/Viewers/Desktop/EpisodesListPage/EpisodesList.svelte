<script>
	import { feedItems } from '$/store';
	import EpisodeCard from './EpisodeCard.svelte';
</script>

<main>
	<div class="episodes-list">
		{#each $feedItems as item}
			<EpisodeCard {item} />
		{/each}
	</div>
</main>

<style>
	main {
		width: calc(100%);
		height: calc(100% - 50px);
	}

	.episodes-list {
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 8px 8px 0 8px;
	}
</style>
