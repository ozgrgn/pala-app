<script>
  import { onDestroy } from "svelte";
  import { TranslateApiMessage } from "../../services/language";
  import { createFieldValidator } from "../Validators/validation.js";
  import { requiredValidator } from "../Validators/validator.js";
  export let value = null;
  export let isUnit = false;
  export let values;
  export let valuesKey;
  export let valuesTitleKey;
  export let valuesTitleKeySub;
  export let secondTitleKey;
  export let title = "Select";
  export let change = () => {};
  export let customClass = "";
  export let isValid;
  export let required;
  export let disabled;
  export let all;

  let validate, validity;

  let validations = [];

  if (required) {
    validations = [...validations, requiredValidator()];
  }

  [validity, validate] = createFieldValidator(...validations);

  const validityUnsub = validity.subscribe((_validity) => {
    if (value && value == null) {
      isValid = false;
    } else {
      isValid = _validity.valid;
    }
  });

  onDestroy(validityUnsub);
</script>

<select
  class="border-0 text-sm rounded shadow focus:outline-none focus:ring  {customClass}"
  class:field-danger={!$validity.valid}
  class:field-success={$validity.valid}
  use:validate={value}
  bind:value
  {disabled}
  on:change={change(value)}
>
  <option disabled={!all} value={null}>{title}</option>
  {#each values as _value}
    <option value={_value[valuesKey]}>
      {#if valuesTitleKeySub}
        {_value[valuesTitleKey][valuesTitleKeySub]}
      {:else if isUnit}
        {_value[valuesTitleKey] + " (" + _value["number"] + ")"}
      {:else}{_value[valuesTitleKey]}
        {#if secondTitleKey}
          - {_value[secondTitleKey]}
        {/if}
      {/if}
    </option>
  {/each}
</select>

{#if $validity.dirty && !$validity.valid}
  <span class="text-blue-600 text-xs">
    {$TranslateApiMessage($validity.message)}
  </span>
{/if}
