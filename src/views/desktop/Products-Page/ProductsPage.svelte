<script>
  import { link } from "svelte-navigator";
  import { salesItems } from "$services/store";
  import RestService from "$services/rest";
  let cats;

  import { useParams } from "svelte-navigator";
  import Select from "$components/Form/Select.svelte";

  import Card from "./Card.svelte";
  import ProductsSide from "../ProductsSide.svelte";
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
    let response = await RestService.getCats(undefined, undefined,true);
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


</script>


<div class="grid grid-cols-4 mt-5 gap-4 container mx-auto">
<ProductsSide bind:cats={cats} bind:customers={customers} bind:customerId />
  <div class="col-span-3 grid grid-cols-4 gap-4">
    {#if products}
      {#each products as product}
        <Card {product} />
      {/each}
    {/if}
  </div>
</div>
