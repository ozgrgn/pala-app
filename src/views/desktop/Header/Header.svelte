<script>
  import RestService from "$services/rest";
  import { useLocation, link } from "svelte-navigator";
  import { user } from "$services/store";

  import Svg from "../../../assets/svg.json";
  import AItem from "./AItem.svelte";

  const location = useLocation();

  $: {
    if ($location) {
      window.scrollTo(0, 0);
    }
  }

  const changeNavStatus = () => {
    setTimeout(() => {
      active = !active;
    }, 50);
  };
  const logout = () => {
    user.set(null);
  };
  console.log($user,"user")
  let cats = [{ name: "sef", title: "sfg", perma: "/" }];
  let hover;
</script>

<div class="container mx-auto h-20 border-b flex flex-col justify-center">
  <div class="flex justify-between">
    <a href="/" class="z-10">
      <img class="" src="/assets/img/logos/logo-light.png" alt="" />
    </a>
    <div class="flex font-medium justify-start self-center w-full px-28">
      <a use:link href={`/home`} class=""><span>Home </span></a>

      <div
        class="relative flex flex-col justify-center z-10 cursor-pointer"
        on:mouseover={() => (hover = true)}
        on:mouseout={() => (hover = false)}
        on:focus
        on:blur
      >
        <div class="w-full  px-6 ">Kategoriler</div>
        <div
          class="flex flex-col absolute pr-8 min-w-full whitespace-nowrap left-0 top-6 bg-white rounded-b-lg p-2 box-shadow shadow-lg {hover
            ? 'opacity-100'
            : '  opacity-0 h-0'} transition-opacity ease-in-out delay:75 duration-500 z-1"
        >
          {#if cats}
            {#each cats as car}
              <AItem
                bind:hover
                customClass="justify-start w-fit pl-2  {hover
                  ? 'opacity-100'
                  : '  opacity-0 h-0'}"
                active={$location.pathname == `/cats/${car.perma}`}
                path="/cats/{car.perma}">{car.title}</AItem
              >
            {/each}
          {/if}
        </div>
      </div>
    </div>
    <div class="w-1/4 flex flex-col justify-center">
      {#if $user}
      <div   on:click={() => {
        logout();
      }} class="flex cursor-pointer">
        <i class="text-black bi bi-person-fill px-2" /> Çıkış Yap
      </div>
      {:else}
      <a use:link href="/register"   on:click={() => {
       
      }} class="flex cursor-pointer">
        <i class="text-black bi bi-person-fill px-2" /> Kayıt Ol
    </a>
      {/if}
    </div>
  </div>
</div>

<style>
  .active {
    left: 0px;
    transition: all 1s;
  }
</style>
