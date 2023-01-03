<script>
  import { createFieldValidator } from "$components/Validators/validation.js";
  import { requiredValidator } from "$components/Validators/validator";
  import { onDestroy } from "svelte";

  export let startDate;
  export let endDate;
  export let required;
  export let isValid;
  export let isDirty;
  export let customClass = "";
  export let change = () => {};
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

<div class="grid grid-cols-1 gap-1">
  <div
    class="input-group relative focus-within flex flex-row h-[1.5rem] text-xs text-gray-400 justify-center"
  >
    <span
      class="input-left text-white border rounded border-solid whitespace-pre h-full flex items-center gap-1 shadow"
    >
      <input
        id="startDate"
        on:change={change(startDate)}
        bind:value={startDate}
        class:field-danger={!$validity.valid}
        class:field-success={$validity.valid}
        use:validate={startDate}
        class="text-blueGray-600 text-xs text-right  rounded-tl-none border-solid priv-input bg-white pl-1 outline-0 h-full w-32 rounded-[.15rem] {customClass}"
        type="date"
      />
    </span>
  </div>

  <div
    class="input-group relative focus-within flex flex-row h-[1.5rem] text-xs text-gray-400 justify-center"
  >
    <span
      class="input-left text-white border rounded border-solid whitespace-pre h-full flex items-center gap-1 shadow"
    >
      <input
        id="endDate"
        bind:value={endDate}
        on:change={change(endDate)}
        class:field-danger={!$validity.valid}
        class:field-success={$validity.valid}
        use:validate={endDate}
        class="text-blueGray-600 text-xs text-right border rounded-tl-none border-solid priv-input bg-white pl-1 outline-0 h-full w-32 rounded-[.15rem] {customClass}"
        type="date"
      />
    </span>
  </div>
</div>

<style>
</style>
