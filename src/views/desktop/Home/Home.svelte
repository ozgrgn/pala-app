<script>
  import HomeSlider from "./HomeSlider.svelte";
  import RestService from "$services/rest";
  import { link } from "svelte-navigator";

  let cats;
  const getCats = async () => {
    let response = await RestService.getCats(undefined, undefined,true);
    cats = response["cats"];
  };
  getCats();
</script>

<HomeSlider />

<div class="container  mx-auto my-8">
  <div class="grid grid-cols-4 gap-6">
    {#if cats}
      {#each cats as cat}
        <a use:link href="category/{cat._id}">
          <div class="shadow-xl rounded text-center ">
            <div class="flex justify-center border-b">
            <img class=" h-52 object-fit" src="{cat?.images[0]?.image?cat?.images[0]?.image:"/assets/img/gorsel.jpeg"}" alt="" />
          </div>
            <h3 class="text-lg font-semibold uppercase py-2">{cat.name}</h3>
            <p class="pb-3 text-ellipsis overflow-hidden px-4 h-20">
              {cat.note?cat.note:""}
            </p>
            <button
              class=" bottom-2 mb-4 border-2 border-red-500 hover:bg-red-500 px-4 py-2 text-black hover:text-white active:bg-dark-300 text-sm font-bold uppercase rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
              type="button"
            >
              ÜRÜNLER
            </button>
          </div>
        </a>
      {/each}
    {/if}
  </div>
</div>
