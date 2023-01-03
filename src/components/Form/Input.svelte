<script>
  import {
    emailValidator,
    requiredValidator,
  } from "../Validators/validator.js";
  import { createFieldValidator } from "../Validators/validation.js";
  import { TranslateApiMessage } from "../../services/language";
  import { onDestroy } from "svelte";
  export let value;
  export let isValid;
  export let required;
  export let type;
  export let disabled;
  export let placeholder = "Please type something";
  export let customClass = "";
  export let change = () => {};
  export let input = () => {};

  let validate, validity;

  let validations = [];

  if (required) {
    validations = [...validations, requiredValidator()];
  }

  if (type && type == "email") {
    validations = [...validations, emailValidator()];
  }
  [validity, validate] = createFieldValidator(...validations);

  const validityUnsub = validity.subscribe((_validity) => {
    isValid = _validity.valid;
  });

  onDestroy(validityUnsub);
</script>

<input
  class="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full {customClass} disabled:bg-slate-100"
  type="text"
  bind:value
  {placeholder}
  on:change={change(value)}
  on:input={input(value)}
  class:field-danger={!$validity.valid}
  class:field-success={$validity.valid}
  use:validate={value}
  {disabled}
/>

{#if $validity.dirty && !$validity.valid}
  <span class="text-blue-600 text-xs">
    {$TranslateApiMessage($validity.message)}
  </span>
{/if}
