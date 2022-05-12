<script>
  export let item;
  export let display;
  export let component;

  let screenSelect = "notes";
  let showChapters;
  let showTranscripts;
  let showPersons;

  function handleListClick(screen) {
    screenSelect = screen;
    component = display[screen];
  }

  $: if (item) {
    showChapters = false;
    showTranscripts = false;
    if (item?.["podcast:chapters"]?.["@_url"]) {
      showChapters = true;
    }

    if (
      item?.["podcast:transcript"] &&
      []
        .concat(item?.["podcast:transcript"])
        ?.find((v) => v["@_type"] === "application/srt")
    ) {
      showTranscripts = true;
    }

    if (item?.["podcast:person"]) {
      showPersons = true;
    }
  }
</script>

<ul>
  <li
    class:active={screenSelect === "notes"}
    on:click|stopPropagation={handleListClick.bind(this, "notes")}
  >
    Show Notes
  </li>
  {#if showChapters}
    <li
      class:active={screenSelect === "chapters"}
      on:click|stopPropagation={handleListClick.bind(this, "chapters")}
    >
      Chapters
    </li>
  {/if}
  {#if showTranscripts}
    <li
      class:active={screenSelect === "transcripts"}
      on:click|stopPropagation={handleListClick.bind(this, "transcripts")}
    >
      Transcripts
    </li>
  {/if}

  {#if showPersons}
    <li
      class:active={screenSelect === "persons"}
      on:click|stopPropagation={handleListClick.bind(this, "persons")}
    >
      Cast
    </li>
  {/if}

  <!-- <li
		class:active={display === 'comments'}
		on:click|stopPropagation={handleListClick.bind(this, 'comments')}
	>
		Comments
	</li> -->
</ul>

<style>
  ul {
    display: flex;
    height: 50px;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
    margin: 8px;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: 550;
    color: var(--episode-notes-header-text-color);
  }

  .active {
    color: var(--episode-notes-header-active-text-color);
  }
</style>
