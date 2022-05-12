<script>
	import { selectedEpisode } from '$/stores';
</script>

<iframe src={$selectedEpisode.chat} />

<style>
	iframe {
		width: 100%;
		height: 100%;
	}
</style>
