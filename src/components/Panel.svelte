<script>
  import { slide } from "svelte/transition";

  export let name = "";
  export let group = "Item 1";
  $: active = group === name;
</script>

<div class="panel">
  <button
    type="button"
    class="header flex w-full items-center bg-gradient-to-r from-second-gradien to-first-gradien p-2 rounded-tr-lg rounded-bl-lg border border-slate-300"
    on:click={() => {
      group = group === name ? "" : name;
    }}
  >
    <span class="text-slate-700 font-medium drop-shadow">{name}</span>
    <img class="icon h-6" class:active src="/assets/according-down.svg" alt="" />
  </button>

  {#if active}
    <div class="content p-2" transition:slide>
      <slot />
    </div>
  {/if}
</div>

<style>
  .header {
    cursor: pointer;
    line-height: 1;
    outline: none;
    margin: 0;
    text-align: left;
    outline: none;
  }

  span {
    flex: 1;
    line-height: 24px;
  }
  .icon {
    line-height: 0.5;
    transition: 0.25s linear;
  }
  .active {
    transform: rotate(-180deg);
  }
</style>
