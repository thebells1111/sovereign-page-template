<script>
	import parseSRT from 'parse-srt';
	import VirtualList from 'svelte-tiny-virtual-list';

	import convertTime from '$functions/convertTime';

	import { player, playerTime, transcriptIndex, chapterIndex, transcript } from '$/store';
	import { onMount } from 'svelte';

	export let item;
	let scrollToIndex = $transcriptIndex;

	onMount(() => {
		scrollToIndex = $transcriptIndex;
	});

	async function getTranscript(transcriptSRT) {
		let res = await fetch(transcriptSRT['@_url']);
		if (res.status === 200) {
			let text = await res.text();
			let tran = parseSRT(text);
			let t = tran
				.map((v) => v.text)
				.join(' ')
				.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' ');

			tran.full = t.split('|-|').join(' ');
			$transcript = tran;
		} else {
			$transcript = null;
			filteredTranscript = null;
		}
	}

	$: if (item && item?.['podcast:transcript']) {
		const transcriptSRT = []
			.concat(item?.['podcast:transcript'])
			?.find((v) => v['@_type'] === 'application/srt');

		if (transcriptSRT?.['@_url']) {
			getTranscript(transcriptSRT);
		} else {
			$transcript = null;
			filteredTranscript = null;
		}
	} else {
		$transcript = null;
		filteredTranscript = null;
	}

	function jumpToSection(section, index) {
		if (section.start) {
			$player.currentTime = section.start;
			$chapterIndex = $chapterIndex;
			$transcriptIndex = index;
		}
	}

	let listHeight = 0;
	let scrollToAlignment = 'start';

	$: if ($transcriptIndex && scrollStatus === 'Disable') {
		scrollToIndex = $transcriptIndex;
	}

	let transcriptSearchQuery = '';
	$: filteredTranscript = $transcript;
	let scrollStatus = 'Disable';

	let currentIndex = 0;
	let filteredIndices = [];

	function searchTranscripts() {
		if (transcriptSearchQuery) {
			scrollStatus = 'Enable';
			currentIndex = 0;
			filteredIndices = getAllIndexes($transcript, transcriptSearchQuery);
			if (filteredIndices.length > 0) {
				scrollToIndex = filteredIndices[0];
				scrollToAlignment = 'center';
			}
		} else {
			currentIndex = 0;
			scrollToIndex = $transcriptIndex || 0;
			filteredIndices = [];
			scrollToAlignment = 'start';
			scrollStatus = 'Disable';
		}

		function getAllIndexes(arr, val) {
			var indexes = [],
				i;
			for (i = 0; i < arr.length; i++)
				if (arr[i].text.toLowerCase().includes(val.toLowerCase())) {
					indexes.push(i);
				}
			return indexes;
		}
	}

	function handleScrollStatus() {
		scrollStatus = scrollStatus === 'Enable' ? 'Disable' : 'Enable';
	}

	function getNextIndex() {
		currentIndex++;
		if (currentIndex === filteredIndices.length) {
			currentIndex = 0;
		}
		scrollToIndex = filteredIndices[currentIndex];
	}
	function getPreviousIndex() {
		currentIndex--;
		if (currentIndex === -1) {
			currentIndex = filteredIndices.length - 1;
		}
		scrollToIndex = filteredIndices[currentIndex];
	}

	function handleClear() {
		currentIndex = 0;
		filteredIndices = [];
		scrollToAlignment = 'start';
		scrollToIndex = $transcriptIndex || 0;
		transcriptSearchQuery = '';
		scrollStatus = 'Disable';
	}

	let yPosStart = 0;
</script>

<div class="search-container">
	<label>
		<input
			type="search"
			bind:value={transcriptSearchQuery}
			on:input={searchTranscripts}
			placeholder="Search Transcripts"
		/>
	</label>
</div>
<div class="bar-2">
	<button class="scrolling" on:click={handleScrollStatus}>
		{scrollStatus} Scrolling
	</button>
	{#if filteredIndices.length > 0}
		<div class="index-select">
			<button class="previous" on:click={getPreviousIndex}>&#9664</button>
			<span>
				{currentIndex + 1} of {filteredIndices.length}
			</span>
			<button class="next" on:click={getNextIndex}>&#9654</button>
		</div>
	{/if}
</div>

{#if filteredTranscript?.length}
	<div class="list-height" bind:clientHeight={listHeight}>
		<VirtualList
			height={listHeight}
			width="100%"
			itemCount={filteredTranscript.length}
			itemSize={50}
			overscanCount={5}
			on:afterScroll={(e) => {
				transcriptOffset = e.detail.offset;
				scrollStatus = 'Enable';
			}}
			{scrollToIndex}
			{scrollToAlignment}
		>
			<div
				slot="item"
				let:index
				let:style
				{style}
				class="row"
				class:active={index === $transcriptIndex || index === filteredIndices[currentIndex]}
				on:click={jumpToSection.bind(this, filteredTranscript?.[index], index)}
			>
				<p class="transcript-text">
					{@html filteredTranscript?.[index].text || ''}
				</p>
				<p class="transcript-time">
					{convertTime(filteredTranscript?.[index].start) ?? ''}
				</p>
			</div>
		</VirtualList>
	</div>
{/if}

<style>
	.list-height {
		height: calc(100% - 82px);
	}

	div {
		display: flex;
	}

	div.active p {
		font-weight: 700;
		color: var(--transcript-active-text-color);
	}

	.search-container {
		width: 100%;
		height: 36px;
		display: block;
		position: relative;
	}

	.search-container > .clear {
		position: absolute;
		top: 0;
		right: 0;
	}

	.transcript-text {
		flex: 1 1 auto;
	}

	.transcript-time {
		padding-right: 8px;
	}

	input {
		width: calc(100% - 16px);
		margin: 0 8px;
		background-color: var(--input-background-color);
		outline: none;
		color: var(--secondary-text-color);
		border-color: var(--tertiary-text-color);
		border-radius: 20px;
		padding-left: 16px;
		padding-right: 16px;
		font-size: 1.1em;
	}

	::placeholder {
		color: var(--tertiary-text-color);
	}

	input:focus {
		border-color: var(--input-border-color);
	}

	.bar-2 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px;
		border-bottom: 1px solid var(--border-color);
	}

	.index-select > span {
		width: 100px;
		text-align: center;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--primary-text-color);
	}

	button {
		background-color: transparent;
		border: none;
		padding: 0;
		margin: 0;
		color: var(--primary-text-color);
		height: 36px;
		width: 36px;
		text-align: center;
		cursor: pointer;
	}
	.scrolling {
		width: auto;
	}

	.next {
		text-align: start;
	}
	.previous {
		text-align: end;
	}
</style>
