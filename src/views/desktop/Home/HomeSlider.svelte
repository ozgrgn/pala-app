<script>
  import RestService from "$services/rest";
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";
  let sliders;
  const getSliders = async () => {
    let response = await RestService.getSliders(undefined, undefined, true);
    sliders = response["sliders"];
  };
  getSliders();
  
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
  {#if sliders}
    {#each sliders as slider}
      <SplideSlide>
        <img class="h-full object-fit" src={slider.image} alt="1" />
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
