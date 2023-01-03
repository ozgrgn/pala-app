<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";
export let sliders
console.log(sliders,"sfsf")
</script>

<Splide
  aria-label="My Favorite Images"
  options={{
    arrows: false,
    pagination: false,
  }}
>
{#each sliders as slider}
  <SplideSlide>
<div class="relative">
  
    <img
      class="h-[calc(100vh-160px)] w-auto object-cover  "
      src={slider.mobileBanner}
      alt=""
    />
    <div class="flex lg:hidden absolute top-0 w-full h-full bg-white/70"></div>

  </div>
  </SplideSlide>

  {/each}
</Splide>
