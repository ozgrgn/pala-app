<script>
  import Card from "../Products-Page/Card.svelte";
    export let product
    import ProductSlider from "./ProductSlider.svelte";
</script>

<div class="w-full flex gap-10">
    <div class="lg:w-1/2 pl-10 flex justify-center items-center">

       <ProductSlider images={product.images}></ProductSlider>
</div>
    <div class="w-1/2"><Card {product} detail={true} ></Card></div>
</div>