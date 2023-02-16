<script>
  import Alert from "$components/Alert.svelte";
  import Date from "$components/Form/Date.svelte";
  import Input from "$components/Form/Input.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Select from "$components/Form/Select.svelte";
  import Switch from "$components/Switch.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import { modal } from "$services/store";
  import ToastService from "$services/toast";
  import { navigate, useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  import moment from "moment";

  let color = "light";
  const deleteTransactionApprove = (transactionId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteTransaction(transactionId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();

  let deleteImage = (index) => {
    transaction.images.splice(index, 1);
    transaction.images = transaction.images;
  };
  let transaction;

  let units;
  let processing = false;
  let salesItem = {};
  let salesItems = {};
  let products;

  let selectedProduct;
  let total = 0;
  let images = [];
  let memberships;
  let customers;
  let customer;

  let phases = [
    { name: "ORDER", step: "order" },
    { name: "PREPARED", step: "prepared" },
    { name: "CARGO", step: "cargo" },
    { name: "DELIVERED", step: "delivered" },
    { name: "CANCEL", step: "cancel" },
  ];

  let values = [
    { key: "no", customValue: null },
    { key: "customer", customValue: null },
    { key: "date", customValue: null },
    { key: "membership", customValue: null },
    { key: "products", customValue: null },
    { key: "phase", customValue: null },
    { key: "note", customValue: null },
    { key: "oldPhase", customValue: null },

  ];

  const updateTransaction = async () => {
    let editedTransaction = {};
    editedTransaction.prices = transaction.prices;
    editedTransaction.units = transaction.units;
    editedTransaction.oldPhase = transaction.oldPhase.value;

    values.map((v) => {
      if (v.key != "oldPhase" && v.key != "prices" && v.key != "units" && v.key != "images") {
        editedTransaction[v.key] = transaction[v.key].value;
      }
    });

    let response = await RestService.updateTransaction(
      transaction._id,
      editedTransaction
    );
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/transactions");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getTransaction = async () => {
    processing = true;
    let response = await RestService.getTransaction($params.transactionId);

    if (response["status"]) {
      console.log(response, "responseresponseresponse");
      values.map((v) => {
        if (v.customValue) {
          response["transaction"][v.key] = {
            value: response["transaction"][v.key][v.customValue],
          };
        } else if (v.key != "prices" && v.key != "units" && v.key != "images") {
          response["transaction"][v.key] = {
            value: response["transaction"][v.key],
          };
        }
       
      });

      salesItems = [...response["transaction"]["salesItems"]];

      transaction = {
        ...response["transaction"],
      };
      getMemberships();
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
    transaction.oldPhase.value=transaction.phase.value
    console.log(transaction, "transaction");
  };

  getTransaction();

  const getMemberships = async () => {
    let response = await RestService.getMemberships(undefined, undefined);
    memberships = response["memberships"];
    processing = false;
  };

  const deleteTransaction = async (transactionId) => {
    let response = await RestService.deleteTransaction(transactionId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/transactions");
    } else {
      ToastService.success("İşlem başarılı");
    }
  };

  // const findUnit = async () => {
  //   let product = products.find((x) => x._id == salesItem.product);
  //   let unit = product.units.find((x) => x._id == salesItem.unit);
  //   salesItem.unitNumber = unit.number;
  //   salesItem.unitName = unit.name;
  //   console.log(unit, "unit");
  // };

  // const findPrice = async () => {
  //   let product = products.find((x) => x._id == salesItem.product);
  //   let price = product.prices.find((x) => x._id == customer.user.membership);
  //   console.log(price);
  //   salesItem.productName = product.name;
  //   salesItem.cat = product.cat;
  //   salesItem.unitPrice = price.price;
  //   console.log(price, "price");
  // };

  const getProducts = async () => {
    let response = await RestService.getProducts(undefined, undefined);
    products = response["products"];
    console.log(products, "products");
  };
  getProducts();

  const getCustomers = async () => {
    let response = await RestService.getCustomers(undefined, undefined, true);
    customers = response["customers"];
    console.log(customers, "customers");
  };
  getCustomers();

  // const selectCustomer = async () => {
  //   customer = customers.find((x) => x._id == transaction.customer.value);
  //   console.log(customer, "customer");
  // };

  // const deleteSalesItem = async (index) => {
  //   console.log(index, salesItems);
  //   total = total - salesItems[index].total;
  //   salesItems.splice(index, 1);
  //   salesItems = salesItems;

  //   console.log(salesItems);
  // };

  // const addSalesItem = async (index) => {
  //   salesItem.total =
  //     salesItem.unitPrice *
  //     (salesItem.unitNumber ? salesItem.unitNumber : 1) *
  //     salesItem.number;
  //   salesItems = [...salesItems, salesItem];
  //   total = total + salesItem.total;

  //   salesItem = {
  //     product: null,
  //     number: 0,
  //     unit: null,
  //     unitPrice: 0,
  //     total: 0,
  //   };

  //   console.log(total, "total");
  // };

  const getUnits = async () => {
    let response = await RestService.getUnits(undefined, undefined);
    units = response["units"];
    console.log(units, "units");
  };
  getUnits();
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4 ">
    <div class="flex justify-between">
      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => {
          navigate("/panel/transactions");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteTransactionApprove($params.transactionId)}
      >
        <i class="fa fa-trash" />
        Sil
      </button>
    </div>

    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="text-center flex justify-between">
          <h3 class="font-semibold text-lg text-blueGray-700">Satış Detayı</h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if transaction}
          <div class="flex flex-wrap my-4">
            <div class="w-full lg:w-3/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  İşlem Tarihi
                </label>

                {moment(transaction.date.value).format("DD/MM/YYYY")}
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
                {transaction.customer.value.name}
              </div>
            </div>
            <div class="w-full lg:w-3/12 px-4">
              <div class="relative  w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  İşlem No
                </label>
                <div class="pl-5">
                {transaction.no.value}</div>
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
           
              </tr>
            </thead>
            <tbody>
              {#if products && units}
                <!-- <tr class="h-20">
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
                    <NumberInput
                      bind:value={salesItem.number}
                      required={false}
                    />
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
                    {salesItem.unitPrice && salesItem.number
                      ? salesItem.unitPrice *
                        (salesItem.unitNumber ? salesItem.unitNumber : 1) *
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
                </tr> -->

                {#each salesItems as item, index}
                  <tr class="h-20">
                    <td class="text-center">
                      {salesItems[index].productName}
                    </td>
                    <td class="text-center">
                      {salesItems[index].totalNumber}
                    </td>
                    <!-- <td class="text-center">
                      {salesItems[index].unit}
                    </td> -->
                    <td class="text-center">
                      {salesItems[index].price}
                    </td>
                    <td class="text-center">
                      {Number(salesItems[index].total.toFixed(2))}
                    </td>
                    <td class="text-center">
                      <!-- <button
                        on:click={() => deleteSalesItem(index)}
                        class="bg-red-600 cursor text-white active:bg-bred-400 font-bold text-xs px-2 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
                        type="button"
                      >
                        <i class="bi bi-bag-dash-fill text-xl" />
                      </button> -->
                    </td>
                  </tr>
                {/each}
              {/if}
            </tbody>
          </table>

          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updateTransaction()}
                class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
                type="button"
              >
                {$Translate("Update")}
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
