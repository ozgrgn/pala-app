<script>
  import { Translate } from "../../services/language";
  import { user } from "../../services/store";
  import { useLocation } from "svelte-navigator";
  const location = useLocation();
  import { link } from "svelte-navigator";

  import UserDropdown from "../Dropdowns/UserDropdown.svelte";

  let collapseShow = "hidden";

  function toggleCollapseShow(classes) {
    collapseShow = classes;
  }

</script>

<nav
  class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-gray-100 flex flex-wrap items-center justify-between relative md:w-48 z-10"
>
  <div
    class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap flex flex-wrap items-center justify-between w-full mx-auto p-4"
  >
    <!-- Toggler -->
    <button
      class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
      type="button"
      on:click={() => toggleCollapseShow("bg-white m-2 py-3 px-6")}
    >
      <i class="fas fa-bars" />
    </button>
    <!-- Brand -->
    <a
      use:link
      on:click={() => toggleCollapseShow("hidden")}
      class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm  font-bold p-4 px-0"
      href="/panel/dashboard"
    >
      {$Translate("Big-Brand")} | PANEL
    </a>
    <!-- User -->
    <ul class="md:hidden items-center flex flex-wrap list-none">
      <li class="inline-block relative">
        <UserDropdown />
      </li>
    </ul>
    <!-- Collapse -->
    <div
      class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded {collapseShow}"
    >
      <!-- Collapse header -->
      <div
        class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
      >
        <div class="flex flex-wrap">
          <div class="w-6/12">
            <a
              use:link
              on:click={() => toggleCollapseShow("hidden")}
              class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm  font-bold p-4 px-0"
              href="/"
            >
              {$Translate("Big-Brand")} | PANEL
            </a>
          </div>
          <div class="w-6/12 flex justify-end">
            <button
              type="button"
              class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              on:click={() => toggleCollapseShow("hidden")}
            >
              <i class="fas fa-times" />
            </button>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <hr class="my-4 md:min-w-full" />

      <!-- Navigation -->

      <ul class="md:flex-col md:min-w-full flex flex-col list-none">
        <li class="items-center">
          <a
            use:link
            on:click={() => toggleCollapseShow("hidden")}
            href="/panel/dashboard"
            class="text-xs py-3 gap-2 font-bold block {$location.pathname.indexOf(
              '/panel/dashboard'
            ) !== -1
              ? 'text-blue-600 hover:text-blue-600'
              : 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <span class="col-span-4"> Dashboard </span>
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            on:click={() => toggleCollapseShow("hidden")}
            href="/panel/sliders"
            class="text-xs py-3 gap-2 font-bold block {$location.pathname.indexOf(
              '/panel/sliders'
            ) !== -1
              ? 'text-blue-600 hover:text-blue-600'
              : 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <span class="col-span-4">Slider</span>
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            on:click={() => toggleCollapseShow("hidden")}
            href="/panel/seatPlans"
            class="text-xs py-3 gap-2 font-bold block {$location.pathname.indexOf(
              '/panel/seatPlans'
            ) !== -1
              ? 'text-blue-600 hover:text-blue-600'
              : 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <span class="col-span-4">Oturma planı</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
