<script>
  import { link } from "svelte-navigator";
  import { salesItems } from "$services/store";
  import Card from "$components/Shared/Card.svelte";
  import RestService from "$services/rest";

  $: total =
    $salesItems && $salesItems.length > 0
      ? $salesItems.reduce((a, b) => a + b?.total, 0)
      : 0;

  let cats;

  import { useParams } from "svelte-navigator";
  import Select from "$components/Form/Select.svelte";
  const params = useParams();
  let products;
  let customerId;
  let customers;
  const getProducts = async () => {
    let response = await RestService.getProducts(
      undefined,
      undefined,
      true,
      $params.catid,
      undefined
    );
    products = response["products"];
    console.log(products, "pro ducts");
  };
  getProducts();

  const getCats = async () => {
    let response = await RestService.getCats(undefined, undefined);
    cats = response["cats"];
    console.log(cats, "cats");
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

    console.log(getCustomersByUserIdResponse, "getCustomersByUserIdResponse");
  };

  getCustomersByUserId();

  const addTransactionByUser = async () => {
    let addTransactionByUserResponse = await RestService.addTransactionByUser({
      salesItems: $salesItems,
      customerId,
      total,
    });

    console.log(addTransactionByUserResponse, "addTransactionByUser response");
  };
</script>

{JSON.stringify($salesItems)}
<div class="grid grid-cols-4 mt-5 gap-4 container mx-auto">
  <div class="flex flex-col gap-4">
    <div class="border p-4">
      <h3 class="text-lg font-bold pb-2">KATEGORİLER</h3>
      <div class="flex flex-col justify-center">
        {#if cats}
          {#each cats as cat}
            <a use:link href="category/{cat._id}">
              <h2 class="text-[#777] mb-1">{cat.name}</h2></a
            >
          {/each}
        {/if}
      </div>
    </div>
    <div class="border p-4">
      <h3 class="text-lg font-bold pb-2">SEPETİM</h3>
      {#if $salesItems.length > 0}
        <div class="flex flex-col gap-y-2">
          {#each $salesItems as salesItem}
            <div class="flex">
              <span class="text-sm text-[#777] truncate overflow-hidden w-3/4 ">
                {salesItem.productName}
              </span>
              <span class="text-sm text-[#777] w-1/4"
                >x {salesItem.totalNumber}</span
              >
            </div>
          {/each}
          <div class="flex justify-end pt-3">
            <span class="text-sm font-medium text-right text-[#777] w-3/4"
              >Total:
            </span>
            <span class="text-sm font-medium text-[#777] w-1/4 pl-1"
              >{total} €</span
            >
          </div>

          {#if customers && customers.length > 1}
            <div class="flex">
              <Select
                bind:value={customerId}
                values={customers}
                title={"Firma seç"}
                valuesKey={"_id"}
                valuesTitleKey={"name"}
                customClass={"w-full focus:ring-0 ring-0 border-2 border-green-500"}
              />
            </div>
          {/if}

          <div class="flex">
            <button
              on:click={() => {
                addTransactionByUser();
              }}
              class="w-full bottom-2 mb-4 border-2 border-green-500 hover:bg-green-500 px-4 py-2 text-black hover:text-white active:bg-dark-300 text-sm font-bold uppercase rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
              type="button"
            >
              ONAYLA
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
  <div class="col-span-3 grid grid-cols-4 gap-4">
    {#if products}
      {#each products as product}
        <Card {product} />
      {/each}
    {/if}
  </div>
</div>
