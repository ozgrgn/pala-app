<script>
  import { link } from "svelte-navigator";
  import { salesItems } from "$services/store";
  import RestService from "$services/rest";


  let cats;

  import { useParams } from "svelte-navigator";
  import Select from "$components/Form/Select.svelte";
  import ProductsSide from "../ProductsSide.svelte";
  import Card from "../Products-Page/Card.svelte";
  import ProductDetail from "./ProductDetail.svelte";
  const params = useParams();
  let product;
  let customerId;
  let customers;
  const getProductById = async () => {
    let response = await RestService.getProductById($params.productid);
    product = response["product"];
    console.log(product, "product");
  }
  getProductById()

</script>


<div class="grid grid-cols-4 mt-5 gap-4 container mx-auto">
<ProductsSide />
  <div class="col-span-3 ">
    {#if product}

        <ProductDetail {product} />

    {/if}
  </div>
</div>
