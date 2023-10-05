<script>
  import OneItemFooter from "./OneItemFooter.svelte";


  export let item;
  console.log(item,"itemmm")
  export let membership
</script>

{#if item}
  <div class="h-full flex flex-col justify-around shadow">
    <div class="flex justify-center items-start -mb-4 h-60">
      <img
        class="h-full w-full object-contain "
        src={item?.images[0]?.image}
        alt=""
      />
    </div>
    <OneItemFooter {membership} {item} />
  </div>
{/if}
