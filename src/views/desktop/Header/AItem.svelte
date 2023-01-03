<script>
  import { link } from "svelte-navigator";
  export let hover;
  export let click = () => {
    hover = false;
  };
  export let path;
  export let active;
  export let customClass = "";
  let activeClass =
    "after:content-[''] after:bg-light-300 after:absolute after:bottom-0 after:w-8 after:h-[0.1rem] after:rounded-tl after:rounded-tr hover:after:absolute hover:after:w-4/5 hover:after:h-[0.2rem] hover:after:transition-all	";
</script>

{#if path}
  <a
    on:click={click()}
    class="relative h-12 flex items-center hover:text-gold-200  hover:after:content-[''] hover:after:bg-light-300 after:absolute after:bottom-0 after:w-8 after:h-[0.1rem] after:rounded-tl after:rounded-tr hover:after:absolute hover:after:w-4/5 hover:after:h-[0.2rem] hover:after:transition-all 
{active ? activeClass : ''} {customClass}"
    use:link
    href={path}
  >
    <slot />
  </a>
{:else}
  <span
    on:click={() => this.click()}
    on:keydown={() => this.click()}
    class="cursor-pointer relative flex items-center justify-center hover:text-gold-200 h-full"
  >
    <slot />
  </span>
{/if}
