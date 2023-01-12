<script>
  import Card from "$components/Shared/Card.svelte";
import RestService from "$services/rest";

  import { useParams } from "svelte-navigator";
  const params = useParams();
  let products;
  const getProducts = async () => {
    let response = await RestService.getProducts(
      undefined,
      undefined,
      true,
      $params.catid,
      undefined
    );
    products = response["products"];
    console.log(products, "products");
  };
  getProducts();
</script>

<div class="grid grid-cols-5 mt-5 gap-4">
  <div class="border p-4">
    <h3>Kategoriler</h3>
  </div>
  <div class="col-span-4 grid grid-cols-4 gap-4">
  {#if products}
  {#each products as product }
  
  <Card {product} />

  {/each}
  {/if}
  </div>
</div>
