<script>
  import "intl-tel-input/build/css/intlTelInput.css";
  import intlTelInput from "intl-tel-input";
  import { onDestroy, onMount } from "svelte";
  import { createFieldValidator } from "../Validators/validation.js";
  import { requiredValidator } from "../Validators/validator.js";

  export let value = "de";
  let countrySelect;
  let iti;
  let countryData;
  export let title = "Ülke";
  export let change = () => {};
  export let customClass = "";
  export let isValid;
  export let required;

  let validate, validity;

  let validations = [];

  if (required) {
    validations = [...validations, requiredValidator()];
  }

  [validity, validate] = createFieldValidator(...validations);

  const validityUnsub = validity.subscribe((_validity) => {
    if (value && value == "disabled") {
      isValid = false;
    } else {
      isValid = _validity.valid;
    }
  });

  onDestroy(validityUnsub);

  onMount(() => {
    iti = intlTelInput(countrySelect);

    countryData = iti.countries;
  });
</script>

<select
  bind:this={countrySelect}
  id="country-select"
  class="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full {customClass} disabled:bg-slate-100"
  bind:value
  on:change={change(value)}
>
  <option disabled value={"disabled"}>{title}</option>
  {#if countryData}
    {#each countryData as country}
      <option value={country["iso2"]}>{country["name"]}</option>
    {/each}
  {/if}
</select>

<style>
  :global(.country-select .iti__flag-container) {
    display: none;
  }
</style>
