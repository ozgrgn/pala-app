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
  let images = [];
  let cats;
  let brands;
  let memberships;
  let units;
  let processing=false;

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
    { key: "membership", customValue: null },
    { key: "status", customValue: null },
    { key: "isActive", customValue: false },
    { key: "images", customValue: null },
  ];

  const updateTransaction = async () => {
    let editedTransaction = {};
    editedTransaction.prices = transaction.prices;
    editedTransaction.units = transaction.units;
    values.map((v) => {
      if (v.key != "prices" && v.key != "units" && v.key != "images") {
        editedTransaction[v.key] = transaction[v.key].value;
      }
    });

    let response = await RestService.updateTransaction(transaction._id, editedTransaction);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/transactions");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getTransaction = async () => {
    processing=true
    let response = await RestService.getTransaction($params.transactionId);

    if (response["status"]) {
      console.log(response, "responseresponseresponse");
      values.map((v) => {
        if (v.customValue) {
          response["transaction"][v.key] = {
            value: response["transaction"][v.key][v.customValue],
          };
        } else if(v.key!="prices" && v.key!="units"&& v.key!="images"){
          response["transaction"][v.key] = { value: response["transaction"][v.key] };
        }
      });
    
      transaction = {
        ...response["transaction"],
      };
      getMemberships();
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
    
  };

  getTransaction();



  const getMemberships = async () => {
    let response = await RestService.getMemberships(undefined, undefined);
    memberships = response["memberships"];
    processing=false
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
          <h3 class="font-semibold text-lg text-blueGray-700">Firma/Kişi Güncelle</h3>
          <div class="relative mb-3 px-10">
            <label
              class="block  text-blueGray-600 text-xs font-bold mb-2"
              for="rectangleBanner"
            >
              Aktif mi ?
            </label>
            {#if transaction}
              <Switch bind:value={transaction.isActive.value} />
            {/if}
          </div>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if transaction}
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-2/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Müşteri No
              </label>
              <Input
                bind:value={transaction.no.value}
                bind:isValid={transaction.no.isValid}
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
                bind:value={transaction.name.value}
                bind:isValid={transaction.name.isValid}
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
                bind:value={transaction.surname.value}
                bind:isValid={transaction.surname.isValid}
                placeholder={"Soyadı"}
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
                Üyelik
              </label>
              {#if memberships}
                <Select
                  bind:value={transaction.membership.value}
                  bind:isValid={transaction.membership.isValid}
                  values={memberships}
                  title={"Üyelik Seçin"}
                  valuesKey={"_id"}
                  valuesTitleKey={"name"}
                  customClass={"w-full"}
                />
              {/if}
            </div>
          </div>
          <div class="w-full lg:w-2/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Durum
              </label>
              {#if memberships}
                <Select
                  bind:value={transaction.status.value}
                  bind:isValid={transaction.status.isValid}
                  values={memberships}
                  title={"Durum Seçin"}
                  valuesKey={"_id"}
                  valuesTitleKey={"name"}
                  customClass={"w-full"}
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
                bind:value={transaction.person.value}
                bind:isValid={transaction.person.isValid}
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
                bind:value={transaction.mobile.value}
                bind:isValid={transaction.mobile.isValid}
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
                bind:value={transaction.phone.value}
                bind:isValid={transaction.phone.isValid}
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
                bind:value={transaction.email.value}
                bind:isValid={transaction.email.isValid}
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
                bind:value={transaction.country.value}
                bind:isValid={transaction.country.isValid}
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
                bind:value={transaction.city.value}
                bind:isValid={transaction.city.isValid}
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
                bind:value={transaction.post.value}
                bind:isValid={transaction.post.isValid}
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
                bind:value={transaction.street.value}
                bind:isValid={transaction.street.isValid}
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
                bind:value={transaction.note.value}
                bind:isValid={transaction.note.isValid}
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
              class=" mt-2 bg-orange-400 disabled:bg-red-300 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
            >
              Evrak Ekle
            </button>
          </div>
        </div>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updateTransaction()}
                disabled={!transaction.name.isValid}
                class="bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
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
