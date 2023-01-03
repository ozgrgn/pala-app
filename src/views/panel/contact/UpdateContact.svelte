<script>
  import Alert from "$components/Alert.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate, useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  const deleteContactApprove = (contactId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteContact(contactId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();

  let deleteImage = (index) => {
    contact.images.splice(index, 1);
    contact.images = contact.images;
  };
  let deleteLogo = (index) => {
    contact.logos.splice(index, 1);
    contact.logos = contact.logos;
  };
  let contact;
  let langs = [];

  let values = [
    { key: "lang", customValue: null },
    { key: "header", customValue: null },
    { key: "text", customValue: null },
    { key: "spot", customValue: null },
    { key: "title", customValue: null },
    { key: "description", customValue: null },
  ];
  const getLang = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs = response["langs"];
    console.log(langs, "langs");
  };
  getLang();
  const updateContact = async () => {
    let editedContact = {};
    editedContact.images = contact.images;
    editedContact.logos = contact.logos;
    values.map((v) => {
      editedContact[v.key] = contact[v.key].value;
    });

    let response = await RestService.updateContact(contact._id, editedContact);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/contacts");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getContact = async () => {
    let response = await RestService.getContact($params.contactId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["contact"][v.key] = {
            value: response["contact"][v.key][v.customValue],
          };
        } else {
          response["contact"][v.key] = { value: response["contact"][v.key] };
        }
      });
      contact = {
        ...response["contact"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getContact();

  const deleteContact = async (contactId) => {
    let response = await RestService.deleteContact(contactId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/contacts");
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
          navigate("/panel/contacts");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteContactApprove($params.contactId)}
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
            Contact güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if contact}
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Dil
              </label>
              <Select
                bind:value={contact.lang.value}
                bind:isValid={contact.lang.isValid}
                values={langs}
                title={"Dil Seçin"}
                valuesKey={"lang"}
                valuesTitleKey={"title"}
                customClass={"w-full"}
              />
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
                Ana Başlık
              </label>
              <Input
                bind:value={contact.header.value}
                bind:isValid={contact.header.isValid}
                placeholder={"İletişim Ana Başlıka"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-9/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Ana Metin
              </label>
              <Input
                bind:value={contact.text.value}
                bind:isValid={contact.text.isValid}
                placeholder={"İletişim Ana Metin"}
                required={true}
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
                Spot
              </label>

              <Input
                bind:value={contact.spot.value}
                bind:isValid={contact.spot.isValid}
                placeholder={"İletişim Spot"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Başlık
              </label>

              <Input
                bind:value={contact.title.value}
                bind:isValid={contact.title.isValid}
                placeholder={"İletişim Başlık"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Açıklama
              </label>

              <Input
                bind:value={contact.description.value}
                bind:isValid={contact.description.isValid}
                placeholder={"İletişim Açıklama"}
                required={true}
              />
            </div>
          </div>
        </div>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updateContact()}
                disabled={!contact.lang.isValid }
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
