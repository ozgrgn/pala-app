<script>
  import RestService from "$services/rest.js";

  import Select from "$components/Form/Select.svelte";
  import { salesItems } from "$services/store";
  import { link } from "svelte-navigator";
  import { modal,search,campaign } from "$services/store";
  import { bind } from "svelte-simple-modal";
  import Alert from "$components/Alert.svelte";
  import ToastService from "$services/toast";
  import { useParams } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import CheckBox from "$components/Form/CheckBox.svelte";
  const params = useParams();



  const approveBasket = () => {
    if (customers.length > 1 && !customerId)
    {
      ToastService.error("Hangi firma için sipariş vereceğinizi seçin");
return
    }
    console.log("çkmn");
    modal.set(
      bind(Alert, {
        message: "Sepeti Onaylamak İstiyor musunuz?",
        answer: (message) => {
          if (message) {
            approve();
          }
          modal.set(null);
        },
      })
    );
  };

  console.log($params,"şşşşşşş")
  const getCats = async () => {
    let response = await RestService.getCats(undefined, undefined, true);
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

  let cats;
  let customers;
  let customerId;
  $: total =
    $salesItems && $salesItems.length > 0
      ? $salesItems.reduce((a, b) => a + b?.total, 0)
      : 0;

  const approve = async () => {
    let approveResponse = await RestService.addTransactionByUser({
      salesItems: $salesItems,
      customerId,
      total,
    });
    if (approveResponse["status"]) {
      ToastService.success("Sepetiniz başarıyla gönderildi");
      salesItems.set(null);
      window.location.reload();
    } else {
      ToastService.error("Stoklar güncelleniyor. Lütfen tekrar deneyin.");
    }

    console.log(approveResponse, "approve response");
  };
</script>

<div class="flex flex-col gap-4">
  <div class="border p-4">
    <div class="relative">
      <Input
        bind:value={$search}
        placeholder={"Ürün Arama"}
        customClass="pl-10"
  
      />
      <div class="absolute top-2 left-2"><i class="bi bi-search" /></div>
    </div>
  </div>
  <div class="border p-4">
    <h3 class="text-lg font-bold pb-2">KATEGORİLER</h3>
    
    <div class="flex flex-col justify-center">

      <a use:link href="/store/category/all">
        <h2
          class="text-[#777] mb-1 {$params.catid == undefined
            ? 'font-semibold'
            : ''}"
        >
          Tümü
        </h2></a
      >

      {#if cats}
      
        {#each cats as cat}
          <a use:link href="/store/category/{cat._id}">
            <h2
              class="text-[#777] mb-1 {cat._id == $params.catid
                ? 'font-semibold'
                : ''}"
            >
              {cat.name}
            </h2></a
          >
        {/each}
        <div class="flex items-center pt-3">
          <input
    type="checkbox"
          on:click={campaign.set(!$campaign)} />  <h2 
          class="text-[#777] pl-1"
        >
         Kampanyalı Ürünler
        </h2>
        </div>
      {/if}
      
    </div>
  </div>
  <div class="border p-4">
    <h3 class="text-lg font-bold pb-2">SEPETİM</h3>
    {#if $salesItems && $salesItems.length > 0}
      <div class="flex flex-col gap-y-2">
        {#each $salesItems as salesItem}
          <div class="flex">
            <span class="text-sm text-[#777] truncate overflow-hidden w-3/4 ">
              {salesItem.productName}
            </span>
            <span class="text-sm text-[#777] w-1/4"
              >x {salesItem.totalNumber}</span
            >
            <!-- <button
              on:click={() => {
                deleteItemApprove();
              }}
              type="button"
            >
            <i class=" flex justify-start  hover:text-red-600 text-red-500 bi bi-bag-x-fill ease-linear transition-all duration-150"
/>
            </button> -->
          </div>
        {/each}
        <div class="flex justify-end pt-3">
          <span class="text-sm font-medium text-right text-[#777] w-2/3"
            >Total:
          </span>
          <span class="text-sm font-medium text-[#777] w-1/3 pl-1"
            >{total} €</span
          >
        </div>

        {#if customers && customers.length > 1}
          <div class="flex">
            <Select
              bind:value={customerId}
              values={customers}
              title={"Firma seçin"}
              valuesKey={"_id"}
              valuesTitleKey={"name"}
              customClass={"w-full focus:ring-0 ring-0 border-2 border-green-500"}
            />
          </div>
        {/if}

        <div class="flex">
          <button
            on:click={() => {
              approveBasket();
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
