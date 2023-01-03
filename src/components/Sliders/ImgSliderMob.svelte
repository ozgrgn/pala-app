<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import { treatments } from "../../services/store";

  import Features1 from "../Shared/Features1.svelte";
  import Svg from "../../assets/svg.json";
  import "@splidejs/svelte-splide/css";
  import TreatmentCards from "$components/Shared/TreatmentCards.svelte";
  import Card from "$components/Shared/Card.svelte";
</script>

<Splide
  aria-label="My Favorite Images"
  options={{
    perPage: 1,

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
        <Card
          treatment={treatment}
          title={treatment.title}
          titleClass="text-light-300 "
          iconColor="#374151"
          description="Competently parallel task researched data and process improvements."
        />
      </SplideSlide>
    {/each}
  {/if}
</Splide>
