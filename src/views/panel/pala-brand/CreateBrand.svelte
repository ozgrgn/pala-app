<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import { navigate } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import Switch from "$components/Switch.svelte";

  let values = [
    { key: "name", customValue: null },
    { key: "note", customValue: null },
    { key: "isActive", customValue: null },
   
  ];

  let brand = {};

  values.map((v) => {
    if (v.defaultValue) {
      brand[v.key] = { value: v.defaultValue };
    } else {
      brand[v.key] = {};
    }
  });


  const addBrand = async () => {
    let data = {};
    values.map((v) => {
      if (brand[v.key].value) {
      data[v.key] = brand[v.key]?.value;}
    });
    let response = await RestService.addBrand(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/brands");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4 ">
    <button
      class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
      type="button"
      on:click={() => {
        navigate("/panel/brands");
      }}
    >
      <i class="fa fa-arrow-left" />
      {$Translate("Back")}
    </button>
    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="text-center flex justify-between">
          <h3 class="font-semibold text-lg text-blueGray-700">
            Marka ekle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">

        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Marka İsmi
              </label>
              <Input
                bind:value={brand.name.value}
                bind:isValid={brand.name.isValid}
                placeholder={"Marka İsmi"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-7/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Not
              </label>
              <Textarea
                bind:value={brand.note.value}
                bind:isValid={brand.note.isValid}
                placeholder={"Marka Notu"}
                required={false}
              />
            </div>
          </div>
      
          <div class="w-full lg:w-2/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="rectangleBanner"
              >
                Aktif mi ?
              </label>

              <Switch bind:value={brand.isActive.value} />
            </div>
          </div>
  
        </div>
 
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={addBrand}
              disabled={!brand.name.isValid || brand.name.value == null}
              class="bg-[#6e6e85] disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
              type="button"
            >
              {$Translate("Save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
