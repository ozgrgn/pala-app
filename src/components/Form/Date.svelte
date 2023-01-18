<script>
  import { DateInput, localeFromDateFnsLocale } from "date-picker-svelte";
  import { tr } from "date-fns/locale";
  import moment from "moment";
  let locale = localeFromDateFnsLocale(tr);
  export let customClass
  export let value;
  if (value) {
    value = moment(value).second(0).millisecond(0).toDate();
  }
  export let placeholder = "Tarih seçiniz";
</script>

<DateInput
  closeOnSelection={true}
  {placeholder}
  format="dd.MM.yyyy"
  bind:value
  {locale}
  {customClass}
/>
