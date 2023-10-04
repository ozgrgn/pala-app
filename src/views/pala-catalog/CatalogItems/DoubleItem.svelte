<script>
  import OneItemFooter from "./OneItemFooter.svelte";

  export let items;
  export let image;

  export let membership;
</script>

{#if items}
  {#if items.length > 1}
    <div class="h-full w-full grid grid-cols-2 justify-center items-center gap-2">
      <div class="flex justify-center items-center h-full">
        <img class="h-fit w-full object-contain" src={image} alt="" />
      </div>
      <div class="flex flex-col items-center justify-center gap-2 h-fit">
        {#each items as item}
          <OneItemFooter {membership} {item} />
        {/each}
      </div>
    </div>
  {/if}
{/if}
