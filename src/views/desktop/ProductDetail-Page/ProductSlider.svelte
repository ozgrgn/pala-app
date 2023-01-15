<script>

  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";
    export let images
</script>

<Splide
  options={{
    autoplay: true,
    rewind: true,
    perPage: 1,
    perMove: 1,
    arrows: true,
    pagination: false,
    speed: 2000,
    interval: 4000,
    classes: {
      prev: "splide__arrow--prev custom-class-prev",
      next: "splide__arrow--next custom-class-next",
    },
  }}
>
  {#if images}
    {#each images as image}
      <SplideSlide>
        <div class="flex items-center justify-center">
        <img class="h-96" src={image.image} alt="1" /></div>
      </SplideSlide>
    {/each}{/if}
</Splide>