<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import { fade } from "svelte/transition";

  import AppList from "./AppList.svelte";
  import Cancel from "$lib/Icons/CancelFilled.svelte";

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");

  let modal;

  const handle_keydown = (e) => {
    if (e.key === "Escape") {
      close();
      return;
    }
  };
</script>

<svelte:window on:keydown={handle_keydown} />

<div class="modal-background" on:click={close} />

<div
  class="modal"
  role="dialog"
  aria-modal="true"
  bind:this={modal}
  transition:fade={{ duration: 100 }}
>
  <button on:click={close}><Cancel size="30px" /></button>
  <AppList />
</div>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
    backdrop-filter: blur(2px);
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.2em;
    background: var(--body-background-color);
    background: radial-gradient(
      circle,
      var(--body-background-color-light) 0%,
      var(--body-background-color) 100%
    );
    box-shadow: 0 2px 6px 2px hsl(0deg 0% 0% / 10%);
    z-index: 2;
  }

  button {
    color: var(--nav-background-color-secondary);
    padding: 0;
    border: none;
    background: transparent;
    position: absolute;
    right: 4px;
    top: 4px;
    cursor: pointer;
  }
</style>
