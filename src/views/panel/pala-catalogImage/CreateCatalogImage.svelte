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
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Image from "$components/Form/Image.svelte";

  let values = [
    { key: "image", customValue: null },
    { key: "place", customValue: null },
    { key: "order", customValue: null },
   
  ];
  let places= [{name:"Giriş"},{name:"Çıkış"}]

  let catalogImage = {};

  values.map((v) => {
    if (v.defaultValue) {
      catalogImage[v.key] = { value: v.defaultValue };
    } else {
      catalogImage[v.key] = {};
    }
  });


  const addCatalogImage = async () => {
    let data = {};
    values.map((v) => {
      if (catalogImage[v.key].value) {
      data[v.key] = catalogImage[v.key]?.value;}
    });
    let response = await RestService.addCatalogImage(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/catalogImages");
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
        navigate("/panel/catalogImages");
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
            Katalog Resmi ekle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">

        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-2/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Yer
              </label>
              <Select
              bind:value={catalogImage.place.value}
              values={places}
              title={"Yer Seçin"}
              valuesKey={"name"}
              valuesTitleKey={"name"}
              customClass={"w-full bg-slate-200"}
             
            />
            </div>
          </div>
          <div class="w-full lg:w-2/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Sıra
              </label>
              <NumberInput
                bind:value={catalogImage.order.value}
                bind:isValid={catalogImage.order.isValid}
                placeholder={"Yer Sırası"}
                required={false}
              />
            </div>
          </div>
      
          <div class="w-full lg:w-8/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="rectangleBanner"
              >
                Resim Seçin
              </label>

              <Image bind:value={catalogImage.image.value} />
            </div>
          </div>
  
        </div>
 
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={addCatalogImage}
              disabled={!catalogImage.image || !catalogImage.order.value || !catalogImage.place.value}
              class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
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
