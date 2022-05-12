<script>
  export let item;
</script>

<div class="show-notes">{@html item.description}</div>

<style>
  .show-notes {
    padding-right: 8px;
    height: 100%;
    overflow: auto;
  }

  :global(.show-notes p) {
    font-size: 1.1em;
  }

  :global(.show-notes a) {
    font-size: 1.1em;
    font-weight: 600;
    color: var(--link-text-color);
    text-decoration: none;
  }
</style>
