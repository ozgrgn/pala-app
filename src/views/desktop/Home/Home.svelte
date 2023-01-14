<script>
  import HomeSlider from "./HomeSlider.svelte";
  import RestService from "$services/rest";
  import { link } from "svelte-navigator";

  let cats;
  let totalDataCount;
  const getCats = async () => {
    let response = await RestService.getCats(undefined, undefined);
    cats = response["cats"];
    totalDataCount = response["count"];

    console.log(cats, "cats");
  };
  getCats();
</script>

<HomeSlider />

<div class="container  mx-auto my-5">
  <div class="grid grid-cols-4 gap-6">
    {#if cats}
      {#each cats as cat}
        <a use:link href="category/{cat._id}">
          <div class="shadow-xl rounded text-center">
            <img class="border-b" src="assets/img/cats/1.jpeg" alt="" />
            <h3 class="text-lg font-semibold py-2">{cat.name}</h3>
            <p class="pb-3 px-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry....
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
