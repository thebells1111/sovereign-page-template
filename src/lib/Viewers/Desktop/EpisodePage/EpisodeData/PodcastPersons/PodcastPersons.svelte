<script>
  export let item;
  let image;
  let hasError = false;

  function handleError() {
    if (!hasError) {
      hasError = true;
      image.src =
        "https://00-sovereign-page-deploy-thebells1111.vercel.app/api/getimage?url=" +
        encodeURIComponent(image.src);
    }
  }
</script>

<div class="podcast-persons">
  {#each [].concat(item?.["podcast:person"]) as person}
    <a href={person?.["@_href"]} class="person">
      <img src={person?.["@_img"]} bind:this={image} on:error={handleError} />
      <p>{person?.["#text"] || ""}</p>
    </a>
  {/each}
</div>

<style>
  .podcast-persons {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .person {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 8px;
  }
  img {
    height: 120px;
    border-radius: 8px;
    object-fit: contain;
  }

  p {
    margin: 0;
  }
</style>
