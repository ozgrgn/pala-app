<script>
  import { onDestroy } from "svelte";
  import { TranslateApiMessage } from "../../services/language";
  import { createFieldValidator } from "../Validators/validation.js";
  import { requiredValidator } from "../Validators/validator.js";
  export let value = undefined;
  export let isValid;
  export let required;
  export let disabled;
  export let placeholder = "";
  export let customClass = "";
  export let change = () => {};
  export let input = () => {};
  let validate, validity;
  if (value < 0) {
    value = 0;
  }
  let validations = [];

  if (required) {
    validations = [...validations, requiredValidator()];
  }

  [validity, validate] = createFieldValidator(...validations);

  const validityUnsub = validity.subscribe((_validity) => {
    isValid = _validity.valid;
  });

  onDestroy(validityUnsub);
</script>

<input
  class="appearance-none border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full {customClass}"
  type="number"
  bind:value
  {placeholder}
  class:field-danger={!$validity.valid}
  class:field-success={$validity.valid}
  use:validate={value}
  on:change={change(value)}
  on:input={input(value)}
  min="0"
  {disabled}
  {customClass}
/>

{#if $validity.dirty && !$validity.valid}
  <span class="text-blue-600 text-xs">
    {$TranslateApiMessage($validity.message)}
  </span>
{/if}

<style>
  :global(input[type="number"])::-webkit-inner-spin-button,
  :global(input[type="number"])::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    appearance: none !important;
    margin: 0;
  }
</style>
