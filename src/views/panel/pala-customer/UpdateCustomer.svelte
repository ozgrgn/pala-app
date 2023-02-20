<script>
  import Alert from "$components/Alert.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Input from "$components/Form/Input.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Select from "$components/Form/Select.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import TextEditor from "$components/Form/TextEditor.svelte";
  import Switch from "$components/Switch.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate, useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  import { modal } from "$services/store";
  import CountrySelect from "$components/Form/CountrySelect.svelte";

  const deleteCustomerApprove = (customerId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteCustomer(customerId);
          }
          modal.set(null);
        },
      })
    );
  };
  let users;
  const getUsers = async () => {
    let response = await RestService.getUsers(undefined, undefined, true);
    users = response["users"];
    console.log(users, "users");
  };
  getUsers();

  const params = useParams();

  let deleteImage = (index) => {
    customer.images.splice(index, 1);
    customer.images = customer.images;
  };
  let customer;
  let processing = false;

  let values = [
    { key: "no", customValue: null },
    { key: "name", customValue: null },
    { key: "surname", customValue: null },
    { key: "country", customValue: null },
    { key: "street", customValue: null },
    { key: "post", customValue: null },
    { key: "city", customValue: null },
    { key: "person", customValue: null },
    { key: "phone", customValue: null },
    { key: "mobile", customValue: null },
    { key: "email", customValue: null },
    { key: "note", customValue: null },
    { key: "user", customValue: null },
    { key: "status", customValue: null },
    { key: "isActive", customValue: false },
    { key: "images", customValue: null },
  ];

  const updateCustomer = async () => {
    if (!customer.country.value) {
      ToastService.error("Lütfen Ülke Girin");
      return;
    }
    let editedCustomer = {};
    editedCustomer.prices = customer.prices;
    editedCustomer.units = customer.units;
    editedCustomer.images = customer.images;
    values.map((v) => {
      if (v.key != "prices" && v.key != "units" && v.key != "images") {
        editedCustomer[v.key] = customer[v.key].value;
      }
    });

    let response = await RestService.updateCustomer(
      customer._id,
      editedCustomer
    );
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/customers");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getCustomer = async () => {
    processing = true;
    let response = await RestService.getCustomer($params.customerId);

    if (response["status"]) {
      console.log(response, "responseresponseresponse");
      values.map((v) => {
        if (v.customValue) {
          response["customer"][v.key] = {
            value: response["customer"][v.key][v.customValue],
          };
        } else if (v.key != "prices" && v.key != "units" && v.key != "images") {
          response["customer"][v.key] = { value: response["customer"][v.key] };
        }
      });

      customer = {
        ...response["customer"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getCustomer();

  const deleteCustomer = async (customerId) => {
    let response = await RestService.deleteCustomer(customerId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/customers");
    } else {
      ToastService.success("İşlem başarılı");
    }
  };
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4 ">
    <div class="flex justify-between">
      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => {
          navigate("/panel/customers");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteCustomerApprove($params.customerId)}
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
          <h3 class="font-semibold text-lg text-blueGray-700">
            Firma/Kişi Güncelle
          </h3>
          <div class="relative mb-3 px-10">
            <label
              class="block  text-blueGray-600 text-xs font-bold mb-2"
              for="rectangleBanner"
            >
              Aktif mi ?
            </label>
            {#if customer}
              <Switch bind:value={customer.isActive.value} />
            {/if}
          </div>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if customer}
          <div class="flex flex-wrap my-4">
            <div class="w-full lg:w-3/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Müşteri No
                </label>
                <Input
                  bind:value={customer.no.value}
                  bind:isValid={customer.no.isValid}
                  placeholder={"Müşteri No"}
                  required={true}
                />
              </div>
            </div>

            <div class="w-full lg:w-3/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Firma/Kişi İsmi
                </label>
                <Input
                  bind:value={customer.name.value}
                  bind:isValid={customer.name.isValid}
                  placeholder={"Firma/Kişi İsmi"}
                  required={true}
                />
              </div>
            </div>

            <div class="w-full lg:w-3/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Soyadı
                </label>
                <Input
                  bind:value={customer.surname.value}
                  bind:isValid={customer.surname.isValid}
                  placeholder={"Soyadı"}
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
                  Kullanıcı Seçin
                </label>
                {#if users}
                  <Select
                    bind:value={customer.user.value}
                    values={users}
                    title={"Kullanıcılar"}
                    valuesKey={"_id"}
                    valuesTitleKey={"fullName"}
                    customClass={"w-full focus:ring-0 ring-0 "}
                  />
                {/if}
              </div>
            </div>
          </div>
          <div class="flex flex-wrap my-4">
            <div class="w-full lg:w-3/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Yetkili İsmi
                </label>
                <Input
                  bind:value={customer.person.value}
                  bind:isValid={customer.person.isValid}
                  placeholder={"Yetkili Kişi"}
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
                  Mobil Telefon
                </label>
                <Input
                  bind:value={customer.mobile.value}
                  bind:isValid={customer.mobile.isValid}
                  placeholder={"Mobil Telefon"}
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
                  Firma Telefon
                </label>
                <Input
                  bind:value={customer.phone.value}
                  bind:isValid={customer.phone.isValid}
                  placeholder={"Firma Telefon"}
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
                  E-mail
                </label>
                <Input
                  bind:value={customer.email.value}
                  bind:isValid={customer.email.isValid}
                  placeholder={"E-mail"}
                  required={false}
                />
              </div>
            </div>
          </div>
          <div class="flex flex-wrap my-4">
            <div class="w-full lg:w-2/12 country-select px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Ülke
                </label>
                <CountrySelect
                bind:value={customer.country.value}
                bind:isValid={customer.country.isValid}
                bind:isDirty={customer.country.isDirty}
                customClass={"text-primary placeholder:text-primary placeholder:opacity-50 "}
                placeholder="Ülke"
                required={true}
              />
               
              </div>
            </div>
            <div class="w-full lg:w-2/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Şehir
                </label>
                <Input
                  bind:value={customer.city.value}
                  bind:isValid={customer.city.isValid}
                  placeholder={"Şehir"}
                  required={false}
                />
              </div>
            </div>
            <div class="w-full lg:w-2/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Posta Kodu
                </label>
                <Input
                  bind:value={customer.post.value}
                  bind:isValid={customer.post.isValid}
                  placeholder={"Posta Kodu"}
                  required={false}
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Adres
                </label>
                <Input
                  bind:value={customer.street.value}
                  bind:isValid={customer.street.isValid}
                  placeholder={"Adres"}
                  required={false}
                />
              </div>
            </div>
          </div>
          <div class="flex flex-wrap my-4">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Not
                </label>
                <Textarea
                  bind:value={customer.note.value}
                  bind:isValid={customer.note.isValid}
                  placeholder={"Not"}
                  required={false}
                />
              </div>
            </div>
            <div class="lg:w-6/12 px-4 ">
              <div class="">
                <label
                  class="block  text-blueGray-600 text-xs font-bold"
                  for="grid-name"
                >
                  Evrak
                </label>
                {#each customer.images as Image, index}
                  <div class="border mt-2 p-1 grid grid-flow-col">
                    <span
                      class="px-2 flex flex-col justify-center text-blueGray-600 text-xs font-bold"
                      >{"Resim"}</span
                    >
                    <div class="col-span-2">
                      <ImageArray bind:value={Image.image} />
                    </div>
                    <div class="flex justify-end ">
                      <button
                        on:click={() => deleteImage(index)}
                        class="w-14 bg-red-500 hover:bg-red-600 text-white font-bold text-xs my-2 ml-4 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
                        type="button"
                      >
                        SİL
                      </button>
                    </div>
                  </div>
                {/each}
              </div>
              <button
                on:click={() =>
                  (customer.images = [...customer.images, { image: null }])}
                class=" mt-2 bg-orange-400 disabled:bg-red-300 text-white active:bg-[#6e6e85] font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
              >
                Evrak Ekle
              </button>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updateCustomer()}
                disabled={!customer.name.isValid}
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
