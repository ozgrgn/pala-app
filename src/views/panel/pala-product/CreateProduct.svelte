<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import { navigate } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Switch from "$components/Switch.svelte";

  let values = [
    { key: "no", customValue: null },
    { key: "name", customValue: null },
    { key: "cat", customValue: null },
    { key: "brand", customValue: null },
    { key: "color", customValue: null },
    { key: "units", customValue: [{}] },
    { key: "prices", customValue: null },
    { key: "note", customValue: null },
    { key: "order", customValue: null },
    { key: "isActive", customValue: false },
    { key: "images", customValue: null },
    { key: "logos", customValue: null },
  ];

  let product = {};
  let images = [];
  let cats;
  let brands;
  let memberships;
  let units;
  let deleteImage = (index) => {
    images.splice(index, 1);
    images = images;
  };

  const getCats = async () => {
    let response = await RestService.getCats(undefined, undefined);
    cats = response["cats"];
    console.log(cats, "cats");
  };
  getCats();
  const getBrands = async () => {
    let response = await RestService.getBrands(undefined, undefined);
    brands = response["brands"];
    console.log(brands, "brands");
  };
  getBrands();
  const getMemberships = async () => {
    let response = await RestService.getMemberships(undefined, undefined);
    memberships = response["memberships"];
    console.log(memberships, "memberships");
  };
  getMemberships();
  const getUnits = async () => {
    let response = await RestService.getUnits(undefined, undefined);
    units = response["units"];
    console.log(units, "units");
  };
  getUnits();
  values.map((v) => {
    if (v.defaultValue) {
      product[v.key] = { value: v.defaultValue };
    } else {
      product[v.key] = {};
    }
  });
  const addProduct = async () => {
    let data = {};
    data.images = images;
    data.units = units;
    data.prices = memberships;
    console.log(product, "productsss");
    console.log(images, "images");
    if (!product.isActive.value) {
      product.isActive.value = false;
    }
    values.map((v) => {
      console.log(v.key, "vkey");
      if (
        product[v.key].value &&
        v.key != "prices" &&
        v.key != "units" &&
        v.key != "images"
      ) {
        data[v.key] = product[v.key]?.value;
      }
    });
    let response = await RestService.addProduct(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/products");
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
        navigate("/panel/products");
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
          <h3 class="font-semibold text-lg text-blueGray-700">Ürün ekle</h3>
          <div class="relative mb-3 px-10">
            <label
              class="block  text-blueGray-600 text-xs font-bold mb-2"
              for="rectangleBanner"
            >
              Aktif mi ?
            </label>

            <Switch bind:value={product.isActive.value} />
          </div>
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
                Ürün No
              </label>
              <Input
                bind:value={product.no.value}
                bind:isValid={product.no.isValid}
                placeholder={"Ürün No"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Ürün İsmi
              </label>
              <Input
                bind:value={product.name.value}
                bind:isValid={product.name.isValid}
                placeholder={"Ürünün İsmi"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-1/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Sıra
              </label>
              <NumberInput
                bind:value={product.order.value}
                bind:isValid={product.order.isValid}
                placeholder={"Sıra No"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Kategori
              </label>
              {#if cats}
                <Select
                  bind:value={product.cat.value}
                  bind:isValid={product.cat.isValid}
                  values={cats}
                  title={"Kategori Seçin"}
                  valuesKey={"_id"}
                  valuesTitleKey={"name"}
                  customClass={"w-full"}
                />
              {/if}
            </div>
          </div>

          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Marka
              </label>
              {#if brands}
                <Select
                  bind:value={product.brand.value}
                  bind:isValid={product.brand.isValid}
                  values={brands}
                  title={"Marka Seçin"}
                  valuesKey={"_id"}
                  valuesTitleKey={"name"}
                  customClass={"w-full"}
                />
              {/if}
            </div>
          </div>
        </div>

        <div class="flex flex-wrap my-4">
          <div class="lg:w-3/12 px-4">
            <div class="">
              <div class=" ">
                <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Üyelik Fiyatı
              </label>
                {#if memberships}
                  {#each memberships as membership, index}
                    <div class="border mt-2 p-1 grid grid-cols-2">
                      <span
                        class="px-2 flex flex-col justify-center text-blueGray-600 text-sm font-bold"
                        >{membership.name} Fiyatı</span
                      >
                      <div class=" flex flex-col justify-center">
                        <NumberInput
                          bind:value={membership.price}
                          placeholder={"Adet Sayısı"}
                          required={false}
                        />
                      </div>
                    </div>
                  {/each}
                {/if}
              </div>
            </div>
          </div>
          <div class="lg:w-3/12 px-4 flex flex-col justify-between">
            <div class="">
              <label
              class="block  text-blueGray-600 text-xs font-bold mb-2"
              for="grid-name"
            >
              Birim Adedi
            </label>
              {#if units}
                {#each units as unit, index}
                  <div class="border mt-2 p-1 grid grid-cols-2 ">
                    <span
                      class="px-2 flex flex-col justify-center text-blueGray-600 text-sm font-bold"
                      >{units[index].name} Adedi</span
                    >
                    <div class=" flex flex-col justify-center">
                      <NumberInput
                        bind:value={units[index].number}
                        placeholder={"Adet Sayısı"}
                        required={false}
                      />
                    </div>
                  </div>
                {/each}
              {/if}
            </div>
  
          </div>
          <div class="lg:w-6/12 px-4 ">
            <div class="">
              <label
              class="block  text-blueGray-600 text-xs font-bold "
              for="grid-name"
            >
              Resimler
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
                    <div class="flex flex-col justify-center px-2">Sıra</div>
                    <div class="flex flex-col justify-center">
                      <NumberInput
                        customClass="w-20"
                        bind:value={Image.order}
                      />
                    </div>
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
              Ürün Resmi Ekle
            </button>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2 ">
            <button
              on:click={addProduct}
              disabled={!product.name.isValid || product.name.value == null}
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
