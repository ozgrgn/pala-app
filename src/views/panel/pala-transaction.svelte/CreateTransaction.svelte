<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import { navigate } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Switch from "$components/Switch.svelte";
  import { DateInput } from "date-picker-svelte";
  import Transactions from "./Transactions.svelte";

  let values = [
    { key: "no", customValue: null },
    { key: "customer", customValue: null },
    { key: "date", customValue: null },
    { key: "membership", customValue: null },
    { key: "products", customValue: null },
    { key: "phase", customValue: null },
    { key: "note", customValue: null },
  ];

  let selectedProduct;
  let transaction = {};
  let salesItems = [];
  let salesItem = {};
  let products;
  let images = [];
  let memberships;
  let units;
  let customers;
  let customer;
  let phases = [
    { name: "BASKET", step: "1" },
    { name: "ORDER", step: "2" },
    { name: "PREPARED", step: "3" },
    { name: "CARGO", step: "4" },
    { name: "DELIVERED", step: "5" },
    { name: "CANCEL", step: "0" },
  ];
  export let color = "light";

  const selectCustomer = async () => {
    customer = customers.find((x) => x._id == transaction.customer.value);
    console.log(customer, "customer");
  };
  const findPrice = async () => {
    let product = products.find((x) => x._id == salesItem.product);
    let price = product.prices.find((x) => x._id == customer.membership._id);
    salesItem.productName = product.name;
    salesItem.unitPrice = price.price;
    console.log(price, "price");
  };
  const findUnit = async () => {
    let product = products.find((x) => x._id == salesItem.product);
    let unit = product.units.find((x) => x._id == salesItem.unit);
    salesItem.unitNumber = unit.number;
    salesItem.unitName = unit.name;
    console.log(unit, "unit");
  };
  const addSalesItem = async (index) => {
    salesItem.total =
      salesItem.unitPrice * salesItem.unitNumber * salesItem.number;
     salesItems = [...salesItems, salesItem]


  };
  const deleteSalesItem = async (index) => {
    console.log(index, salesItems);
    salesItems.splice(index, 1);
    salesItems = salesItems;
    console.log(salesItems);
  };
  const getCustomers = async () => {
    let response = await RestService.getCustomers(undefined, undefined);
    customers = response["customers"];
    console.log(customers, "customers");
  };
  getCustomers();
  const getProducts = async () => {
    let response = await RestService.getProducts(undefined, undefined);
    products = response["products"];
    console.log(products, "products");
  };
  getProducts();
  const getUnits = async () => {
    let response = await RestService.getUnits(undefined, undefined);
    units = response["units"];
    console.log(units, "units");
  };
  getUnits();
  values.map((v) => {
    if (v.defaultValue) {
      transaction[v.key] = { value: v.defaultValue };
    } else {
      transaction[v.key] = {};
    }
  });
  const addTransaction = async () => {
    let data = {};

    data.membership = transaction.customer.membership;
    console.log(transaction, "transactionsss");

    values.map((v) => {
      console.log(v.key, "vkey");
      if (transaction[v.key].value && v.key != "images") {
        data[v.key] = transaction[v.key]?.value;
      }
    });
    let response = await RestService.addTransaction(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/transactions");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4 ">
    <button
      class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
      type="button"
      on:click={() => {
        navigate("/panel/transactions");
      }}
    >
      <i class="fa fa-arrow-left" />
      {$Translate("Back")}
    </button>
    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="text-center flex justify-between">
          <h3 class="font-semibold text-lg text-blueGray-700">İşlem ekle</h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                İşlem Tarihi
              </label>
              <DateInput
                bind:value={transaction.date.value}
                bind:isValid={transaction.date.isValid}
                placeholder={"İşlem Tarihi"}
                required={false}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                İşlem No
              </label>
              <Input
                bind:value={transaction.no.value}
                bind:isValid={transaction.no.isValid}
                placeholder={"İşlem No"}
                required={false}
              />
            </div>
          </div>

          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Firma
              </label>
              {#if customers}
                <Select
                  bind:value={transaction.customer.value}
                  bind:isValid={transaction.customer.isValid}
                  values={customers}
                  title={"Firma Seçin"}
                  valuesKey={"_id"}
                  valuesTitleKey={"name"}
                  customClass={"w-full"}
                  change={() => selectCustomer()}
                />
              {/if}
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Durum
              </label>
              {#if phases}
                <Select
                  bind:value={transaction.phase.value}
                  bind:isValid={transaction.phase.isValid}
                  values={phases}
                  title={"Aşama Seçin"}
                  valuesKey={"step"}
                  valuesTitleKey={"name"}
                  customClass={"w-full"}
                />
              {/if}
            </div>
          </div>
        </div>
        <table
          class="items-center shadow w-full bg-white/50 border-collapse h-full"
        >
          <thead>
            <tr class="bg-gray-100">
              <th
                class="align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-red-700 text-red-200 border-red-600'}"
              >
                ÜRÜN
              </th>
              <th
                class="align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-red-700 text-red-200 border-red-600'}"
              >
                ADET
              </th>
              <th
                class="align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-red-700 text-red-200 border-red-600'}"
              >
                BİRİM
              </th>
              <th
                class="align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-red-700 text-red-200 border-red-600'}"
              >
                BİRİM FİYATI
              </th>
              <th
                class="align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-red-700 text-red-200 border-red-600'}"
              >
                TOTAL FİYATI
              </th>
              <th
                class="align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-red-700 text-red-200 border-red-600'}"
              >
                İŞLEM
              </th>
            </tr>
          </thead>
          <tbody>
            {#if products && units}
              <tr class="h-20">
                <td class="px-4">
                  <Select
                    bind:value={salesItem.product}
                    values={products}
                    title={"Ürün Seçin"}
                    valuesKey={"_id"}
                    valuesTitleKey={"name"}
                    customClass={"w-full"}
                    change={() => findPrice()}
                    disabled={!customer}
                  />
                </td>
                <td class="px-4 lg:w-24">
                  <NumberInput bind:value={salesItem.number} required={false} />
                </td>
                <td class="px-4 lg:w-32 ">
                  <Select
                    bind:value={salesItem.unit}
                    values={units}
                    title={"Birim"}
                    valuesKey={"_id"}
                    valuesTitleKey={"name"}
                    customClass={"w-full"}
                    change={() => findUnit()}
                    disabled={!salesItem.product}
                  />
                </td>
                <td class="px-4 lg:w-48">
                  <NumberInput
                    bind:value={salesItem.unitPrice}
                    required={false}
                  />
                </td>
                <td class="text-center">
                  {salesItem.unitPrice &&
                  salesItem.unitNumber &&
                  salesItem.number
                    ? salesItem.unitPrice *
                      salesItem.unitNumber *
                      salesItem.number
                    : "-"}
                </td>
                <td class="text-center">
                  <button
                    on:click={() => addSalesItem()}
                    class="bg-green-600 disabled:bg-green-400 cursor text-white active:bg-bred-400 font-bold text-xs px-2 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
                    type="button"
                    disabled={!salesItem.unitPrice &&
                      !salesItem.unitNumber &&
                      !salesItem.number}
                  >
                    <i class="bi bi-bag-check-fill text-xl" />
                  </button>
                </td>
              </tr>

              {#each salesItems as item, index}
                <tr class="h-20">
                  <td class="text-center">
                    {salesItems[index].productName}
                  </td>
                  <td class="text-center">
                    {salesItems[index].number}
                  </td>
                  <td class="text-center">
                    {salesItems[index].unitName}
                  </td>
                  <td class="text-center">
                    {salesItems[index].unitPrice}
                  </td>
                  <td class="text-center">
                    {salesItems[index].total}
                  </td>
                  <td class="text-center">
                    <button
                      on:click={() => deleteSalesItem(index)}
                      class="bg-red-600 cursor text-white active:bg-bred-400 font-bold text-xs px-2 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
                      type="button"
                    >
                      <i class="bi bi-bag-dash-fill text-xl" />
                    </button>
                  </td>
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>
        <!-- <div class="flex flex-wrap my-4 ">
          {#if salesItems}
            {#each salesItems as item, index}
              <div class="w-full lg:w-2/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-name"
                  >
                    Ürün İsmi
                  </label>
                  <Select
                    bind:value={salesItems[index].product}
                    values={products}
                    title={"Ürün Seçin"}
                    valuesKey={"_id"}
                    valuesTitleKey={"name"}
                    customClass={"w-full"}
                    change={() => findPrice(index)}
                  />
                </div>
              </div>
              <div class="w-full lg:w-3/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-name"
                  >
                    Satış Miktarı
                  </label>
                  <div class="grid grid-cols-3 gap-2">
                    <NumberInput
                      bind:value={salesItems[index].number}
                      placeholder={"Ürün"}
                      required={false}
                    />
                    <div class="col-span-2">
                      <Select
                        bind:value={salesItems[index].unit}
                        values={units}
                        title={"Birim"}
                        valuesKey={"_id"}
                        valuesTitleKey={"name"}
                        customClass={"w-full"}
                        change={() => findUnit(index)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-3/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-name"
                  >
                    Birim Fiyat
                  </label>

                  <NumberInput
                    bind:value={salesItems[index].unitPrice}
                    required={false}
                  />
                </div>
              </div>
              <div class="w-full lg:w-3/12 px-4">
                <label class="block text-blueGray-600  h-12 text-xs font-bold mb-2" for="f"></label>
                <div class="relative w-full mb-3">
               <div class="flex ">
                  <div
                    class="pr-1"
                    for="grid-name"
                  >
                    Total Fiyat: 
               </div>

                  {salesItems[index].unitPrice &&
                  salesItems[index].unitNumber &&
                  salesItems[index].number
                    ? salesItems[index].unitPrice *
                      salesItems[index].unitNumber *
                      salesItems[index].number
                    : "-"}
                </div>
              </div></div>
            {/each}
          {/if}
        </div> -->

        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={addTransaction}
              disabled={!transaction.customer.isValid ||
                transaction.customer.value == null}
              class="bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
              type="button"
            >
              {$Translate("Save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
