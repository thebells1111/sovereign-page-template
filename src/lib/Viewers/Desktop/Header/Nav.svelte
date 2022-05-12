<script>
	import { goto } from '$app/navigation';
	import { feedTitle, displayPage, feed } from '$/store';
</script>

<nav>
	<div
		class="title"
		on:click={() => {
			goto(`/`);
		}}
	>
		{$feedTitle}
	</div>

	<div
		on:click={() => {
			goto(`/`);
		}}
	>
		Home
	</div>

	<div
		on:click={() => {
			goto(`/episodes`);
		}}
	>
		Episodes
	</div>

	<div
		on:click={() => {
			let link = [].concat($feed?.['podcast:funding'])?.[0]?.['@_url'];

			if (link) {
				window.open(link, '_blank', 'menubar=no, status=no,top=200,left=0,width=800,height=800');
			}
		}}
	>
		Support
	</div>
</nav>

<style>
	nav {
		height: 50px;
		width: calc(100%);
		padding: 8px;
		background: var(--nav-background-color-primary);
		background: linear-gradient(
			0deg,
			var(--nav-background-color-primary) 0%,
			var(--nav-background-color-secondary) 84%
		);
		box-shadow: 0 2px 6px 4px hsl(0deg 0% 0% / 10%);
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	div {
		cursor: pointer;
		color: var(--nav-title-color);
		margin: 0 8px;
		padding: 8px;

		display: flex;
		align-items: center;
	}

	div {
		color: var(--nav-text-color);
	}

	.title {
		font-size: 2em;
		font-weight: 500;
		flex-grow: 1;
		margin: 0;
		font-family: var(--header-title-font);
	}
</style>
