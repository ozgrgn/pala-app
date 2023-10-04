<script>
  import RestService from "$services/rest";
  import ToastService from "$services/toast";
  import { refreshCatalogSide } from "$services/store";

  let activeCategory;
  let categories;
  const getCats = async () => {
    let response = await RestService.getCats(undefined, undefined, true);

    if (response["status"]) {
      categories = response["cats"];
      console.log(categories, "catss");
    }
  };
  getCats();

  const getCatalogPage = async (_id) => {
    let response = await RestService.getCatalogPage(_id);

    if (response["status"]) {
    } else {
      ToastService.error("olmadı");
    }
  };

  const addCatalogPage = async () => {
    let response = await RestService.addCatalogPage(newPage);
    if (response && response["status"]) {
      ToastService.success("Sayfa başarıyla eklendi");
    }
  };
  let catalogPages;
  const getCatalogPages = async () => {
    let response = await RestService.getCatalogPages(
      undefined,
      undefined,
      activeCategory
    );
    catalogPages = response["catalogPages"];
    console.log(response, "catalogPages");
  };
  getCatalogPages();

  $: if ($refreshCatalogSide) {
    console.log("refresh")
    getCatalogPages();
  }
</script>

<div class="flex flex-col flex-wrap">
  {#if catalogPages}
    {#each catalogPages as catalogPage, i}
      <div
        class="cursor-pointer"
        on:click={() => {
          getCatalogPage(catalogPage._id);
        }}
      >
        {catalogPage.number} Sayfa
      </div>
    {/each}
  {/if}
</div>
