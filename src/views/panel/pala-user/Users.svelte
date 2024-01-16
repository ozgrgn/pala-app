<script>
  import RestService from "$services/rest";
  import { TranslateApiMessage, Translate } from "$services/language";
  import { navigate } from "svelte-navigator";
  import ToastService from "$services/toast";
  import Select from "$components/Form/Select.svelte";
  import { bind } from "svelte-simple-modal";
  import Alert from "$components/Alert.svelte";
  import { modal } from "$services/store";
  import Input from "$components/Form/Input.svelte";

  const deleteUserApprove = (userId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteUser(userId);
          }
          modal.set(null);
        },
      })
    );
  };

  let users;
  let limit = 20;
  let skip = 0;
  let totalDataCount = 0;
  let isActive;
  let customers;
let search;
  const getUsers = async (search) => {
    console.log(isActive, "getusers active");
    let response = await RestService.getUsers(limit, skip, isActive,search);

    users = response["users"];
    console.log(users, "users");
    totalDataCount = response["count"];
  };
 $: getUsers(search);
  const getCustomers = async () => {
    let response = await RestService.getCustomers(
      99999999999,
      0,
      undefined,
      undefined
    );
    customers = response["customers"];
    console.log(customers, "customers");
  };
  getCustomers();
  const deleteUser = async (userId) => {
    let response = await RestService.deleteUser(userId);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-deleted"));
      getUsers();
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };
  const ceilAndCalculate = () => {
    if (Math.ceil(skip / limit) != Math.ceil(totalDataCount / limit) - 1) {
      skip = skip + limit;
      getUsers();
    }
  };

  const pages = () => {
    if (totalDataCount > limit) {
      return new Array(Math.ceil(totalDataCount / limit));
    } else {
      return [1];
    }
  };
  const getCustomersCountry = (user) => {
    let a
    customers.map((customer,index)=>{
      if(customer && customer.user && customer.user._id==user) {
        console.log(customer.user._id)
        a= customer.country
      }
   
    })
    return a
    // let customer
    // customer = customers?.find(x => x.user._id == user);

    // if (customer && customer.country) return customer.country;
    // else return false;
  };

  export let color = "light";
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4 pt-10">
    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <div class="flex justify-between">

            <h3 class="font-semibold text-lg text-blueGray-700">
              Kullanıcılar
            </h3>
            <div class="relative">
              <Input
                bind:value={search}
                placeholder={"Kullanıcı/Email Arama"}
                customClass="pl-10 border-2"
              />
              <div class="absolute top-2 left-2">
                <i class="bi bi-search" />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div class="block w-full overflow-x-auto">
        {#if users && customers}
          <table class="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Ad Soyad
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Ülke
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Email
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Telefon
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
                  <Select
                    bind:value={isActive}
                    change={() => {
                      getUsers(isActive);
                    }}
                    values={[
                      { key: undefined, name: "Tümü" },
                      { key: true, name: "Active" },
                      { key: false, name: "Passive" },
                    ]}
                    title={"Durum"}
                    valuesKey={"key"}
                    valuesTitleKey={"name"}
                    customClass={"border border-blue-600  py-1 w-full mx-16 lg:mx-0 lg:w-auto"}
                  />
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
              {#if users}
                {#each users as user}
                  <tr>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                    >
                      {user.fullName}
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs uppercase whitespace-nowrap p-4 text-center"
                    >
                      {getCustomersCountry(user._id)
                        ? getCustomersCountry(user._id)
                        : "-"}
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                    >
                      {user.email}
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                    >
                      {user.phone}
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                    >
                      {user.membership?.name ? user.membership?.name : "-"}
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                    >
                      <button
                        class="{user.isActive
                          ? 'bg-green-500'
                          : 'bg-red-500'} bg-green-500 p-2 rounded text-white font-semibold cursor-default"
                      >
                        {user.isActive ? "Aktif" : "Pasif"}
                      </button>
                    </td>

                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                    >
                      <button
                        class="bg-white text-blue-600 hover:bg-[#6e6e85] hover:text-white border border-blue-600 rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
                        type="button"
                        on:click={navigate(
                          `/panel/update-user/${user._id.toString()}`
                        )}
                      >
                        {$Translate("Edit")}
                      </button>
                      <button
                        on:click={() => deleteUserApprove(user._id.toString())}
                        class="bg-white text-blue-600 hover:bg-[#6e6e85] hover:text-white border border-blue-600 rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
                        type="button"
                      >
                        {$Translate("Delete")}
                      </button>
                    </td>
                  </tr>
                {/each}
              {/if}
            </tbody>
          </table>
        {/if}
      </div>
      <hr class="my-4 md:min-w-full" />
      {#if users}
        <div
          class="flex flex-row flex-wrap lg:flex-nowrap w-full gap-1 justify-center lg:justify-end items-center p-3"
        >
          <Select
            bind:value={limit}
            change={() => {
              getUsers();
            }}
            values={[{ limit: 20 }]}
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
              getUsers();
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
                getUsers();
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
