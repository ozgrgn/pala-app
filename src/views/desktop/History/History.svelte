<script>
  import RestService from "$services/rest";
  import { salesItems } from "$services/store";
  import moment from "moment";

  let transactions;
  let filteredTransaction;

  const getTransactionsByUserId = async () => {
    let getTransactionsByUserIdResponse =
      await RestService.getTransactionsByUserId();
    if (
      getTransactionsByUserIdResponse &&
      getTransactionsByUserIdResponse["status"]
    ) {
      transactions = getTransactionsByUserIdResponse["transactions"];
    }
  };
  getTransactionsByUserId();
  const transactionFilter = async (a) => {
    filteredTransaction = transactions.find(({ _id }) => _id == a);
  };
</script>

<div
  class="container mx-auto flex flex-col justify-center items-center my-10 text-sm"
>
  <div class="w-full lg:w-2/3 ">
    <table>
      <thead>
        <tr class="border">
          <th class="w-2/12"> Tarih </th>
          <th class="w-2/12"> No </th>
          <th class="w-3/12"> Firma </th>
          <th class="w-2/12"> Toplam </th>
          <th class="w-2/12"> Durumu </th>
          <th class="hidden md:block w-2/12 pr-2 "> Detay </th>
        </tr>
      </thead>
      <tbody>
        {#if transactions}
          {#each transactions as transaction}
            <tr class="text-center border overflow-scroll cursor-pointer" on:click={() => transactionFilter(transaction._id)}>
              <td>
                {moment(transaction.date).format("DD/MM/YYYY")}
              </td>
              <td>
                {transaction.no}
              </td>
              <td>
                {transaction.customer.name}
              </td>
              <td>
                {transaction.total} €
              </td>
              <td>
                {transaction.phase == "order"
                  ? "Sipariş"
                  : transaction.phase == "cancel"
                  ? "İptal"
                  : transaction.phase == "cargo"
                  ? "Gönderildi"
                  : transaction.phase == "prepared"
                  ? "Hazırlanıyor"
                  : transaction.phase == "delivered"
                  ? "Teslim Edildi"
                  : "-"}
              </td>
              <td
                class="flex justify-center h-full items-center pr-2 hidden md:block "
              >
                <button
                  class="border-2 border-red-500 hover:bg-red-500 px-4 my-1 text-black hover:text-white active:bg-dark-300 text-sm font-bold uppercase rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
                  type="button"
                  on:click={() => transactionFilter(transaction._id)}
                >
                  DETAY
                </button>
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  {#if filteredTransaction}
    <div class="mt-10 text-center w-full lg:w-2/3 ">
        <div class="w-full">
      <table class=" w-full">
        <thead>
          <tr>
            <tr class="border">
                <th class="w-5/12"> Ürün İsmi </th>
                <th class="w-2/12"> Birim Fiyatı </th>
                <th class="w-2/12"> Adet </th>
                <th class="w-3/12"> Toplam </th>
       
          </tr>
        </thead>
        <tbody>
          {#each filteredTransaction.salesItems as salesItem}
            <tr class="border">
              <td class="w-4/12">
                {salesItem.productName}
              </td>
              <td class="w-3/12">
                {salesItem.price} €
              </td>
              <td class="w-2/12">
                {salesItem.quantity}
              </td>

              <td class="w-3/12">
                {salesItem.total} €
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
</div>
  {/if}

</div>
