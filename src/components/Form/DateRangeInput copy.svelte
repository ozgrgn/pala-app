<script>
  import { createFieldValidator } from "$components/Validators/validation.js";
  import { requiredValidator } from "$components/Validators/validator";
  import { onDestroy } from "svelte";

  export let startDate;
  export let endDate;
  export let required;
  export let isValid;
  export let isDirty;
  export let icon = "bi bi-calendar";

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

<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
  <div
    class="input-group relative focus-within:border-gold-200 flex flex-row h-[2.5rem] rounded-[.3rem] text-xs text-gray-400"
  >
    <span
      class="input-left text-white border border-r-0 rounded-[.3rem] rounded-tr-none rounded-br-none border-solid border-gold-200 whitespace-pre px-1 h-full flex items-center gap-1 "
    >
      {#if icon}
        <i class="{icon} text-xl" />
      {/if}
      <span class="font-semibold">BAŞLANGIÇ TARİHİ</span>
    </span>

    <input
      id="startDate"
      bind:value={startDate}
      class:field-danger={!$validity.valid}
      class:field-success={$validity.valid}
      use:validate={startDate}
      class="text-white text-right border border-l-0 rounded-[.3rem] rounded-tl-none rounded-bl-none border-solid border-gold-200 priv-input bg-transparent pl-1 outline-0 h-full w-full rounded-[.15rem]"
      type="date"
    />
  </div>

  <div
    class="input-group  relative focus-within:border-gold-200 flex flex-row h-[2.5rem] rounded-[.3rem] text-xs text-gray-400"
  >
    <span
      class="input-left text-white border border-r-0 rounded-[.3rem] rounded-tr-none rounded-br-none border-solid border-gold-200 whitespace-pre px-1 h-full flex items-center gap-1 "
    >
      {#if icon}
        <i class="{icon} text-xl" />
      {/if}
      <span class="font-semibold">BİTİŞ TARİHİ</span>
    </span>

    <input
      id="endDate"
      bind:value={endDate}
      class:field-danger={!$validity.valid}
      class:field-success={$validity.valid}
      use:validate={endDate}
      class="text-white text-right border border-l-0 rounded-[.3rem] rounded-tl-none rounded-bl-none border-solid border-gold-200 priv-input bg-transparent pl-1 outline-0 h-full w-full rounded-[.15rem]"
      type="date"
    />
  </div>
</div>

<style>
  .input-group {
    transition: all 0.3s ease-in-out;
  }
  .input-group > input {
    border-top-right-radius: 5px !important;
    border-bottom-right-radius: 5px !important;
  }
  .input-group:focus-within > .input-left {
    background-color: #d6a54b;
    color: #000 !important;
    transition: all 0.3s ease-in-out;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  input::placeholder {
    color: #fff;
  }
  ::-webkit-calendar-picker-indicator {
    border-radius: 0.2rem;
    font-size: 16px;
    margin: 0 5px;
    background-color: #d6a54b;
  }
</style>
