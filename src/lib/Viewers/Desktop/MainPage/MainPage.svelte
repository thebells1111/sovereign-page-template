<script>
	import { browser } from '$app/env';
	import { feedItems } from '$/store';
	import MainCard from './MainCard.svelte';
	import EpisodeCard from './EpisodeCard.svelte';

	import Modal from './AppListModal.svelte';

	let showModal = false;
	let vw;
	let vh;
</script>

{#if showModal}
	<Modal on:close={() => (showModal = false)} />
{/if}
<main bind:clientHeight={vh} bind:clientWidth={vw}>
	<MainCard item={$feedItems[0]} bind:showModal />

	<div class="episodes-list">
		{#if browser}
			{#each [...$feedItems].slice(0, Math.floor(vw / (vh - 450 + 16))) as item}
				<EpisodeCard {item} height={vh - 450} />
			{/each}
		{:else}
			<div style="display:none">
				{#each $feedItems as item}
					<EpisodeCard {item} height={vh - 450} />
				{/each}
			</div>
		{/if}
	</div>
</main>

<style>
	main {
		width: calc(100%);
		height: calc(100% - 50px);
		display: flex;
		flex-direction: column;
		padding: 8px 8px 0 8px;
		overflow-x: hidden;
	}

	.episodes-list {
		padding: 0;
		margin: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
</style>
