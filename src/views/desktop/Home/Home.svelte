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

<HomeSlider></HomeSlider>

<div class="container mx-auto my-5">
<div class="flex">
  {#if cats}
  {#each cats as cat}
  <a use:link href="/category/{cat._id}">
  <div class="w-1/4 text-center">
    <img class="border" src="assets/img/cats/1.jpeg" alt="">
  <h3 class="text-lg font-semibold py-3">{cat.name}</h3>
  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry....</p>
    </div>
  </a>
  {/each}
  {/if}
</div>

</div>