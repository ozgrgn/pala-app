<script>
  import Alert from "$components/Alert.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Input from "$components/Form/Input.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Select from "$components/Form/Select.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import TextEditor from "$components/Form/TextEditor.svelte";
  import Switch from "$components/Switch.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate, useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  import { modal } from "$services/store";
  import { params } from "$services/utils";

  const deleteProductApprove = (productId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteProduct(productId);
          }
          modal.set(null);
        },
      })
    );
  };

  const editParams = useParams();
  const unitPiece = async (i) => {
    product.units[i].number = 1;
  };
  let deleteImage = (index) => {
    product.images.splice(index, 1);
    product.images = product.images;
  };
  let deleteLogo = (index) => {
    product.logos.splice(index, 1);
    product.logos = product.logos;
  };
  let product;
  let images = [];
  let cats;
  let brands;
  let memberships;
  let units;
  let processing = false;

  let values = [
    { key: "no", customValue: null },
    { key: "name", customValue: null },
    { key: "cat", customValue: null },
    { key: "brand", customValue: null },
    { key: "color", customValue: null },
    { key: "units", customValue: null },
    { key: "prices", customValue: null },
    { key: "note", customValue: null },
    { key: "order", customValue: null },
    { key: "isActive", customValue: null },
    { key: "images", customValue: null },
    { key: "stockCount", customValue: null },
    { key: "catalogName", customValue: null },
    { key: "catalogDesc1", customValue: null },
    { key: "catalogDesc2", customValue: null },
  ];

  const updateProduct = async () => {
    if (product.stockCount.value == null) {
      product.stockCount.value = 0;
    }
    let editedProduct = {};
    editedProduct.prices = product.prices;
    editedProduct.units = product.units;
    editedProduct.images = product.images;
    values.map((v) => {
      if (v.key != "prices" && v.key != "units" && v.key != "images") {
        editedProduct[v.key] = product[v.key].value;
      }
    });
console.log(editedProduct,"editedProduct")
    let response = await RestService.updateProduct(product._id, editedProduct);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate(
        `/panel/products?limit=${params(location.search)["limit"]}&skip=${
          params(location.search)["skip"]
        }&isActive=${params(location.search)["isActive"]}`
      );
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getProduct = async () => {
    processing = true;
    let response = await RestService.getProduct($editParams.productId);

    if (response["status"]) {
      console.log(response, "responseresponseresponse");
      values.map((v) => {
        if (v.customValue) {
          response["product"][v.key] = {
            value: response["product"][v.key][v.customValue],
          };
        } else if (v.key != "prices" && v.key != "units" && v.key != "images") {
          response["product"][v.key] = { value: response["product"][v.key] };
        }
      });

      product = {
        ...response["product"],
      };
      if (product.stockCount.value == 0) {
        product.stockCount.value = null;
      }
      getMemberships();
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getProduct();
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
    memberships.map((membership, index) => {
      const result = product.prices.find(({ _id }) => _id == membership._id);
      if (!result) {
        product.prices.push({ _id: membership._id, name: membership.name });
      }

      product.prices.map((price, index) => {
        const result1 = memberships.find(({ _id }) => _id == price._id);
        if (!result1) {
          product.prices.splice(index, 1);
        }
      });

      console.log(product.prices, "agaga");
    });
    processing = false;
    console.log(product, "en son");
  };

  const getUnits = async () => {
    let response = await RestService.getUnits(undefined, undefined);
    units = response["units"];
    units.map((unit, index) => {
      const result = product.units.find(({ _id }) => _id == unit._id);
      if (!result) {
        product.units.push({ _id: unit._id, name: unit.name });
      }

      console.log(product.prices, "agaga");
    });
    console.log(units, "units");
  };
  getUnits();

  const deleteProduct = async (productId) => {
    let response = await RestService.deleteProduct(productId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate(
        `/panel/products?limit=${params(location.search)["limit"]}&skip=${
          params(location.search)["skip"]
        }&isActive=${params(location.search)["isActive"]}`
      );
    } else {
      ToastService.success("İşlem başarılı");
    }
  };
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4">
    <div class="flex justify-between">
      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
        type="button"
        on:click={() => {
          navigate(
            `/panel/products?limit=${params(location.search)["limit"]}&skip=${
              params(location.search)["skip"]
            }&isActive=${params(location.search)["isActive"]}`
          );
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
        type="button"
        on:click={() => deleteProductApprove($editParams.productId)}
      >
        <i class="fa fa-trash" />
        Sil
      </button>
    </div>

    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="text-center flex justify-between">
          <h3 class="font-semibold text-lg text-blueGray-700">Ürün Güncelle</h3>
          <div class="relative mb-3 px-10">
            <label
              class="block text-blueGray-600 text-xs font-bold mb-2"
              for="rectangleBanner"
            >
              Aktif mi ?
            </label>
            {#if product}
              <Switch bind:value={product.isActive.value} />
            {/if}
          </div>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if product}
          <div class="flex flex-wrap my-4">
            <div class="w-full lg:w-2/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
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
                  class="block text-blueGray-600 text-xs font-bold mb-2"
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
                  class="block text-blueGray-600 text-xs font-bold mb-2"
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
                  class="block text-blueGray-600 text-xs font-bold mb-2"
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
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Marka
                </label>
                {#if brands && product}
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
            <div class="w-full lg:w-3/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Katalog Başlık
                </label>
                <Input
                  bind:value={product.catalogName.value}
                  bind:isValid={product.catalogName.isValid}
                  placeholder={"Ürün No"}
                  required={true}
                />
              </div>
            </div>
            <div class="w-full lg:w-3/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Katalog Sol Açıklama Max: 20-{product.no.value.length
                    ? product.no.value.length
                    : 0}
                </label>
                <Input
                  bind:value={product.catalogDesc1.value}
                  bind:isValid={product.catalogDesc1.isValid}
                  placeholder={"Açıklama Sol"}
                  required={true}
                />
              </div>
            </div>
            <div class="w-full lg:w-3/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Katalog Sağ Açıklama Max: 20-{product.no.value.length
                    ? product.no.value.length
                    : 0}
                </label>
                <Input
                  bind:value={product.catalogDesc2.value}
                  bind:isValid={product.catalogDesc2.isValid}
                  placeholder={"Açıklama Sağ"}
                  required={true}
                />
              </div>
            </div>

            <!-- <div class="w-full lg:w-2/12 px-4">
              <div class="relative w-full mb-3 ap">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Stok Adedi
                </label>
                <NumberInput
                  bind:value={product.stockCount.value}
                  bind:isValid={product.stockCount.isValid}
                  placeholder={"Stok"}
                  required={true}
                  customClass="appearance-none "
                />
              </div>
            </div> -->
          </div>

          <div class="flex flex-wrap my-4">
            <div class="lg:w-3/12 px-4">
              <div class="">
                <div class=" ">
                  <label
                    class="block text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-name"
                  >
                    Fiyatlar
                  </label>
                  {#if !processing}
                    {#each product.prices as price, index}
                      <div class="border mt-2 p-1 grid grid-cols-2">
                        <span
                          class="px-2 flex flex-col justify-center text-blueGray-600 text-sm font-bold"
                          >{price.name} Fiyatı</span
                        >
                        <div class=" flex flex-col justify-center">
                          <NumberInput
                            bind:value={product.prices[index].price}
                            placeholder={"Fiyatı"}
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
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Birimler
                </label>
                {#if product.units}
                  {#each product.units as unit, index}
                    {#if unit._id != "63bb0c70f638ea468ffd4942"}
                      <div class="border mt-2 p-1 grid grid-cols-2">
                        <span
                          class="px-2 flex flex-col justify-center text-blueGray-600 text-sm font-bold"
                          >{unit.name} Adedi</span
                        >
                        <div class=" flex flex-col justify-center">
                          <NumberInput
                            bind:value={product.units[index].number}
                            placeholder={"Adet Sayısı"}
                            required={false}
                          />
                        </div>
                      </div>
                    {:else}
                      <div class="hidden">
                        {@html unitPiece(index)}
                      </div>
                    {/if}
                  {/each}
                {/if}
              </div>
            </div>
            <div class="lg:w-6/12 px-4">
              <div class="">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Resimler
                </label>
                {#each product.images as Image, index}
                  <div class="border mt-2 p-1 grid grid-flow-col">
                    <span
                      class="px-2 flex flex-col justify-center text-blueGray-600 text-xs font-bold"
                      >{"Resim"}</span
                    >
                    <div class="col-span-2">
                      <ImageArray bind:value={Image.image} />
                    </div>
                    <div class="flex justify-end">
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
                on:click={() =>
                  (product.images = [...product.images, { image: null }])}
                class=" mt-2 bg-orange-400 disabled:bg-red-300 text-white active:bg-[#6e6e85] font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
              >
                Ürün Resmi Ekle
              </button>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updateProduct()}
                disabled={!product.name}
                class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1"
                type="button"
              >
                {$Translate("Update")}
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
