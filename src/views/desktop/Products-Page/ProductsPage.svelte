<script>
  import { link } from "svelte-navigator";
  import { membership, search, campaign } from "$services/store";
  import RestService from "$services/rest";
  import { Translate } from "$services/language";
console.log($membership,"membership")
  let cats;

  import { useParams } from "svelte-navigator";

  import Card from "./Card.svelte";
  import ProductsSide from "../ProductsSide.svelte";
  import Select from "$components/Form/Select.svelte";
  const params = useParams();
  let products=[];
  let customerId;
  let customers;
  let limit = 12;
  let skip = 0;
  let totalDataCount = 0;

  const getProducts = async (prm, search, campaign) => {
    window.scrollTo(0, 0);
    products = undefined;
    totalDataCount = undefined;

    if (prm.catid == "all") {
      prm.catid = undefined;
    }

    let response = await RestService.getProducts(
      limit,
      skip,
      true,
      prm.catid,
      undefined,
      search,
      campaign
    );
    products=[]
    products = response["products"];
    products=products.filter((product)=>product.prices.find((price)=>price._id==$membership && price.price && price.price>0 ))
    totalDataCount = response["count"];
  };
  $: getProducts($params, $search, $campaign);
  $: {
    if ($params) 
    
  {limit = 12;
    skip = 0;}
  }
  const getCats = async () => {
    let response = await RestService.getCats(undefined, undefined, true);
    cats = response["cats"];
  };
  getCats();

  const getCustomersByUserId = async () => {
    let getCustomersByUserIdResponse = await RestService.getCustomersByUserId();
    if (
      getCustomersByUserIdResponse &&
      getCustomersByUserIdResponse["status"]
    ) {
      customers = getCustomersByUserIdResponse["customers"];

      if (customers && customers.length == 1) {
        customerId = customers[0]._id;
      }
    }

  };

  getCustomersByUserId();
  const ceilAndCalculate = () => {
    if (Math.ceil(skip / limit) != Math.ceil(totalDataCount / limit) - 1) {
      skip = skip + limit;
      getProducts($params, $search, $campaign);
    }
  };
  const pages = () => {
    if (totalDataCount > limit) {
      return new Array(Math.ceil(totalDataCount / limit));
    } else {
      return [1];
    }
  };
</script>

<div
  class="md:grid  md:grid-cols-5 lg:grid-cols-4 mt-5 gap-4 container mx-auto"
>
  <div class="col-span-1 md:col-span-2 lg:col-span-1">
    <ProductsSide bind:cats bind:customers bind:customerId />
  </div>
  <div class="col-span-3">
    <div class=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {#if products && products[0]}
        {#each products as product}
          <div class="px-4 md:px-0">
            <Card bind:product />
          </div>
        {/each}
      {/if}
    </div>
    {#if products && totalDataCount}
      <div class="w-full ">
        <div
          class=" flex flex-row flex-wrap lg:flex-nowrap  gap-1 justify-center  items-center p-3"
        >
          <button
          onclick={ceilAndCalculate}
            class="bg-[#6e6e85] text-white active:bg-orange-500 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
            type="button"
            on:click={() => {
              skip != 0 ? (skip = skip - limit) : (skip = skip);
              getProducts($params, $search, $campaign);
            }}
          >
            {$Translate("Prev")}
          </button>
          {#each pages() as page, i}
            <button
              class="border {skip == limit * i
                ? 'bg-[#6e6e85] text-white'
                : 'bg-white text-blue-600 border-blue-600'} font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
              class:hidden={i - skip / limit > 5 || skip / limit - i > 5}
              type="button"
              on:click={() => {
                skip = limit * i;
                getProducts($params, $search, $campaign);
              }}
            >
              {i + 1}
            </button>
          {/each}
          <button
            onclick={ceilAndCalculate}
            class="bg-[#6e6e85] text-white active:bg-orange-500 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none  "
            type="button"
            
          >
            {$Translate("Next")}
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>
