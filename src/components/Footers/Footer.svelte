<script>
  import { link } from "svelte-navigator";

  import { lang, langs, general, translate,treatments } from "../../services/store";
  import Svg from "../../assets/svg.json";
  import LangSelect from "../Form/LangSelect.svelte";

  const langTrigger = (_lang) => {
    document.documentElement.setAttribute("lang", _lang);
    setTimeout(() => {
      lang.set(_lang);
      window.location.reload();
    }, 1); // cause svelte is faster than browser
  };
</script>

<footer class="relative bg-dark-300" aria-labelledby="footer-heading">
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div class="pb-8 md:grid xl:grid-cols-6 xl:gap-2">
      <div class="md:grid md:grid-cols-2 gap-16 xl:col-span-4">
        <div class="first">
          <div class="md:grid-cols-1 md:gap-8">
            <div>
              <h3
                class="text-sm font-semibold text-white tracking-wider uppercase"
              >
              {$general.brand}
              </h3>

              <div class="">
                <p class=" px-2 pt-5 text-md tracking-tight text-gray-200 ">
                  {$general.shortDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 md:mt-0 md:grid md:grid-cols-1 md:gap-8">
          <div>
            <h3
              class="text-sm font-semibold text-white tracking-wider uppercase "
            >
              {$translate.treatments}
            </h3>
            <div class="grid-rows-1">
              <div class="grid grid-cols-2 ">
                <div class="">
                  <ul class="mt-4 space-y-4 px-2">
                    {#each Array(4) as treatment, i}
                    {#if $treatments[i]}  
                    <li>
                        <a
                          use:link
                          href="e"
                          class="text-base text-gray-200 hover:text-white"
                        >
                          {$treatments[i].title}
                        </a>
                      </li>
                      {/if}
                    {/each}
                  </ul>
                </div>
                <ul class="mt-4 space-y-4 px-2">
                  {#each Array(4) as treatment, i}
                  {#if $treatments[i+4]}  
                  <li>
                      <a
                        use:link
                        href="e"
                        class="text-base text-gray-200 hover:text-white"
                      >
                        {$treatments[i+4].title}
                      </a>
                    </li>
                    {/if}
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="third">
        <div class=" mt-10 lg:mt-0 md:grid md:grid-cols-1 ">
          <div>
            <h3
              class="text-sm font-semibold text-white tracking-wider uppercase"
            >
              {$translate.contact}
            </h3>

            <div class="px-2">
              <p class=" pt-5 text-md tracking-tight text-gray-200">
                <a href="tel:{$general.phone2}">
                  {$general.phone2}
                </a>
              </p>
              <p class=" pt-5 text-md tracking-tight text-gray-200 ">
                <a href="mailto:{$general.email1}"> {$general.email1}</a>
              </p>
              <p class=" pt-5 text-md tracking-tight text-gray-200 ">
                {$general.address1}
                {$general.address2}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 xl:mt-0">
        <h3 class="text-sm font-semibold text-white tracking-wider uppercase">
          {$translate.language}
        </h3>
        {#if $langs}
        <form class="mt-4 sm:max-w-xs">
          <fieldset class="w-full">
            <label for="language" class="sr-only">{$translate.language}</label>
            <div class="relative">
              <LangSelect
                value={$lang}
                change={(value) => langTrigger(value)}
                values={$langs}
                title={$translate.language}
                valuesKey={"lang"}
                valuesTitleKey={"lang"}
                required={false}
                customClass={"uppercase appearance-none w-full bg-none bg-gray-600 border border-transparent rounded-md block py-2 pl-3 pr-10 text-base text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"}
              />
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
        {/if}
      </div>
    </div>

    <div
      class="mt-8 border-t border-white/50 pt-8 md:flex md:items-center md:justify-between"
    >
      <div class="flex space-x-6 md:order-2">
        <a href={"/" + $general.facebook} target="_blank">
          <svg
            class="h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            {@html Svg.facebook}
          </svg>
        </a>
        <a href={"/" + $general.instagram} target="_blank">
          <svg
            class="h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#fff"
          >
            {@html Svg.instagram}
          </svg>
        </a>
        <a href={"/" + $general.youtube} target="_blank">
          <svg
            class="h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            {@html Svg.youtube}
          </svg>
        </a>
        <a href={$general.whatsapp} target="_blank">
          <svg
            class="h-5 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            {@html Svg.whatsapp}
          </svg>
        </a>
      </div>
      <p class="mt-8 text-base text-white md:mt-0 md:order-1">
        {$general.copright}
      </p>
    </div>
  </div>
</footer>
