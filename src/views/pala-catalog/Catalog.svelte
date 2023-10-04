<script>
  import RestService from "$services/rest";
  import PageSide from "./PageSide.svelte";

  let products;
  let limit;
  let skip;
  let isActive = true;
  let search;
  let totalDataCount;
  let pages;
  let cats;
  let a = 1;
  let chunkSize = 4;
  const printDiv = async (divName) => {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  };

  const getCats = async () => {
    let response = await RestService.getCats(undefined, undefined, true);

    if (response["status"]) {
      cats = response["cats"];
      await cats.map((cat, i) => {
        cats[i].newProducts = [];
        products.map((product, a) => {
          if (product?.cat?._id == cat._id) {
            cats[i].newProducts.push(product);
          }
        });
      });

      cats.map((cat, a) => {
        cats[a].sortedProducts = [];
        for (let i = 0; i < cat.newProducts.length; i += chunkSize) {
          const chunk = cat.newProducts.slice(i, i + chunkSize);
          cats[a].sortedProducts.push(chunk);
        }
      });
    }
  };

  const getProducts = async (search) => {
    let response = await RestService.getProducts(
      limit,
      skip,
      isActive,
      undefined,
      undefined,
      search
    );
    if (response["status"]) {
      totalDataCount = response["count"];
      products = response["products"];
      console.log(products,"products")
      await getCats();
    }
  };
  getProducts();
</script>

<div class="ml-20" />
<div id="printMe" class="w-full">
  <button
    on:click={() => {
      printDiv("printMe");
    }}>PDF YAZDIR</button
  >

  <div class="relative flex flex-wrap justify-center items-center">
    {#if cats}
      {#each cats as cat}
        <div class="col-span-2">
          {cat.name}

          {#if cat.sortedProducts}
            {#each cat.sortedProducts as productGroup, i}
              <div
                class="relative aaa grid grid-cols-2 grid-rows-2 justify-around gap-2"
              >
                {#each productGroup as product}
                  <div class=" h-[148.5mm]">
                    <div class="flex justify-center items-start h-4/5">
                      <img
                        class="h-full w-full object-contain"
                        src={product?.images[0]?.image}
                        alt=""
                      />
                    </div>
                    <div class="bg-[#fef3d0] w-full h-1/5">sdfsfsdfs</div>
                  </div>
                {/each}
              </div>
            {/each}{/if}
        </div>
      {/each}
    {/if}

    <!-- {#if products && cats}
      {#each cats as cat}
        <div class="col-span-2">
          {cat.name}
        </div>
        <div class="">
          {#each products as product, i}
           
          {/each}
        </div>
      {/each}
    {/if} -->
  </div>
</div>

<style>
  .aaa {
    width: 210mm;
    height: 297mm;
  }

  @media print {
    @page {
      size: A4;
      size: portrait;
    }
  }

  @media all {
    .page-break {
      display: none;
    }
  }

  @media print {
    .page-break {
      display: block;
      page-break-before: always;
    }
  }
  @media print {
    body {
      visibility: hidden;
    }
    #section-to-print {
      visibility: visible;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>
