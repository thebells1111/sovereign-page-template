<script>
  import convertTime from "$functions/convertTime";
  // import Image from "$functions/Image.svelte";
  import {
    player,
    playerTime,
    chapters,
    chapterImage,
    chapterIndex,
    chapterText,
  } from "$/store";
  import { onMount } from "svelte";

  export let item;
  $chapterIndex = null;
  $chapterImage = null;
  $chapterText = null;

  function jumpToChapter(chapter, index) {
    if (chapter.startTime) {
      $playerTime = chapter.startTime;
      $chapterImage = chapter.img;
      $player.currentTime = $playerTime;
      $chapterIndex = index;
      $chapterText = chapter.title;
      // $playerSaveTime = 0;
    }
  }

  $: scrollTo($chapterIndex);

  function scrollTo(index) {
    if (scrollContainer && index > -1) {
      scrollContainer.scrollTop = index * 67;
      let chapter = $chapters?.[index];
      $chapterImage = chapter.img;
      $chapterText = chapter.title;
    }
  }

  let scrollContainer;
</script>

{#if $chapters}
  <ul bind:this={scrollContainer}>
    {#each $chapters as chapter, index}
      <li
        on:click={jumpToChapter.bind(this, chapter, index)}
        class:active={index === $chapterIndex}
      >
        <div class="img-container">
          <!-- svelte-ignore a11y-img -->
          <!-- <Image
            alt="chapter"
            src={chapter?.img || item?.image}
            style={`height: 100%;	width: 100%;`}
          /> -->
          <img
            src={chapter?.img || item?.["itunes:image"]?.["@_href"]}
            style={`height: 100%;	width: 100%;`}
          />
        </div>
        <p class="title">{chapter.title}</p>
        <p class="time">{convertTime(chapter.startTime)}</p>
      </li>
    {/each}
  </ul>
{/if}

<style>
  ul {
    padding: 0;
    margin: 0;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 0;
    border-bottom: 1px solid var(--chapter-border-color);
    font-weight: 500;
  }

  .active {
    background-color: var(--chapter-selected-background-color);
    color: var(--chapter-selected-text-color);
    font-weight: 550;
  }

  .img-container {
    height: 60px;
    width: 60px;
    min-width: 60px;
  }

  p {
    padding: 0 0 0 8px;
  }

  p.title {
    width: 100%;
  }

  p.time {
    padding-right: 8px;
  }
</style>
