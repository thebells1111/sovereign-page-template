<script>
	import { onMount } from 'svelte';
	export let item;
	import {
		player,
		playerTime,
		chapters,
		chapterIndex,
		chapterImage,
		chapterText,
		transcript,
		transcriptIndex
	} from '$/store';

	onMount(() => {
		if (item?.['podcast:chapters']?.['@_url']) {
			getChapters(item?.['podcast:chapters']?.['@_url']);
		}
		$player.ontimeupdate = handleTimeUpdate;

		async function handleTimeUpdate() {
			$playerTime = $player?.currentTime;

			//updates the chapters images to current position
			while ($playerTime >= $chapters?.[$chapterIndex + 1]?.startTime) {
				$chapterIndex++;
			}

			while ($playerTime < $chapters?.[$chapterIndex]?.startTime) {
				$chapterIndex--;
			}

			while ($playerTime >= $transcript?.[$transcriptIndex + 1]?.start) {
				$transcriptIndex++;
			}

			while ($playerTime < $transcript?.[$transcriptIndex]?.start) {
				$transcriptIndex--;
			}
			let chapter = $chapters?.[$chapterIndex];
			$chapterImage = chapter.img;
			$chapterText = chapter.title;
		}
	});

	async function getChapters(url, selector) {
		if (url) {
			// let res = await fetch(`/api/httpsproxy?url=` + encodeURIComponent(url));
			// let res = await fetch(url);
			const res = await fetch(
				'https://00-sovereign-page-deploy.vercel.app/api/getfeed?url=' + encodeURIComponent(url)
			);
			let y = await res.json();
			$chapters = y.chapters;
		} else {
			$chapters = null;
		}
	}
</script>

<audio controls src={item.enclosure['@_url']} bind:this={$player} />

<style>
	audio {
		width: calc(100% - 16px);
		padding: 8px;
	}
</style>
