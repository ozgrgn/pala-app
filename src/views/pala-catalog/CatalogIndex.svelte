<script>
  import CatalogBuilder from "./CatalogBuilder.svelte";
  import RestService from "$services/rest";
  import { activeCatalogPage,refreshCatalogSide } from "$services/store";
  import { link } from "svelte-navigator";

  import ToastService from "$services/toast";
  import Select from "$components/Form/Select.svelte";
  import NumberInputV2 from "$components/Form/NumberInputV2.svelte";
  import { Modal, bind } from "svelte-simple-modal";
  import { modal } from "$services/store";

  import Alert from "$components/Alert.svelte";
  const deleteCatalogPageApprove = (pageId) => {
    console.log(pageId, "pageId");
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteCatalogPage(pageId);
          }
          modal.set(null);
        },
      })
    );
  };

  let catalogPage;
  let currentProducts = [];
  let activeCategory;
  let categories;
  let newPageNumber;
  let newPageType;
  let types = [
    { type: "Full" },
    { type: "2+2" },
    { type: "2+1" },
    { type: "1+2" },
    { type: "1+1" },
  ];
  const getCatalogPage = async (_id) => {
    let response = await RestService.getCatalogPage(_id);

    if (response["status"]) {
      activeCatalogPage.set(response["catalogPage"]);
    } else {
      ToastService.error("olmadı");
    }
  };
  const addCatalogPage = async (newPage) => {
    if (catalogPages && catalogPages[0]) {
      let sameNumber = catalogPages.findIndex((x) => x.number == newPageNumber);
      if (sameNumber > -1) {
        ToastService.error("Bu sayfa numarası mevcut");
        return;
      }
    }
    let response = await RestService.addCatalogPage(newPage);
    if (response && response["status"]) {
      console.log(response, "lflfl");
      ToastService.success("Sayfa başarıyla eklendi");
     getCatalogPages()
    }
  };
  const deleteCatalogPage = async (pageId) => {
    let response = await RestService.deleteCatalogPage(pageId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      getCatalogPages();
    } else {
      ToastService.error("İşlem başarısız");
    }
  };
  let catalogPages;
  const getCatalogPages = async () => {
    let response = await RestService.getCatalogPages(
      undefined,
      undefined,
      true,
      activeCategory
    );
    if(response && response["catalogPages"]) {
      refreshCatalogSide.set(false)
      getProducts()
    catalogPages = response["catalogPages"];
  };}




  let products;
  const getProducts = async () => {
    let response = await RestService.getProducts(
      undefined,
      undefined,
      true,
      activeCategory,
      undefined
    );
    if (response["status"]) {
      products = response["products"];
      console.log(activeCategory,products, "products");
    }
  };
  getProducts();
  const getCats = async () => {
    let response = await RestService.getCats(undefined, undefined, true);

    if (response["status"]) {
      categories = response["cats"];
      
      console.log(categories, "catss");
    }
  };
  getCats();


    $:if($refreshCatalogSide) {
  console.log("refresh")
  getCatalogPages()
}
</script>

<Modal show={$modal} />

<div class="grid grid-cols-4">
  <div class="col-span-1 border px-4 py-4">
    {#if categories}
      <Select
        bind:value={activeCategory}
        values={categories}
        title={"Kategori Seçin"}
        valuesKey={"_id"}
        valuesTitleKey={"name"}
        customClass={"w-full bg-slate-200"}
        change={() => {
          getCatalogPages();
        }}
      />
    {/if}
    <div
      class="flex flex-col flex-wrap gap-4 justify-center items-center rounded mt-8 "
    >
      {#if catalogPages}
        {#each catalogPages as catalogPage, i}
          <div
            class="cursor-pointer bg-slate-400 rounded border w-48 h-12 gap-6 flex items-center px-2"
            on:click={() => {
              getCatalogPage(catalogPage._id);
            }}
          >
            <button class="bg-white shadow text-slate-600 rounded h-8 w-20 py-1 px-1 text-sm">
              {catalogPage?.number} Sayfa
            </button>
            <span class="text-white">{catalogPage?.type}</span>

            <button
              class=" h-6 w-6"
              type="button"
              on:click={() => deleteCatalogPageApprove(catalogPage._id)}
            >
              <i class="text-xl text-white hover:text-red-500 pt-1 bi bi-trash" />
            </button>
          </div>
        {/each}
      {/if}
    </div>
    {#if activeCategory}
      <div class="flex gap-2 my-8">
        <NumberInputV2
          bind:value={newPageNumber}
          placeholder={"No"}
          type="number"
          required={true}
          customClass="bg-slate-200 h-10"
        />
        <Select
          bind:value={newPageType}
          values={types}
          title={"Tip"}
          valuesKey={"type"}
          valuesTitleKey={"type"}
          customClass={"w-full bg-slate-200 h-10"}
        />
        <button
          class="bg-slate-600  px-2 h-10 text-sm shadow text-white rounded cursor-pointer hover:bg-[#1db656]"
          disabled={(!newPageNumber && newPageNumber!=0) || !newPageType }
          on:click={() => {
            addCatalogPage({
              number: newPageNumber,
              type: newPageType,
              category: activeCategory,
            });
          }}
        >
          Sayfa Ekle
        </button>
      </div>
     
    {/if}
    <a use:link href="/panel" class="flex justify-center w-full">
    <button class="bg-slate-600 w-20 px-2 h-10 text-sm shadow text-white rounded cursor-pointer hover:bg-[#1db656] ">
      Geri
            </button>
          </a>
  </div>
  {#if products}
    <div class="col-span-3 border h-full">
      {#key $activeCatalogPage}
        <CatalogBuilder {catalogPage} {products} {catalogPages} />
      {/key}
    </div>
  {/if}
</div>
