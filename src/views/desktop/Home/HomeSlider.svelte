<script>
  import ENV from "../../../env";

  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";
  let banners = [{ name: 1 }, { name: 2 }];
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
  {#if banners}
    {#each banners as banner}
      <SplideSlide>
        <img src={`/assets/img/sliders/${banner.name}.jpeg`} alt="1" />
      </SplideSlide>
    {/each}{/if}
</Splide>

<style>
  :global(
      .custom-slider .custom-class-prev,
      .custom-slider .custom-class-next
    ) {
    background-color: transparent !important;
    color: aliceblue;
  }

  :global(.custom-slider .splide__arrow svg) {
    fill: aliceblue;
  }
</style>
