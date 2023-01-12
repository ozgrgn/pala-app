<script>
  import { translate } from "$services/store";


  export let product;
</script>

<div class="flex flex-col relative rounded-md">
  <div class="bg-white border-1 border-b border-gray-300  my-4 flex justify-center items-center ">
  <img class="object-fit h-40 w-fit rounded-t-md " src={product?.images[0]?.image} alt="" />
</div>
  <div class="h-40 w-full text-center  xl:px-7 px-2 rounded-b-md">
    <h2 class="text-sm text-[#1c1e40] leading-4 ">
      {product.no}
    </h2>
    <h2 class="xl:text-xl lg:text-lg text-xl text-[#1c1e40] leading-5 ">
      {product.brand.name} {product.name}
    </h2>
    <p class="text-white text-sm pt-3">
      {product.price}
    </p>
    <div class="flex justify-center">
    <button
    class="absolute h-8 bottom-2 bg-red-500 drop-shadow shadow-2xl text-white active:bg-dark-300 text-xs font-bold uppercase px-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    type="button"
  >
  sdv
  </button>
</div>
  </div>
</div>
