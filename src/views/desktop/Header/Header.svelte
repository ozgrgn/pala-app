<script>
  import RestService from "$services/rest";

  import AItem from "./AItem.svelte";
  import { useLocation, navigate,useParams } from "svelte-navigator";
  import Svg from "../../../assets/svg.json";
  import LangSelect from "$components/Form/LangSelect.svelte";
  import { lang, translate, general } from "../../../services/store";

  const location = useLocation();

  $: {
    if ($location) {
      window.scrollTo(0, 0);
    }
  }
  let langs;
  console.log($translate)
  const getLangs = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs = response["langs"];
  };
  getLangs();
  const langTrigger = (_lang) => {
    document.documentElement.setAttribute("lang", _lang);
    setTimeout(() => {
      lang.set(_lang);
      window.location.reload();
    }, 1); // cause svelte is faster than browser
  };
  let active = false;

  const changeNavStatus = () => {
    setTimeout(() => {
      active = !active;
    }, 50);
  };

  let hover;
  let treatments;
  const getTreatments = async () => {
    let response = await RestService.getTreatments(
      undefined,
      undefined,
      $lang,
      true,
      undefined
    );
    treatments = response["treatments"];
    console.log(treatments, "treatments");
  };
  getTreatments();
</script>

<div class="	">
  <div
    class="sticky top-0 left-0 z-[20] text-dark-400 lg:h-16  {$location.pathname ==
    '/'
      ? 'bg-white box-shadow shadow-lg'
      : $location.pathname == '/about'
      ? 'border-t  container mx-auto'
      : ''}"
  >
    <div class="mobile lg:hidden grid h-full grid-cols-11">
      <div class="flex items-center p-2">
        <button
          on:click={(event) => {
            event.stopPropagation();
            changeNavStatus();
          }}
          class="flex items-center px-2 py-2 border rounded text-black border-black "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="#bc74a5"
            viewBox="0 0 16 16"
          >
            {@html !active ? Svg.openedToggle : Svg.closedToggle}
          </svg>
        </button>
      </div>

      <div class="flex items-center justify-center h-full col-span-4">
        <img
          on:click={() => navigate("/")}
          on:keydown={() => navigate("/")}
          src={$general.logo1}
          class="h-16"
          alt=""
        />
      </div>

      <div
        class="flex items-center gap-2 w-full justify-end pr-2 h-full col-span-6 bg-white"
      />
    </div>
    {#if $translate}
      <div
        class="desktop hidden container lg:flex xl:container items-center flex-row text-dark-400 h-full w-full mx-auto z-[20] {$location.pathname ==
        '/'
          ? 'bg-white'
          : 'bg-transparent'} "
      >
        <div
          class="hidden items-center lg:flex basis-8/12 gap-8 h-full   z-10 {$location.pathname ==
          '/'
            ? 'bg-white'
            : 'bg-transparent'} "
        >
          <AItem
            customClass="justify-center uppercase"
            active={$location.pathname == "/"}
            path="/">{$translate.homePage}</AItem
          >
          <AItem
            customClass="justify-center uppercase"
            active={$location.pathname == "/about"}
            path="/about">{$translate.about}</AItem
          >

          <div
            class="relative flex flex-col justify-center z-10 cursor-pointer"
            on:mouseover={() => (hover = true)}
            on:mouseout={() => (hover = false)}
            on:focus
            on:blur
          >
            <div class="w-full uppercase ">
              {$translate.treatments}
            </div>
            <div
              class="flex flex-col absolute pr-8 min-w-full whitespace-nowrap left-0 top-6 bg-white rounded-b-lg p-2 box-shadow shadow-lg {hover
                ? 'opacity-100'
                : '  opacity-0 h-0'} transition-opacity ease-in-out delay:75 duration-500 z-1"
            >
              {#if treatments}
                {#each treatments as treatment}
                  <AItem
                    bind:hover
                    customClass="justify-start w-fit pl-2  {hover
                      ? 'opacity-100'
                      : '  opacity-0 h-0'}"
                    active={$location.pathname ==
                      `/treatments/${treatment.perma}`}
                    path="/treatments/{treatment.perma}"
                    >{treatment.title}</AItem
                  >
                {/each}
              {/if}
            </div>
          </div>
          <AItem
            customClass="justify-center uppercase"
            active={$location.pathname == "/contact"}
            path="/contact">{$translate.contact}</AItem
          >
        </div>

        <div
          class="hidden lg:flex items-center justify-end basis-4/12 gap-4 h-full pr-4 border-r {$location.pathname ==
          '/'
            ? 'bg-white'
            : 'bg-transparent'}"
        >
          <a href={"/" + $general.facebook} target="_blank">
            <svg
              class="h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#bc74a5"
            >
              {@html Svg.facebook}
            </svg>
          </a>
          <a href={"/" + $general.instagram} target="_blank">
            <svg
              class="h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="#bc74a5"
            >
              {@html Svg.instagram}
            </svg>
          </a>
          <a href={"/" + $general.youtube} target="_blank">
            <svg
              class="h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#bc74a5"
            >
              {@html Svg.youtube}
            </svg>
          </a>
          <a href={$general.whatsapp} target="_blank">
            <svg
              class="h-5 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#bc74a5"
            >
              {@html Svg.whatsapp}
            </svg>
          </a>
        </div>
        <div class="pl-2">
          <form class=" sm:max-w-xs">
            <fieldset class="w-full">
              <label for="language" class="sr-only">Language</label>
            
              <div class="relative">
                {#if langs}
                <LangSelect
                  value={$lang}
                  change={(value) => langTrigger(value)}
                  values={langs}
                  title={$translate.language}
                  valuesKey={"lang"}
                  valuesTitleKey={"lang"}
                  required={false}
                  customClass={"uppercase w-20 appearance-none w-full  shadow-none bg-white border border-transparent rounded-md pl-3 text-light-300 focus:outline-none focus:ring-white focus:border-white sm:text-sm lg:text-lg"}
                />
                {/if}
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center"
                >
                  <!-- Heroicon name: solid/chevron-down -->
                  <svg
                    class="h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    {/if}
  </div>
</div>

<div
  class="lg:hidden {active ? 'visible' : 'invisible'} top-20 aside-container"
  class:active
>
  <aside
    class="bg-white fixed w-[80%] transition-all duration-1000 z-[1000] top-20 bottom-20 "
  >
    <div class="menu flex flex-col h-full mb-10">
      {#each Array(4) as _, i}
        <a
          class="flex items-center px-2 w-full h-[3rem] bg-white"
          href={"/slot"}>treatment</a
        >
        <a
          class="flex items-center px-2 w-full h-[3rem] bg-white"
          href={"/casino"}>treatment</a
        >
      {/each}
    </div>
  </aside>
</div>

<style>
  .aside-container {
    position: fixed;
    left: -100vh;
    height: 100%;
    width: 100%;
    z-index: 999;
  }
  .active {
    left: 0px;
    transition: all 1s;
  }
</style>
