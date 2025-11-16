<script>
  import Select from "$components/Form/Select.svelte";
  import SelectV2 from "$components/Form/SelectV2.svelte";
  import RestService from "$services/rest";
  import DoubleItem from "./CatalogItems/DoubleItem.svelte";
  import FullItem from "./CatalogItems/FullItem.svelte";
  import OneItem from "./CatalogItems/OneItem.svelte";

  let sortedPages = [];
  let cats;
  let membership;
  let memberships;
  let pn = 0;
  let catalogIndex = [];
  const getMemberships = async () => {
    let response = await RestService.getMemberships(undefined, undefined);
    memberships = response["memberships"];
  };
  getMemberships();

  const getCats = async () => {
    let response = await RestService.getCats(undefined, undefined, true);

    if (response["status"]) {
      cats = response["cats"];

      cats.map((cat, i) => {
        let filteredPages = catalogPages.filter(
          ({ category }) => category._id == cat._id
        );
        if (filteredPages[0]) {
          filteredPages.map((f, x) => {
            pn = pn + 1;
            filteredPages[x].pn = pn;
          });

          catalogIndex.push({ name: cat.name, pageNo: pn });
          sortedPages.push(filteredPages);
        }
      });
    }
  };

  let catalogPages;

  const getCatalogPages = async () => {
    let response = await RestService.getCatalogPages(
      undefined,
      undefined,
      true,
      undefined
    );
    if (response && response["catalogPages"]) {
      catalogPages = response["catalogPages"];
      getCats();
    }
  };
  getCatalogPages();
  let catalogImages;
  const getCatalogImages = async () => {
    let response = await RestService.getCatalogImages();
    if (response && response["catalogImages"]) {
      catalogImages = response["catalogImages"];
    }
  };
  getCatalogImages();
</script>

<style>
  @media print {
    @page {
      size: A4 portrait;
      margin: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page-container {
      page-break-after: always;
      page-break-inside: avoid;
    }

    .page-container:last-child {
      page-break-after: auto;
    }
  }
</style>

<div class="not-printable flex justify-center my-5">
  {#if memberships}
    <SelectV2
      bind:value={membership}
      values={memberships}
      title={"Fiyat"}
      valuesKey={"_id"}
      all={true}
      valuesTitleKey={"name"}
      customClass={"w-48 focus:ring-0 ring-0 "}
    />
  {/if}
</div>
{#if cats && catalogPages && sortedPages && sortedPages[0]}
  <div
    class="flex flex-col justify-center items-center w-full h-full text-black"
  >
    {#if catalogImages}
      {#each catalogImages as catalogImage}
        {#if catalogImage.place == "Giriş"}
          <div class="page-container h-[297mm] w-[210mm]">
            <img
              class="h-[297mm] w-[210mm] object-cover"
              src={catalogImage.image}
              alt=""
            />
          </div>
        {/if}
      {/each}
    {/if}
  </div>
  <div
    class="flex flex-col justify-center items-center w-full h-full text-black h-full w-full"
  >
    <div
      class="page-container relative flex flex-col justify-start items-center pt-40 h-[297mm] w-[210mm]"
    >
      <div
        class="absolute top-0 right-4 h-28 w-40 p-3 pt-5 drop-shadow flex justify-center items-center shadow-xl"
      >
        <img src="/assets/img/logos/kochmaster.png" alt="" />
      </div>
      <div
        class="absolute bottom-0 right-0 w-full flex justify-center items-center"
      >
        <img src="/assets/img/page-unten.png" alt="" />
      </div>
      <div class="flex flex-col items-center py-4">
        <h5 class="text-4xl font-semibold">INHALTSVERZEICHNIS</h5>
        <span class="text-2xl">İÇERİK - CONTENT</span>
      </div>
      <div class="relative flex flex-col justify-center items-center">
        {#each catalogIndex as catIndex, i}
          <div class="flex h">
            <div class="w-10">
              {i + 1}.
            </div>
            <div class="absolute w-full pl-20 z-10">
              .......................................................................................
            </div>
            <div class="relative w-[26rem] z-20 uppercase">
              <div class="w-fit h-7 bg-white z-20 pr-1 whitespace-nowrap">
                {catIndex.name}
              </div>
            </div>
            <div class="w-20">{catIndex.pageNo}</div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  {#each sortedPages as sortedPage, i}
    <div class="flex flex-col justify-center items-center text-black">
      {#each sortedPage as page, a}
        <div
          class="page-container relative grid grid-cols-2 grid-rows-2 gap-8 h-[297mm] w-[210mm] p-10 pt-32 pb-20"
        >
          <div
            class="absolute bottom-2 left-2 opacity-40 italic font-semibold text-lg"
          >
            <h5>{page.pn}</h5>
          </div>
          <div
            class="absolute top-6 left-4 opacity-40 italic font-semibold text-lg underline"
          >
            <h5>{page.category.name}</h5>
          </div>
          <div
            class="absolute top-0 right-4 h-28 w-40 p-3 pt-5 drop-shadow flex justify-center items-center shadow-xl"
          >
            <img src="/assets/img/logos/kochmaster.png" alt="" />
          </div>
          <!-- FULL PAGE -->
          {#if page.type == "Full"}
            <FullItem {membership} items={page.firstFull} image={page.image} />
          {:else}
            <!-- FIRST ROW -->
            {#if page.type == "2+1" || page.type == "2+2"}
              {#if page.firstOne[0]}
                <div class="">
                  {#key membership}
                    <OneItem {membership} item={page.firstOne[0]} />
                  {/key}
                </div>
              {/if}

              {#if page.firstTwo[0]}
                <div class="">
                  <OneItem {membership} item={page.firstTwo[0]} />
                </div>
              {/if}
            {:else}
              <div
                class="col-span-2 h-full flex justify-center items-center w-full"
              >
                <DoubleItem
                  {membership}
                  items={page.firstDouble}
                  image={page.firstDoubleImage}
                />
              </div>
            {/if}
            <!-- FIRST ROW -->
            {#if page.type == "1+2" || page.type == "2+2"}
              {#if page.secondOne[0]}
                <div class="">
                  {#key membership}
                    <OneItem {membership} item={page.secondOne[0]} />
                  {/key}
                </div>
              {/if}
              {#if page.secondTwo[0]}
                <div class="">
                  <OneItem {membership} item={page.secondTwo[0]} />
                </div>
              {/if}
            {:else}
              <div class="col-span-2 h-full flex justify-center items-center">
                <DoubleItem
                  {membership}
                  items={page.secondDouble}
                  image={page.secondDoubleImage}
                />
              </div>
            {/if}
          {/if}
        </div>
      {/each}
    </div>
  {/each}
  <div
    class="flex flex-col justify-center items-center w-full h-full text-black"
  >
    <div class="text-black">
      {#if catalogImages}
        {#each catalogImages as catalogImage}
          {#if catalogImage.place == "Çıkış"}
            <div class="page-container gap-8 h-[297mm] w-[210mm]">
              <img
                class="h-full w-full object-cover"
                src={catalogImage.image}
                alt=""
              />
            </div>
          {/if}
        {/each}
      {/if}
    </div>
  </div>
{/if}
