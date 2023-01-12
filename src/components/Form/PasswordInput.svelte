<script>
  import { requiredValidator } from "../Validators/validator.js";
  import { TranslateApiMessage } from "../../services/language";
  import { createFieldValidator } from "../Validators/validation.js";
  import { onDestroy } from "svelte";
  export let value;
  export let name = "password";
  export let isValid;
  export let isDirty;
  export let required;
  export let placeholder = "Please type something";
  export let customClass = "";
  export let autocomplete;
  let validate, validity;

  let validations = [];

  if (required) {
    validations = [...validations, requiredValidator()];
  }

  [validity, validate] = createFieldValidator(...validations);

  const validityUnsub = validity.subscribe((_validity) => {
    isValid = _validity.valid;
    isDirty = _validity.dirty;
  });

  onDestroy(validityUnsub);
</script>

<input
class="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full {customClass} disabled:bg-slate-100"
type="password"
  bind:value
  {placeholder}
  {name}
  class:field-danger={!$validity.valid}
  class:field-success={$validity.valid}
  use:validate={value}
  {autocomplete}
/>

{#if $validity.dirty && !$validity.valid}
  <span class="text-red-600 text-xs mt-2">
    
    {$TranslateApiMessage($validity?.message)}
  </span>
{/if}
