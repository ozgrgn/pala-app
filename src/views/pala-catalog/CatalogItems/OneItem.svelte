<script>
  import OneItemFooter from "./OneItemFooter.svelte";


  export let item;
  export let membership
</script>

{#if item}
  <div class="h-full flex flex-col">
    <div class="flex justify-center items-start  -mb-4 h-3/6">
      <img
        class="h-full w-full object-contain object-bottom"
        src={item?.images[0]?.image}
        alt=""
      />
    </div>
    <OneItemFooter {membership} {item}/>
  </div>
{/if}
