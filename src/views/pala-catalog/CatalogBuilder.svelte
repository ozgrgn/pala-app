<script>
  import Selectv2 from "$components/Form/SelectV2.svelte";
  import RestService from "$services/rest";
  import ToastService from "$services/toast";

  import { activeCatalogPage, refreshCatalogSide } from "$services/store";
  import { Translate, TranslateApiMessage } from "$services/language";
  import Input from "$components/Form/Input.svelte";
  import Image from "$components/Form/Image.svelte";

  export let products;
export let catalogPages 
  let page = {};
  page = $activeCatalogPage;
  console.log(page, "pahe");
  if (page && !page?.firstFull[0]) {
    page.firstFull = [null];
  }
  if (page && !page?.firstOne[0]) {
    page.firstOne = [null];
  }
  if (page && !page?.firstTwo[0]) {
    page.firstTwo = [null];
  }
  if (page && !page?.firstDouble[0]) {
    page.firstDouble = [null];
  }
  if (page && !page?.secondOne[0]) {
    page.secondOne = [null];
  }
  if (page && !page?.secondTwo[0]) {
    page.secondTwo = [null];
  }
  if (page && !page?.secondDouble[0]) {
    page.secondDouble = [null];
  }

  const deleteFirstFull = async (index) => {
    page.firstFull.splice(index, 1);
    page.firstFull = page.firstFull;
  };
  const deleteFirstOne = async (index) => {
    page.firstOne.splice(index, 1);
    page.firstOne = page.firstOne;
  };
  const deleteFirstTwo = async (index) => {
    page.firstTwo.splice(index, 1);
    page.firstTwo = page.firstTwo;
  };
  const deleteFirstDouble = async (index) => {
    page.firstDouble.splice(index, 1);
    page.firstDouble = page.firstDouble;
  };
  const deleteSecondOne = async (index) => {
    page.secondOne.splice(index, 1);
    page.secondOne = page.secondOne;
  };
  const deleteSecondTwo = async (index) => {
    page.secondTwo.splice(index, 1);
    page.secondTwo = page.secondTwo;
  };
  const deleteSecondDouble = async (index) => {
    page.secondDouble.splice(index, 1);
    page.secondDouble = page.secondDouble;
  };

  const savePage = async () => {
    let response = await RestService.updateCatalogPage(page._id, page);
    refreshCatalogSide.set(true);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
    }
  };
  const findProductImage = (id) => {
    if (products.find(({ _id }) => _id == id)?.images[0]?.image) {
      return products.find(({ _id }) => _id == id).images[0].image;
    } else {
      return undefined;
    }
  };
  const changeFirstDoubleImage = (id) => {
    page.firstDoubleImage = products.find(
      ({ _id }) => _id == id
    ).images[0].image;
  };
  const changeSecondDoubleImage = (id) => {
    page.secondDoubleImage = products.find(
      ({ _id }) => _id == id
    ).images[0].image;
  };

  $: if (catalogPages && $activeCatalogPage) {
  console.log(catalogPages,"girdii")
  catalogPages.map((page, i) => {
    console.log(page,"iiiii")
      if (page.firstOne) {
        page.firstOne.map((_page) => {
          console.log("ddfdfds")
          let pIndex = products.findIndex((x) => x._id == _page._id);
          if ( pIndex > -1) {
            products[pIndex].pageNumber = page.number;
          }
        });
      }

      if (page.firstTwo) {
        page.firstTwo.map((_page) => {
          let pIndex = products.findIndex((x) => x._id == _page._id);
          if ( pIndex > -1) {
            products[pIndex].pageNumber = page.number;
          }
        });
      }
      if (page.firstDouble) {
        page.firstDouble.map((_page) => {
          let pIndex = products.findIndex((x) => x._id == _page._id);
          if ( pIndex > -1) {
            products[pIndex].pageNumber = page.number;
          }
        });
      }
      if (page.secondOne) {
        page.secondOne.map((_page) => {
          let pIndex = products.findIndex((x) => x._id == _page._id);
          if ( pIndex > -1) {
            products[pIndex].pageNumber = page.number;
          }
        });
      }
      if (page.secondTwo) {
        page.secondTwo.map((_page) => {
          let pIndex = products.findIndex((x) => x._id == _page._id);
          if ( pIndex > -1) {
            products[pIndex].pageNumber = page.number;
          }
        });
      }
      if (page.secondDouble) {
        page.secondDouble.map((_page) => {
          let pIndex = products.findIndex((x) => x._id == _page._id);
          if ( pIndex > -1) {
            products[pIndex].pageNumber = page.number;
          }
        });
      }

      // if (page.firstTwo) {
      //   currentProducts.push({ _id: page.firstTwo, number: page.number });
      // }
    });

  


  }


  // $: if ($activeCatalogPage) {
  //   products.map((product, i) => {
  //     if (product.pageNumber == page.number) product.pageNumber = undefined;
  //   });
  //   if (page.firstFull) {
  //     page.firstFull.map((_page) => {
  //       let pIndex = products.findIndex((x) => x._id == _page._id);
  //       if (pIndex > -1) {
  //         products[pIndex].pageNumber = page.number;
  //       }
  //     });
  //   }
  //   if (page.firstOne) {
  //     page.firstOne.map((_page) => {
  //       let pIndex = products.findIndex((x) => x._id == _page._id);
  //       if (pIndex > -1) {
  //         products[pIndex].pageNumber = page.number;
  //       }
  //     });
  //   }

  //   if (page.firstTwo) {
  //     page.firstTwo.map((_page) => {
  //       let pIndex = products.findIndex((x) => x._id == _page._id);
  //       if (pIndex > -1) {
  //         products[pIndex].pageNumber = page.number;
  //       }
  //     });
  //   }
  //   if (page.firstDouble) {
  //     page.firstDouble.map((_page) => {
  //       let pIndex = products.findIndex((x) => x._id == _page._id);
  //       if (pIndex > -1) {
  //         products[pIndex].pageNumber = page.number;
  //       }
  //     });
  //   }
  //   if (page.secondOne) {
  //     page.secondOne.map((_page) => {
  //       let pIndex = products.findIndex((x) => x._id == _page._id);
  //       if (pIndex > -1) {
  //         products[pIndex].pageNumber = page.number;
  //       }
  //     });
  //   }
  //   if (page.secondTwo) {
  //     page.secondTwo.map((_page) => {
  //       let pIndex = products.findIndex((x) => x._id == _page);
  //       if (pIndex > -1) {
  //         products[pIndex].pageNumber = page.number;
  //       }
  //     });
  //   }
  //   if (page.secondDouble) {
  //     page.secondDouble.map((_page) => {
  //       let pIndex = products.findIndex((x) => x._id == _page);
  //       if (pIndex > -1) {
  //         products[pIndex].pageNumber = page.number;
  //       }
  //     });
  //   }
  //   console.log(products,"sondaki products")
  // }
