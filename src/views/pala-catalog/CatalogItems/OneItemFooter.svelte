<script>
export let item
export let membership
</script>
<div class="relative h-fit w-full">
    <div class="bg-white w-full h-[8.5rem] mt-4 ">
      <div class="pt-8 px-4 tracking-tighter">
        <h5 class="text-xl font-bold text-lg leading-5">{item.catalogName}</h5>
        <div class="flex justify-between font-semibold opacity-90 h-6">
          {#if item.catalogDesc1}
            <h5 class="text-lg text-[#878787] ">{item.catalogDesc1}</h5>
          {/if}
          {#if item.catalogDesc2}
            <h5 class="text-lg text-[#878787]">{item.catalogDesc2}</h5>
          {/if}
        </div>
      </div> 
      <div class="absolute bottom-0 px-4 pt-4 grid grid-cols-2 gap-10">
        {#if item && item.prices && item.prices[0]}
        {#each item.prices as price }
        {#if price._id == membership}
        <div class="flex justify-between items-end">
        <span class="text-2xl font-black italic">  {price.price} € </span>
        <span class="text-md font-semibold italic text-[#878787] opacity-80 leading-7 pl-2">netto</span>
      </div>
      <div class="flex justify-around items-end">
        <span class="text-xl font-black italic">  {price.price} € </span>
        <span class="text-sm font-semibold italic text-[#878787] opacity-80 leading-7">brutto</span>
      </div>
          {/if}
        {/each}
        {/if}
        </div>
      <div class="absolute top-0 w-full flex justify-between pr-4">
        <div
          class="bg-white h-10 w-28 flex justify-center rounded-sm items-center uppercase text-black font-bold text-lg"
        >
          {item.no}
        </div>
        <i
          class="relative bi bi-box2 text-[#10263a] text-[40px] flex items-start"
        >
          <div
            class="absolute top-0 text-lg text-black font-bold pt-3 w-9 flex justify-center"
          >
          {#if item && item.units && item.units[0]}

            {#each item.units as unit}
              {#if unit._id == "63b210c49ff2652d058f9fa3"}
                <span>{unit.number?unit.number:""}</span>
              {/if}
            {/each}
            {/if}
          </div>
        </i>
      </div>
    </div>
  </div>