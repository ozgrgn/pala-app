<script>
  export let checked = false;
</script>

<div class="flex">
  <input
    type="checkbox"
    bind:checked
  />
  <span class="pl-2"> <slot /></span>
</div>

<style>
</style>
