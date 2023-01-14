<script>
  import { createFieldValidator } from "$components/Validators/validation.js";
  import { requiredValidator } from "$components/Validators/validator";
  import { onDestroy } from "svelte";
  import moment from "moment";

  export let value;
  export let required;
  export let isValid;
  export let isDirty;
  export let isFocus;
  export let customClass;
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

<div>
  <div
    class="input-group relative flex flex-row h-[2.5rem] rounded-[.3rem] text-xs text-white"
  >
    <input
      id="date"
      bind:value
      class:field-danger={!$validity.valid}
      class:field-success={$validity.valid}
      use:validate={value}
      on:focus={() => (isFocus = true)}
      on:blur={() => (isFocus = false)}
      class=" text-sm shadow focus:outline-0  {customClass}"
      type="date"
    />
  </div>
</div>

<style>
  
  input::placeholder {
    color: #000;
  }
  ::-webkit-calendar-picker-indicator {
    border-radius: 0.2rem;
    font-size: 16px;
    margin: 0 5px;
    background-color: #febc20;
  }
</style>
