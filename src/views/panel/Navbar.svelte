<script>
  import { link, useLocation } from "svelte-navigator";
  import { Translate } from "../../services/language";
  import { lang, user } from "../../services/store";
  import { desktopDrawer } from "$services/store";

  const location = useLocation();
  const langTrigger = (_lang) => {
    document.documentElement.setAttribute("lang", _lang);
    setTimeout(() => {
      lang.set(_lang);
    }, 1); // cause svelte is faster than browser
  };

  let navbarOpen = false;

  const logout = () => {
    user.set(null);
  };
</script>

<!-- Navbar -->
<nav
  class="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
>

  <div
    class="w-full items-center flex justify-end lg:justify-between md:flex-nowrap flex-wrap"
  >
    <!-- Brand -->

    <nav class="flex flex-row gap-2 items-center w-full">
      
      <div class="flex flex-wrap justify-between items-center w-full">
        <a
          href="/panel/dashboard"
          use:link
          class="md:hidden text-white font-bold">Pala Export</a
        >
        <button
          on:click={() => (navbarOpen = !navbarOpen)}
          type="button"
          class="inline-flex items-center p-2 ml-3 rounded-lg md:hidden focus:outline-none outline-0"
        >
          {#if navbarOpen}
            <i class="fa fa-window-close text-xl text-white" />
          {:else}
            <i class="fa fa-bars text-xl text-white" />
          {/if}
        </button>
        <div
          class="{!navbarOpen ? 'hidden' : 'flex'} w-full md:flex"
          id="navbar-default"
        >
          <div
            class="md:min-h-0 w-full flex flex-col justify-center md:justify-between items-center bg-[#6e6e85] rounded border md:border-0 md:flex-row gap-2 w-full"
          >
        
            <div
              class="w-full flex flex-col md:flex-row flex-wrap  items-start justify-start transition-all {$desktopDrawer?"lg:pl-[18rem]":""}"
            >
            <button
      class="btn btn-sm btn-ghost"
      on:click={() => desktopDrawer.set(!$desktopDrawer)}
    >
      <i class="bi bi-list text-3xl text-white" />
    </button>








           
            </div>
            <div
              class="flex flex-col md:flex-row items-center justify-center gap-2 w-4/12"
            >
             
             
              <span class="text-white/80 font-medium cursor-pointer">
                {$user?.fullName}
              </span> <span class="text-white/80 mx-1 font-thin hidden md:block">|</span
              >
              <span
                class="text-white font-bold cursor-pointer"
                on:click={() => logout()}
              >
                Çıkış yap
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- <div class="flex flex-row gap-2 items-center">
      <a
        class="text-white hidden lg:inline-block font-semibold {$location.pathname.indexOf(
          '/admin/dashboard'
        ) !== -1
          ? 'hover:text-white text-base'
          : 'text-white/80 hover:text-white'}"
        href="/panel/dashboard"
        use:link
        
      >
        {$Translate("Dashboard")}
      </a>

      <a
        class="text-white hidden lg:inline-block font-semibold {$location.pathname.indexOf(
          'slider'
        ) !== -1
          ? 'hover:text-white text-base'
          : 'text-white/80 hover:text-white'}"
        href="/panel/sliders"
        use:link
        
      >
        Slider
      </a>

      <a
        class="text-white hidden lg:inline-block font-semibold {$location.pathname.indexOf(
          'seatPlan'
        ) !== -1
          ? 'hover:text-white text-base'
          : 'text-white/80 hover:text-white'}"
        href="/panel/seatPlans"
        use:link
        
      >
        Oturma Planı
      </a>
    </div> -->
    <!-- Form -->

    <!-- User -->

    <!-- <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
      <div class="mr-2">
        <a
          class="font-bold  text-white mr-2"
          on:click={() => langTrigger("tr")}
          href={"#"}>TR</a
        >
        <a
          class="font-bold  text-white mr-2"
          on:click={() => langTrigger("en")}
          href={"#"}>EN</a
        >
        <span class="text-white mx-1 font-thin">|</span>
        <span class="text-white font-medium  mr-4"> {$user?.email} </span>
      </div>

      <UserDropdown />
    </ul> -->
  </div>
</nav>
<!-- End Navbar -->
