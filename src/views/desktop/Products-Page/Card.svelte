<script>
  import { link } from "svelte-navigator";
  import ToastService from "$services/toast";
  import { membership, salesItems } from "$services/store";
  import Input from "$components/Form/Input.svelte";
  import { onMount } from "svelte";
  import UnitSelect from "$components/Form/UnitSelect.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";

  export let detail;
  export let product = undefined;
  export let membershipName;
  export let unit;
  export let selectedUnit;
  let productImage;
  $: console.log(salesItem);
  let salesItem = {};
  salesItem.product = product._id;
  salesItem.productNo = product.no;
  salesItem.productName = product.name;
  salesItem.cat = product?.cat?._id;

  salesItem.quantity = 0;

  const salesItemAction = async () => {
    if (product.price < 0.00000000001) {
      ToastService.error("Bu ürünün fiyatı ile ilgili lütfen iletişim kurunuz");
      return;
    }

    // if (salesItem.quantity * selectedUnit?.number > product.stockCount) {
    //   ToastService.success("Bu ürünle ilgili stok sorunuz");
    //   salesItem.quantity = Math.floor(
    //     product.stockCount / selectedUnit?.number
    //   );
    //   console.log(salesItem.quantity, "calculated quantity");
    // }
    salesItem.total = salesItem.quantity * selectedUnit?.number * product.price;
    salesItem.price = product.price;
    salesItem.total = Number(salesItem.total.toFixed(2));
    salesItem.totalNumber = salesItem.quantity * selectedUnit?.number;
    salesItem.unit = selectedUnit?._id;
    let index = $salesItems.findIndex((x) => x.product === salesItem.product);

    if (index >= 0) {
      if (salesItem.quantity == 0) {
        {
          $salesItems.splice(index, 1);
          $salesItems = $salesItems;
        }
      } else {
        $salesItems[index] = salesItem;
      }
    } else if (salesItem.quantity != 0) {
      $salesItems = [...$salesItems, salesItem];
    }
  };

  let maxPrice = 0;
  if (product.unit) {
    findUnit(product.unit);
  }
  $: findPrices(product);

  const findUnit = async (unit) => {
    selectedUnit = product.units.find(({ _id }) => _id == unit);

    if (salesItem && salesItem.quantity) {
      salesItem.quantity = 0;
      salesItemAction();
    }
  };

  const plusItem = async () => {
    if (!selectedUnit) {
      ToastService.error("Lütfen Birim Seçiniz");
      return;
    }
    salesItem.quantity = salesItem.quantity + 1;
    salesItemAction();
  };
  const minusItem = async () => {
    if (!selectedUnit) {
      ToastService.error("Lütfen Birim Seçiniz");
      return;
    }
    if (salesItem.quantity != 0) salesItem.quantity = salesItem.quantity - 1;
    salesItemAction();
  };

  const findPrices = async () => {
    product.price = 0;
    product.maxPrice = 0;

    product.prices.map((p, index) => {
      if (p._id == $membership) {
        product.price = p.price;
        membershipName = p.name;
      }
      if (product.maxPrice < p.price) {
        product.maxPrice = p.price;
      }
    });
  };
  const findProductImage = async () => {
  productImage = undefined;
  productImage = await product.images.find((x) => x.order == 1);
  if (!productImage) {
    productImage = product.images[0];
  }
  console.log(productImage, "1");
}

findProductImage()

  let unitsMap = {};
  product?.units.map((_unit) => {
    unitsMap[_unit?._id] = _unit;
  });

  $salesItems.map((item) => {
    if (item?.product == product?._id) {
      salesItem.quantity = item?.quantity;

      unit = unitsMap[item?.unit]?._id;
      selectedUnit = product.units.find(({ _id }) => _id == unit);
    }
  });

  // product.prices.find(({_id})=>_id==$user.membership)
</script>