</script>

<!-- <div class="flex gap-2 w-full justify-center pt-4">
  <button class="w-20 bg-slate-600 text-white rounded p-2 text-sm">Resim</button
  >
  <button
    class="w-20 text-white rounded p-2 text-sm {page?.type == '2+2'
      ? 'bg-green-500'
      : 'bg-slate-600'}"
    on:click={() => {
      page.type = "2+2";
    }}>2+2</button
  >
  <button
    class="w-20 text-white rounded p-2 text-sm {page?.type == '2+1'
      ? 'bg-green-500'
      : 'bg-slate-600'}"
    on:click={() => {
      page.type = "2+1";
    }}>2+1</button
  >
  <button
    class="w-20 text-white rounded p-2 text-sm {page?.type == '1+2'
      ? 'bg-green-500'
      : 'bg-slate-600'}"
    on:click={() => {
      page.type = "1+2";
    }}>1+2</button
  >
  <button
    class="w-20 text-white rounded p-2 text-sm {page?.type == '1+1'
      ? 'bg-green-500'
      : 'bg-slate-600'}"
    on:click={() => {
      page.type = "1+1";
    }}>1+1</button
  >
</div> -->



<div class="flex justify-center items-center gap-2 pt-4">
  {#if page}
    <Input
      bind:value={page.number}
      customClass={"text-primary placeholder:text-primary placeholder:opacity-50 w-10"}
      required={true}
    />
    Sayfa
  {/if}
</div>
<div class="h-full h-full m-4 p-4">
  <!-- FULL PAGE -->
  {#if page?.type == "Full"}
    <div class="h-full w-full">
      <Image bind:value={page.image} />
      <div class="col-span-2 grid grid-cols-6 gap-2 p-4 ">
        {#each page.firstFull as product, index}
          <div class="col-span-3 grid grid-cols-3 h-28 border items-center">
            {#if products}
              <div class="col-span-2 flex px-2">
                <Selectv2
                  bind:value={page.firstFull[index]}
                  values={products}
                  title={"Ürün seç"}
                  valuesKey={"_id"}
                  valuesTitleKey={"no"}
                  secondTitleKey={"pageNumber"}
                  customClass={"w-full border-0 h-10"}
                />
              </div>
            {/if}
            <div class="col-span-1 flex items-center">
              <button
                class="h-9 w-9"
                type="button"
                on:click={() => deleteFirstFull(index)}
                ><i class="text-3xl text-red-500 bi bi-trash" />
              </button>
              <div
                class="relative h-24"
               
              >
                {#if page.firstFull[index]}
                  <img
                    class="h-full"
                    src={findProductImage(page.firstFull[index])}
                    alt="firstFull"
                  />
                {/if}
                <div
                  class="{findProductImage(page.firstFull[index]) ==
                  page.firstFullImage
                    ? 'absolute'
                    : 'hidden'} right-0 top-0"
                >
                  <i class="text-green-500 bi bi-check-circle-fill" />
                </div>
              </div>
            </div>
          </div>
        {/each}

          <div class="col-span-6 flex justify-center gap-2">
            <button
              on:click={() => {
                page.firstFull = [...page.firstFull, null];
              }}
              class="h-8 bg-orange-400 disabled:bg-red-300 text-white active:bg-[#6e6e85] font-bold uppercase text-xs px-4 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
            >
              Ekle
            </button>
          </div>
      
      </div>
    </div>
  {:else}
    <!-- FIRST ROW -->
    <div class="grid grid-cols-2 justify-around items-around border">
      {#if page?.type == "2+2" || page?.type == "2+1"}
        <div class="grid grid-cols-6 border p-4 h-[20rem] border">
          {#if page}
            {#each page.firstOne as product, index}
              {#if products}
                <div class="col-span-5 h-12">
                  <Selectv2
                    bind:value={page.firstOne[index]}
                    values={products}
                    title={"Ürün seç"}
                    valuesKey={"_id"}
                    valuesTitleKey={"no"}
                    secondTitleKey={"pageNumber"}
                    customClass={"w-full border-0 h-10"}
                  />
                </div>
              {/if}
              <button
                class=" h-9 w-9"
                type="button"
                on:click={() => deleteFirstOne(index)}
                ><i class="text-3xl text-red-500 bi bi-trash" />
              </button>
              <div class="col-span-6 flex justify-center items-center">
                {#if page.firstOne[index]}
                  <img
                    class="h-48"
                    src={findProductImage(page.firstOne[index])}
                    alt="firstOne"
                  />
                {/if}
              </div>
            {/each}
          {/if}
        </div>
        <div class="grid grid-cols-6 gap-2 border p-4 h-[20rem] border">
          {#each page.firstTwo as product, index}
            {#if products}
              <div class="col-span-5 h-12">
                <Selectv2
                  bind:value={page.firstTwo[index]}
                  values={products}
                  title={"Ürün seç"}
                  valuesKey={"_id"}
                  valuesTitleKey={"no"}
                  secondTitleKey={"pageNumber"}
                  customClass={"w-full border-0 h-10"}
                />
              </div>
            {/if}

            <button
              class="h-9 w-9"
              type="button"
              on:click={() => deleteFirstTwo(index)}
              ><i class="text-3xl text-red-500 bi bi-trash" />
            </button>
            <div class="col-span-6 flex justify-center items-center">
              {#if page.firstTwo[index]}
                <img
                  class="h-48"
                  src={findProductImage(page.firstTwo[index])}
                  alt="firsttwo"
                />{/if}
            </div>
          {/each}
        </div>
      {:else if page?.type == "1+2" || page?.type == "1+1"}
        <div class="col-span-2 grid grid-cols-6 gap-2 border p-4 h-full border">
          {#each page.firstDouble as product, index}
            <div class="col-span-3 grid grid-cols-3 h-28 border items-center">
              {#if products}
                <div class="col-span-2 flex px-2">
                  <Selectv2
                    bind:value={page.firstDouble[index]}
                    values={products}
                    title={"Ürün seç"}
                    valuesKey={"_id"}
                    valuesTitleKey={"no"}
                    secondTitleKey={"pageNumber"}
                    customClass={"w-full border-0 h-10"}
                  />
                </div>
              {/if}
              <div class="col-span-1 flex items-center">
                <button
                  class="h-9 w-9"
                  type="button"
                  on:click={() => deleteFirstDouble(index)}
                  ><i class="text-3xl text-red-500 bi bi-trash" />
                </button>
                <div
                  class="relative h-24 cursor-pointer"
                  on:click={changeFirstDoubleImage(page.firstDouble[index])}
                >
                  {#if page.firstDouble[index]}
                    <img
                      class="h-full"
                      src={findProductImage(page.firstDouble[index])}
                      alt="firstDouble"
                    />
                  {/if}
                  <div
                    class="{findProductImage(page.firstDouble[index]) ==
                    page.firstDoubleImage
                      ? 'absolute'
                      : 'hidden'} right-0 top-0"
                  >
                    <i class="text-green-500 bi bi-check-circle-fill" />
                  </div>
                </div>
              </div>
            </div>
          {/each}

          {#if page.firstDouble.length < 3}
            <div class="col-span-6 flex justify-center gap-2">
              <button
                on:click={() => {
                  page.firstDouble = [...page.firstDouble, null];
                }}
                class="h-8 bg-orange-400 disabled:bg-red-300 text-white active:bg-[#6e6e85] font-bold uppercase text-xs px-4 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
              >
                Ekle
              </button>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- SECOND ROW -->
    <div class="grid grid-cols-2 justify-around items-around">
      {#if page?.type == "2+2" || page?.type == "1+2"}
        <div class="grid grid-cols-6 border p-4 h-[20rem] border">
          {#if page}
            {#each page.secondOne as product, index}
              {#if products}
                <div class="col-span-5 h-12">
                  <Selectv2
                    bind:value={page.secondOne[index]}
                    values={products}
                    title={"Ürün seç"}
                    valuesKey={"_id"}
                    valuesTitleKey={"no"}
                    secondTitleKey={"pageNumber"}
                    customClass={"w-full border-0 h-10"}
                  />
                </div>
              {/if}
              <button
                class="h-9 w-9"
                type="button"
                on:click={() => deleteSecondOne(index)}
                ><i class="text-3xl text-red-500 bi bi-trash" />
              </button>
              <div class="col-span-6 flex justify-center items-center">
                {#if page.secondOne[index]}
                  <img
                    class="h-48"
                    src={findProductImage(page.secondOne[index])}
                    alt="firstOne"
                  />
                {/if}
              </div>
            {/each}
          {/if}
        </div>
        <div class="grid grid-cols-6 gap-2 border p-4 h-[20rem] border">
          {#each page.secondTwo as product, index}
            {#if products}
              <div class="col-span-5 h-12">
                <Selectv2
                  bind:value={page.secondTwo[index]}
                  values={products}
                  title={"Ürün seç"}
                  valuesKey={"_id"}
                  valuesTitleKey={"no"}
                  secondTitleKey={"pageNumber"}
                  customClass={"w-full border-0 h-10"}
                />
              </div>
            {/if}

            <button
              class="h-9 w-9"
              type="button"
              on:click={() => deleteSecondTwo(index)}
              ><i class="text-3xl text-red-500 bi bi-trash" />
            </button>
            <div class="col-span-6 flex justify-center items-center">
              {#if page.secondTwo[index]}
                <img
                  class="h-48"
                  src={findProductImage(page.secondTwo[index])}
                  alt="firstDouble"
                />{/if}
            </div>
          {/each}
        </div>
      {:else if page?.type == "2+1" || page?.type == "1+1"}
        <div
          class="col-span-2 grid grid-cols-6 gap-2 border p-4 min-h-[20rem] items-center"
        >
          {#each page.secondDouble as product, index}
            <div
              class="col-span-3 grid grid-cols-3 h-28 border items-center border"
            >
              {#if products}
                <div class="col-span-2 flex px-2">
                  <Selectv2
                    bind:value={page.secondDouble[index]}
                    values={products}
                    title={"Ürün seç"}
                    valuesKey={"_id"}
                    valuesTitleKey={"no"}
                    secondTitleKey={"pageNumber"}
                    customClass={"w-full border-0 h-10"}
                  />
                </div>
              {/if}
              <div class="col-span-1 flex items-center">
                <button
                  class="h-9 w-9"
                  type="button"
                  on:click={() => deleteSecondDouble(index)}
                  ><i class="text-3xl text-red-500 bi bi-trash" />
                </button>
                <div
                  class="relative h-24 cursor-pointer"
                  on:click={changeSecondDoubleImage(page.secondDouble[index])}
                >
                  {#if page.secondDouble[index]}
                    <img
                      class="h-full"
                      src={findProductImage(page.secondDouble[index])}
                      alt="secondDouble"
                    />
                  {/if}
                  <div
                    class="{findProductImage(page.secondDouble[index]) ==
                    page.secondDoubleImage
                      ? 'absolute'
                      : 'hidden'} right-0 top-0"
                  >
                    <i class="text-green-500 bi bi-check-circle-fill" />
                  </div>
                </div>
              </div>
            </div>
          {/each}
          <div class="col-span-6 flex justify-center gap-2">
            <button
              on:click={() => {
                page.secondDouble = [...page.secondDouble, null];
              }}
              class="h-8 bg-orange-400 disabled:bg-red-300 text-white active:bg-[#6e6e85] font-bold uppercase text-xs px-4 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
            >
              Ekle
            </button>
          </div>
        </div>{/if}
    </div>
  {/if}
</div>
<div class="col-span-6 flex justify-center h-10 gap-2">
  <button
    on:click={() => {
      savePage();
    }}
    class="h-8 bg-green-400 disabled:bg-red-300 text-white active:bg-[#6e6e85] font-bold uppercase text-xs px-4 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
    type="button"
  >
    KAYDET
  </button>
</div>
