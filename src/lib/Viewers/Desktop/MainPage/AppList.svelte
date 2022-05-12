<script>
  import { apps } from "$/store";
</script>

<h3>Listen On:</h3>
<ul>
  {#each $apps as app}
    <li>
      <a href={app.appUrl}>
        <img src={app.appIconUrl} />
        {app.appName}
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    margin: 0;
    padding: 0;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-auto-rows: 46px;
    /* how much height must each element occupy! change that! */
    grid-gap: 8px;
  }
  h3 {
    margin: 0;
    color: var(--nav-background-color-secondary);
  }
  li {
    list-style: none;
    border-radius: 5px;
    background-color: var(--app-card-background-color);
    box-shadow: 0 2px 2px 1px hsl(0deg 0% 0% / 10%);
  }

  a {
    display: flex;
    align-items: center;
    padding: 4px;
  }

  img {
    width: 36px;
    border-radius: 5px;
    margin-right: 5px;
  }
</style>
