<script>
  import { link } from "svelte-navigator";
  import { lang } from "../../services/store";
  import { Translate } from "../../services/language";

  let navbarOpen = false;

  const langTrigger = (_lang) => {
    document.documentElement.setAttribute("lang", _lang);
    setTimeout(() => {
      lang.set(_lang);
    }, 1); // cause svelte is faster than browser
  };

  function setNavbarOpen() {
    navbarOpen = !navbarOpen;
  }
</script>

<nav
  class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg"
>
  <div
    class="container px-4 mx-auto flex flex-wrap items-center justify-between"
  >
    <div
      class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
    >
      <a
        use:link
        class="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
        href="/"
      >
        {$Translate("Big-Brand")}
      </a>
      <button
        class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
        type="button"
        on:click={setNavbarOpen}
      >
        <i class="text-white fas fa-bars" />
      </button>
    </div>
    <div
      class="lg:flex flex-grow items-center bg-opacity-0 lg:shadow-none rounded shadow-lg {navbarOpen
        ? 'block'
        : 'hidden'}"
      id="example-navbar-warning"
    >
      <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
        <li class="flex items-center w-full justify-center md:mr-4">
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
        </li>

        <li class="flex items-center w-full justify-center">
          <button
            class="flex flex-row items-center gap-2 bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold  px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
            type="button"
          >
            <i class="fas fa-envelope" />
            {$Translate("Contact")}
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
