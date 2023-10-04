<script>
  import OneItemFooter from "./OneItemFooter.svelte";

  export let image;
  export let items;
  export let membership;

  console.log(items, "");
</script>

<div class="absolute h-[297mm] w-[210mm]">
  <img class="w-full h-full object-cover" src={image} alt="" />
</div>
<div
  class="col-span-2 row-span-2 grid grid-cols-2 h-full items-end justify-end  w-full"
>
  <div class="h-fit w-full row-span-2 col-span-2 grid-rows-2 grid grid-cols-2 gap-y-2 gap-x-4">
    {#each items as item}
    <div class="flex {items.length%2==1?" last:col-span-2 last:w-1/2 last:justify-self-center":""} ">
      <OneItemFooter {membership} {item} /></div>
    {/each}
  </div>
</div>
