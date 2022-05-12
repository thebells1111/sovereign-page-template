<script>
  import Header from "./EpisodeData/Header/Header.svelte";
  import ShowNotes from "./EpisodeData/ShowNotes/ShowNotes.svelte";
  import Chapters from "./EpisodeData/Chapters/Chapters.svelte";
  import Transcripts from "./EpisodeData/Transcripts/Transcripts.svelte";
  import Persons from "./EpisodeData/PodcastPersons/PodcastPersons.svelte";
  export let item;
  let display = {
    notes: ShowNotes,
    chapters: Chapters,
    transcripts: Transcripts,
    persons: Persons,
  };

  let component = display.notes;
</script>

<Header {item} {display} bind:component />

<div class="display">
  <svelte:component this={component} {item} />
</div>

<style>
  .display {
    height: calc(100% - 50px);
  }
</style>
