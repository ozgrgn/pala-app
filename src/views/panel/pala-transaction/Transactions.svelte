<script>
  import RestService from "$services/rest";
  import { TranslateApiMessage, Translate } from "$services/language";
  import { navigate } from "svelte-navigator";
  import ToastService from "$services/toast";
  import Select from "$components/Form/Select.svelte";
  import { bind } from "svelte-simple-modal";
  import Alert from "$components/Alert.svelte";
  import { modal } from "$services/store";
  import moment from "moment";

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

  let transactions;
  let limit = 20;
  let skip = 0;
  let totalDataCount = 0;

  const getTransactions = async () => {
    let response = await RestService.getTransactions(limit, skip);
    transactions = response["transactions"];
    console.log(response, "transactions");
    totalDataCount = response["count"];
  };
  getTransactions();

  const deleteTransaction = async (transactionId) => {
    let response = await RestService.deleteTransaction(transactionId);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-deleted"));
      getTransactions();
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };
  const ceilAndCalculate = () => {
    if (Math.ceil(skip / limit) != Math.ceil(totalDataCount / limit) - 1) {
      skip = skip + limit;
      getTransactions();
    }
  };

  const pages = () => {
    if (totalDataCount > limit) {
      return new Array(Math.ceil(totalDataCount / limit));
    } else {
      return [1];
    }
  };

  export let color = "light";
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4 ">
    <button
      class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
      type="button"
      on:click={() => {
        navigate("/panel/create-transaction");
      }}
    >
      <i class="fa fa-plus" />
      {$Translate("Add")}
    </button>

    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-blueGray-700">Satışlar</h3>
          </div>
        </div>
      </div>
      <div class="block w-full overflow-x-auto">
        {#if transactions}
          <table class="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  No
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Tarih
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  İsim
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Üyelik
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Durum
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Tutar
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  KDV
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Toplam
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Durum
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                />
              </tr>
            </thead>
            <tbody>
              {#each transactions as transaction}
                <tr>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {transaction.no ? transaction.no : "-"}
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {moment(transaction.date).format("DD/MM/YYYY")}
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {transaction?.customer?.name
                      ? transaction?.customer?.name
                      : "-"}
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {transaction.membership?.name}
                  </td>
                  <td
                    class="uppercase border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {transaction.phase=="order"?"SİPARİŞ":transaction.phase=="prepared"?"HAZIRLANIYOR":transaction.phase=="cargo"?"YOLA ÇIKTI":transaction.phase=="delivered"?"TESLİM EDİLDİ":transaction.phase=="cancel"?"İPTAL":"-"}
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {Number(transaction?.total?.toFixed(2))} €
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {Number(transaction?.kdv?.toFixed(2))} €
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {Number(
                      Number(transaction?.total) + Number(transaction?.kdv)
                    ).toFixed(2)} €
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    <button
                      class="bg-white text-blue-600 hover:bg-[#6e6e85] hover:text-white border border-blue-600 rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
                      type="button"
                      on:click={navigate(
                        `/panel/update-transaction/${transaction._id.toString()}`
                      )}
                    >
                      {"Detay"}
                    </button>
                    <button
                      on:click={() =>
                        deleteTransactionApprove(transaction._id.toString())}
                      class="bg-white text-blue-600 hover:bg-[#6e6e85] hover:text-white border border-blue-600 rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
                      type="button"
                    >
                      {$Translate("Delete")}
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/if}
      </div>
      <hr class="my-4 md:min-w-full" />
      {#if transactions}
        <div
          class="flex flex-row flex-wrap lg:flex-nowrap w-full gap-1 justify-center lg:justify-end items-center p-3"
        >
          <Select
            bind:value={limit}
            change={() => {
              getTransactions();
            }}
            values={[
              { limit: 20 }
            ]}
            title={"Select page"}
            valuesKey={"limit"}
            valuesTitleKey={"limit"}
            customClass={"border border-blue-600 text-blue-600 py-1 w-full mx-16 lg:mx-0 lg:w-auto"}
          />

          <button
            class="bg-[#6e6e85] text-white active:bg-orange-500 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
            type="button"
            on:click={() => {
              skip != 0 ? (skip = skip - limit) : (skip = skip);
              getTransactions();
            }}
          >
            {$Translate("Prev")}
          </button>
          {#each pages() as page, i}
            <button
              class="border {skip == limit * i
                ? 'bg-[#6e6e85] text-white'
                : 'bg-white text-blue-600 border-blue-600'} font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
              class:hidden={i - skip / limit > 5 || skip / limit - i > 5}
              type="button"
              on:click={() => {
                skip = limit * i;
                getTransactions();
              }}
            >
              {i + 1}
            </button>
          {/each}

          <button
            onclick={ceilAndCalculate}
            class="bg-[#6e6e85] text-white active:bg-orange-500 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none  "
            type="button"
          >
            {$Translate("Next")}
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
