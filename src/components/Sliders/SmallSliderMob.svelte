<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import { treatments } from "../../services/store";

  import Features1 from "../Shared/Features1.svelte";
  import Svg from "../../assets/svg.json";
  import "@splidejs/svelte-splide/css";
</script>

<Splide
  aria-label="My Favorite Images"
  options={{
    perPage: 2,
    direction: "ttb",
    heightRatio: 0.7,
    type: "loop",
    arrows: false,
    autoplay: true,
    pagination: false,
    interval: 3000,
  }}
>
  {#if $treatments}
    {#each $treatments as treatment}
      <SplideSlide>
        <Features1
          icon={treatment.icon}
          title={treatment.title}
          titleClass="text-light-300 "
          iconColor="#374151"
          description="Competently parallel task researched data and process improvements."
        />
      </SplideSlide>
    {/each}
  {/if}
</Splide>
