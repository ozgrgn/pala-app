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

  let customer = {};
  let images = [];
  let users;
  let units;
  let deleteImage = (index) => {
    images.splice(index, 1);
    images = images;
  };

  values.map((v) => {
    if (v.defaultValue) {
      customer[v.key] = { value: v.defaultValue };
    } else {
      customer[v.key] = {};
    }
  });
  const getUsers = async () => {
    let response = await RestService.getUsers(undefined, undefined,true);
    users = response["users"];
    console.log(users, "users");
  };
  getUsers();

  const addCustomer = async () => {
    let data = {};
    data.images = images;
    data.units = units;
    console.log(customer, "customersss");
    console.log(images, "images");
    if (!customer.isActive.value) {
      customer.isActive.value = false;
    }
    values.map((v) => {
      console.log(v.key, "vkey");
      if (
        customer[v.key].value &&
        v.key != "images"
      ) {
        data[v.key] = customer[v.key]?.value;
      }
    });
    let response = await RestService.addCustomer(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/customers");
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
        navigate("/panel/customers");
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
          <h3 class="font-semibold text-lg text-blueGray-700">Firma ekle</h3>
          <div class="relative mb-3 px-10">
            <label
              class="block  text-blueGray-600 text-xs font-bold mb-2"
              for="rectangleBanner"
            >
              Aktif mi ?
            </label>

            <Switch bind:value={customer.isActive.value} />
          </div>
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
                Soyadı (Kişi İse)
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
              customClass={"w-full focus:ring-0 ring-0 w-24"}
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
                Yetkili İsmi (Kullanıcı Harici)
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
          <div class="w-full lg:w-2/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Ülke
              </label>
              <Input
                bind:value={customer.country.value}
                bind:isValid={customer.country.isValid}
                placeholder={"Ülke"}
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
              {#each images as Image, index}
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
              on:click={() => (images = [...images, { image: null }])}
              class=" mt-2 bg-orange-400 disabled:bg-red-300 text-white active:bg-[#6e6e85] font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
            >
              Evrak Ekle
            </button>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2 ">
            <button
              on:click={addCustomer}
              disabled={!customer.name.isValid || customer.name.value == null|| customer.user.value == null}
              class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
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
