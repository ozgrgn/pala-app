<script>
    export let product
    import ProductSlider from "./ProductSlider.svelte";
</script>

<div class="w-full flex">
    <div class="lg:w-1/2">

       <ProductSlider images={product.images}></ProductSlider>
</div>
    <div class="">f</div>
</div>