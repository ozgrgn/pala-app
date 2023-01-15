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
    { key: "images", customValue: null },

  ];

  let cat = {};
  let images = [];
  values.map((v) => {
    if (v.defaultValue) {
      cat[v.key] = { value: v.defaultValue };
    } else {
      cat[v.key] = {};
    }
  });
  let deleteImage = (index) => {
    images.splice(index, 1);
    images = images;
  };

  const addCat = async () => {
    let data = {};
    data.images = images;
    values.map((v) => {
      if (cat[v.key].value && v.key != "images") {
      data[v.key] = cat[v.key]?.value;}
    });
    let response = await RestService.addCat(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/cats");
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
        navigate("/panel/cats");
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
            Kategori ekle
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
                Kategori İsmi
              </label>
              <Input
                bind:value={cat.name.value}
                bind:isValid={cat.name.isValid}
                placeholder={"Kategori İsmi"}
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
                Kısa Açıklama
              </label>
              <Input
                bind:value={cat.note.value}
                bind:isValid={cat.note.isValid}
                placeholder={"Kategori Açıklaması"}
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

              <Switch bind:value={cat.isActive.value} />
            </div>
          </div>
  
        </div>
        <div class="lg:w-6/12 px-4 ">
          <div class="">
            <label
            class="block  text-blueGray-600 text-xs font-bold"
            for="grid-name"
          >
          Resim
          </label>
            {#each images as Image, index}
              <div class="border mt-2 p-1 grid grid-flow-col">
                <span
                  class="px-2 flex flex-col justify-center text-blueGray-600 text-xs font-bold"
                  >{"Resim"}</span
                >
                <div class="col-span-2">
                  <ImageArray bind:value={Image.image} />
                </div>
                <div class="flex justify-end ">               
                  <button
                    on:click={() => deleteImage(index)}
                    class="w-14 bg-red-500 hover:bg-red-600 text-white font-bold text-xs my-2 ml-4 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
                    type="button"
                  >
                    SİL
                  </button>
                </div>
              </div>
            {/each}
          </div>
          <button
            on:click={() => (images = [...images, { image: null }])}
            class=" mt-2 bg-orange-400 disabled:bg-red-300 text-white active:bg-[#6e6e85] font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button"
          >
            Resim Ekle
          </button>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={addCat}
              disabled={!cat.name.isValid || cat.name.value == null}
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
