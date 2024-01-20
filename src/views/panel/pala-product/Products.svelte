<script>
  import RestService from "$services/rest";
  import { TranslateApiMessage, Translate } from "$services/language";
  import { navigate } from "svelte-navigator";
  import ToastService from "$services/toast";
  import Select from "$components/Form/Select.svelte";
  import { bind } from "svelte-simple-modal";
  import Alert from "$components/Alert.svelte";
  import { modal, search, panelDrawer, activePage } from "$services/store";
  import Input from "$components/Form/Input.svelte";
  import { onMount } from "svelte";
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
  const setCampaign = async (productId, product) => {
    product.campaign = !product.campaign;
    let response = await RestService.updateProduct(productId, product);
    if (response && response.status) {
      getProducts($search);
      ToastService.success("Kampanya değişikliği başarılı");
    }
  };
  onMount(() => {
    setTimeout(() => {
      panelDrawer.set(false);
    }, 50);
  });
  const navigateAndSkip = async (product) => {
    activePage.set(skip);
    navigate(
      `/panel/update-product/${product._id.toString()}?limit=${limit}&skip=${skip}&isActive=${isActive}&catalogActive=${catalogActive}&cat=${cat}`
    );
  };
  let products;
  let active;
  let pasive;
  let cats;
  let totalDataCount = 0;
  let activePages = 0;
  let activeCases = [
    { name: "Tümü", key: undefined },
    { name: "Aktif", key: true },
    { name: "Pasif", key: false },
  ];
  let catalogActiveCases = [
    { name: "Tümü", key: undefined },
    { name: "Aktif", key: true },
    { name: "Pasif", key: false },
  ];
  let limit = params(location.search)["limit"]
    ? params(location.search)["limit"]
    : 20;
  let skip = params(location.search)["skip"]
    ? params(location.search)["skip"]
    : 0;
  let isActive =
    params(location.search)["isActive"] == "null"
      ? undefined
      : params(location.search)["isActive"];
  let catalogActive =
    params(location.search)["catalogActive"] == "null"
      ? undefined
      : params(location.search)["catalogActive"];
  let cat = params(location.search)["cat"]== "undefined"
    ? undefined 
    : params(location.search)["cat"];

  const nextProducts = async (search) => {
    skip = 0;
    getProducts(search);
  };
  const getCats = async () => {
    let response = await RestService.getCats(undefined, undefined, true);
    cats = response["cats"];
    console.log(cats, "cats");
  };
  getCats();
  const getProducts = async (search) => {
    if ($activePage) {
      skip = $activePage;
    }
    let response = await RestService.getProducts(
      limit,
      skip,
      isActive,
      cat,
      undefined,
      search,
      undefined,
      catalogActive
    );
    totalDataCount = response["count"];
    activeCases[0].count = totalDataCount;
    activeCases[1].count = response["active"];
    activeCases[2].count = response["pasive"];

    products = response["products"];
    activePage.set(null);
  };
  $: nextProducts($search);
  $: pages(totalDataCount, limit);

  const deleteProduct = async (productId) => {
    let response = await RestService.deleteProduct(productId);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-deleted"));
      getProducts();
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };
  const ceilAndCalculate = () => {
    if (Math.ceil(skip / limit) != Math.ceil(totalDataCount / limit) - 1) {
      skip = skip + limit;
      getProducts();
    }
  };

  const pages = () => {
    if (totalDataCount > limit) {
      activePages = new Array(Math.ceil(totalDataCount / limit));
    } else {
      activePages = [1];
    }
  };

  export let color = "light";
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4">
    <button
      class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
      type="button"
      on:click={() => {
        navigate("/panel/create-product");
      }}
    >
      <i class="fa fa-plus" />
      {$Translate("Add")}
    </button>

    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <div class="flex justify-between">
              <h3 class="font-semibold text-lg text-blueGray-700">Ürünler</h3>
              <div class="relative">
                <Input
                  bind:value={$search}
                  placeholder={"Ürün Arama"}
                  customClass="pl-10 border-2"
                />
                <div class="absolute top-2 left-2">
                  <i class="bi bi-search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="block w-full overflow-x-auto">
        {#if products}
          <table class="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  No
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Sıra
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  {#if cats}
                    <Select
                      bind:value={cat}
                      change={() => nextProducts()}
                      values={cats}
                      title={"Kategori"}
                      valuesKey={"_id"}
                      valuesTitleKey={"name"}
                      customClass={"w-full border-0 max-w-xs"}
                      textSmall={true}
                    />
                  {/if}
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  İsim
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Marka
                </th>
                <!-- <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Stok
                </th> -->
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Kampanya
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  {#if activeCases}
                    <Select
                      bind:value={isActive}
                      change={() => nextProducts()}
                      values={activeCases}
                      title={"Durum"}
                      valuesKey={"key"}
                      valuesTitleKey={"name"}
                      secondTitleKey={"count"}
                      customClass={"w-full border-0 max-w-xs"}
                      textSmall={true}
                    />
                  {/if}
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  {#if catalogActiveCases}
                    <Select
                      bind:value={catalogActive}
                      change={() => nextProducts()}
                      values={catalogActiveCases}
                      title={"Katalog"}
                      valuesKey={"key"}
                      valuesTitleKey={"name"}
                      customClass={"w-full border-0 max-w-xs text-xs"}
                      textSmall={true}
                    />
                  {/if}
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                />
              </tr>
            </thead>
            <tbody>
              {#each products as product}
                <tr>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {product?.no}
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {product?.order}
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {product?.cat?.name ? product?.cat?.name : "-"}
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {product?.name}
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {product?.brand?.name ? product?.brand?.name : "-"}
                  </td>
                  <!-- <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {product?.stockCount}
                  </td> -->
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    <button
                      on:click={() => setCampaign(product._id, product)}
                      class="{product.campaign
                        ? 'bg-green-500'
                        : 'bg-red-500'} bg-green-500 p-2 rounded text-white font-semibold"
                    >
                      {product.campaign ? "Evet" : "Hayır"}
                    </button>
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    <button
                      class="{product.isActive
                        ? 'bg-green-500'
                        : 'bg-red-500'} bg-green-500 p-2 rounded text-white font-semibold"
                    >
                      {product.isActive ? "Aktif" : "Pasif"}
                    </button>
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    <button
                      class="{product.catalogActive
                        ? 'bg-green-500'
                        : 'bg-red-500'} bg-green-500 p-2 rounded text-white font-semibold"
                    >
                      {product.catalogActive ? "Aktif" : "Pasif"}
                    </button>
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    <button
                      class="bg-white text-blue-600 hover:bg-[#6e6e85] hover:text-white border border-blue-600 rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
                      type="button"
                      on:click={navigateAndSkip(product)}
                    >
                      {$Translate("Edit")}
                    </button>
                    <button
                      on:click={() =>
                        deleteProductApprove(product._id.toString())}
                      class="bg-white text-blue-600 hover:bg-[#6e6e85] hover:text-white border border-blue-600 rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
                      type="button"
                    >
                      {$Translate("Delete")}
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/if}
      </div>
      <hr class="my-4 md:min-w-full" />
      {#if products}
        <div
          class="flex flex-row flex-wrap lg:flex-nowrap w-full gap-1 justify-center lg:justify-end items-center p-3"
        >
          <Select
            bind:value={limit}
            change={() => {
              getProducts();
            }}
            values={[
              { header: "20", limit: 20 },
              { header: "50", limit: 50 },
              { header: "100", limit: 100 },
              { header: "Tümü", limit: 99999999 },
            ]}
            title={"Select page"}
            valuesKey={"limit"}
            valuesTitleKey={"header"}
            customClass={"border border-blue-600 text-blue-600 py-1 w-full mx-16 lg:mx-0 lg:w-auto"}
          />

          <button
            class="bg-[#6e6e85] text-white active:bg-orange-500 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
            type="button"
            on:click={() => {
              skip != 0 ? (skip = skip - limit) : (skip = skip);
              getProducts();
            }}
          >
            {$Translate("Prev")}
          </button>
          {#if totalDataCount}
            {#each activePages as page, i}
              <button
                class="border {skip == limit * i
                  ? 'bg-[#6e6e85] text-white'
                  : 'bg-white text-blue-600 border-blue-600'} font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
                class:hidden={i - skip / limit > 5 || skip / limit - i > 5}
                type="button"
                on:click={() => {
                  skip = limit * i;
                  getProducts();
                }}
              >
                {i + 1}
              </button>
            {/each}
          {/if}
          <button
            onclick={ceilAndCalculate}
            class="bg-[#6e6e85] text-white active:bg-orange-500 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
            type="button"
          >
            {$Translate("Next")}
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