{#if product && product.units}
  {#if !detail}
    <div
      class="flex flex-col hover:scale-105 transition-all h-[28rem] relative rounded-md shadow"
    >
      <a
        use:link
        href="/store/product/{product._id}"
        class="bg-white border-1 border-b border-gray-300 my-4 flex justify-center items-center"
      >
        <img
          class=" h-48 w-auto object-cover rounded-t-md"
          src={productImage?.image
            ? productImage?.image
            : "/assets/img/gorsel.jpeg"}
          alt=""
        />
      </a>
      <div class=" w-full text-center xl:px-7 px-2 rounded-b-md">
        <div class="h-16">
          <h2 class="text-sm text-[#1c1e40] leading-4">
            {product.no}
          </h2>
          <h2 class="text-md text-[#1c1e40] leading-5">
            {product.name}
          </h2>
        </div>
        <div class="text-black text-sm pt-3 h-16">
          <div class="flex flex-col items-center justify-center">
            <h3
              class="{product.maxPrice > product.price
                ? ''
                : 'hidden'} line-through text-red-500 text-md"
            >
              {product.maxPrice} €
            </h3>
            <h3 class="text-lg">
              {product.maxPrice < product.price
                ? Number(product.maxPrice).toFixed(2)
                : Number(product.price).toFixed(2)} €
            </h3>
          </div>
        </div>

        <div class="mb-2">
          <UnitSelect
            bind:value={unit}
            values={product.units}
            title={"Birim"}
            valuesKey={"_id"}
            isUnit={true}
            valuesTitleKey={"name"}
            customClass={"w-full focus:ring-0 ring-0 w-28 pr-0"}
            change={() => {
              findUnit(unit);
            }}
          />
        </div>

        <div class="flex justify-center items-center">
          <button
            class=" h-7 w-7 mr-2"
            type="button"
            on:click={() => minusItem()}
            ><i
              class="text-2xl hover:text-red-600 text-red-500 bi bi-dash-circle-fill ease-linear transition-all duration-150"
            />
          </button>
          <div class="relative">
            <NumberInput
              bind:value={salesItem.quantity}
              customClass="appearance-none w-12 text-center"
              required={false}
              disabled={!unit}
              input={() => {
                salesItemAction();
              }}
            />
          </div>
          <button
            class=" h-7 w-7 ml-2"
            type="button"
            on:click={() => plusItem()}
            ><i
              class=" text-2xl hover:text-green-600 text-green-500 bi bi-plus-circle-fill ease-linear transition-all duration-150"
            />
          </button>
        </div>
      </div>
    </div>
  {:else}
    <div class="w-full h-full flex justify-center items-center">
      <div class="h-72 text-center xl:px-7 px-2 py-2 rounded-b-md">
        <div class="h-24">
          <h2 class="text-xl text-[#1c1e40] leading-5">
            {product.no}
          </h2>
          <h2 class="text-2xl text-[#1c1e40] leading-7">
            {product.name}
          </h2>
        </div>
        <div class="text-black text-md pt-3 h-16">
          <div class="flex flex-col items-center justify-center">
            <h3
              class="{product.maxPrice > product.price
                ? ''
                : 'hidden'} line-through text-red-500 text-md"
            >
              {product.maxPrice} €
            </h3>
            <h3 class="text-xl">
              {product.maxPrice < product.price
                ? product.maxPrice
                : product.price} €
            </h3>
          </div>
        </div>

        <div class="mb-2">
          <UnitSelect
            bind:value={unit}
            values={product.units}
            title={"Birim"}
            ww={"number"}
            isUnit={true}
            valuesKey={"_id"}
            valuesTitleKey={"name"}
            customClass={"w-full focus:ring-0 ring-0 text-md w-36 "}
            change={() => {
              findUnit(unit);
            }}
          />
        </div>

        <div class="flex justify-center items-center">
          <button
            class=" h-7 w-7 mr-2"
            type="button"
            on:click={() => minusItem()}
            ><i
              class="text-2xl hover:text-red-600 text-red-500 bi bi-dash-circle-fill ease-linear transition-all duration-150"
            />
          </button>
          <div class="relative">
            <Input
              bind:value={salesItem.quantity}
              customClass="appearance-none w-12 text-center"
              required={false}
              input={() => {
                salesItemAction();
              }}
            />
          </div>
          <button
            class=" h-7 w-7 ml-2"
            type="button"
            on:click={() => plusItem()}
            ><i
              class=" text-2xl hover:text-green-600 text-green-500 bi bi-plus-circle-fill ease-linear transition-all duration-150"
            />
          </button>
        </div>
      </div>
    </div>
  {/if}
{/if}
