<script>
	export let src = '';
	export let style = '';
	export let alt = '';
	export let img = {};

	import { proxy } from '$/stores';

	$: if (src && img) {
		if (src.includes('https')) {
			img.src = src;
		} else {
			img.src = proxy + encodeURIComponent(src);
		}
		img.alt = alt;
		img.style = style;
	}

	function handleErr(err) {
		console.log(err);
	}
</script>

<!-- svelte-ignore a11y-missing-attribute -->

<img on:error={handleErr} bind:this={img} />

<style>
</style>
