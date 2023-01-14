<script>
  import Alert from "$components/Alert.svelte";
  import Image from "$components/Form/Image.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import TextEditor from "$components/Form/TextEditor.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate, useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  const deleteGeneralApprove = (generalId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteGeneral(generalId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();


  let general;
  let langs = [];

  let values = [
    { key: "lang", customValue: null },
    { key: "phone1", customValue: null },
    { key: "phone2", customValue: null },
    { key: "address1", customValue: null },
    { key: "address2", customValue: null },
    { key: "email1", customValue: null },
    { key: "email2", customValue: null },
    { key: "facebook", customValue: null },
    { key: "instagram", customValue: null },
    { key: "youtube", customValue: null },
    { key: "whatsapp", customValue: null },
    { key: "copright", customValue: null },
    { key: "weekend", customValue: null },
    { key: "weekday", customValue: null },
    { key: "shortDesc", customValue: null },
    { key: "logo1", customValue: null },
    { key: "logo2", customValue: null },
    { key: "map1", customValue: null },
    { key: "map2", customValue: null },
    { key: "other1", customValue: null },
    { key: "brand", customValue: null },
  ];
  const getLang = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs = response["langs"];
    console.log(langs, "langs");
  };
  getLang();
  const updateGeneral = async () => {
    let editedGeneral = {};
    editedGeneral.images = general.images;
    editedGeneral.logos = general.logos;
    values.map((v) => {
      editedGeneral[v.key] = general[v.key].value;
    });

    let response = await RestService.updateGeneral(general._id, editedGeneral);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/generals");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getGeneral = async () => {
    let response = await RestService.getGeneral($params.generalId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["general"][v.key] = {
            value: response["general"][v.key][v.customValue],
          };
        } else {
          response["general"][v.key] = { value: response["general"][v.key] };
        }
      });
      general = {
        ...response["general"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getGeneral();

  const deleteGeneral = async (generalId) => {
    let response = await RestService.deleteGeneral(generalId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/generals");
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
          navigate("/panel/generals");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteGeneralApprove($params.generalId)}
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
            Genel Bilgiler güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if general}
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-1/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Dil
              </label>
              <Select
                bind:value={general.lang.value}
                bind:isValid={general.lang.isValid}
                values={langs}
                title={"Dil "}
                valuesKey={"lang"}
                valuesTitleKey={"title"}
                customClass={"w-full"}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Klinik İsmi
              </label>

              <Input
                bind:value={general.brand.value}
                bind:isValid={general.brand.isValid}
                placeholder={"Klinik İsmi"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Adres 1
              </label>

              <Input
                bind:value={general.address1.value}
                bind:isValid={general.address1.isValid}
                placeholder={"Adres 1"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Adres 2
              </label>

              <Input
                bind:value={general.address2.value}
                bind:isValid={general.address2.isValid}
                placeholder={"Adres 2"}
                required={true}
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
                Telefon 1
              </label>
              <Input
                bind:value={general.phone1.value}
                bind:isValid={general.phone1.isValid}
                placeholder={"Telefon 1"}
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
                Telefon 2
              </label>
              <Input
                bind:value={general.phone2.value}
                bind:isValid={general.phone2.isValid}
                placeholder={"Telefon 2"}
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
                Email 1
              </label>
              <Input
                bind:value={general.email1.value}
                bind:isValid={general.email1.isValid}
                placeholder={"Email 1"}
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
                Email 2
              </label>
              <Input
                bind:value={general.email2.value}
                bind:isValid={general.email2.isValid}
                placeholder={"Email 2"}
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
                Facebook
              </label>

              <Input
                bind:value={general.facebook.value}
                bind:isValid={general.facebook.isValid}
                placeholder={"Facebook"}
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
                Instagram
              </label>

              <Input
                bind:value={general.instagram.value}
                bind:isValid={general.instagram.isValid}
                placeholder={"Instagram"}
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
                Youtube
              </label>

              <Input
                bind:value={general.youtube.value}
                bind:isValid={general.youtube.isValid}
                placeholder={"Youtube"}
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
                Whatsapp
              </label>

              <Input
                bind:value={general.whatsapp.value}
                bind:isValid={general.whatsapp.isValid}
                placeholder={"Whatsapp"}
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
                Hafta İçi Saat
              </label>

              <Input
                bind:value={general.weekday.value}
                bind:isValid={general.weekday.isValid}
                placeholder={" Hafta İçi Saat"}
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
                Hafta Sonu Saat
              </label>

              <Input
                bind:value={general.weekend.value}
                bind:isValid={general.weekend.isValid}
                placeholder={"Hafta Sonu Saat"}
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
                Copright Yazısı
              </label>

              <Input
                bind:value={general.copright.value}
                bind:isValid={general.copright.isValid}
                placeholder={"Copright"}
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
                Kısa Açıklama
              </label>

              <Input
                bind:value={general.shortDesc.value}
                bind:isValid={general.shortDesc.isValid}
                placeholder={"Kısa Açıklama (Footer vb)"}
                required={true}
              />
            </div>
          </div>
     
          <div class="w-full lg:w-6/12 px-4">
            <div class="border relative w-full h-40 mb-3">
              <label
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for="logo1"
              >
                Logo 1
              </label>
              <div class="flex h-full flex-col justify-center my-2">
                <Image
                  bind:value={general.logo1.value}
                  bind:isValid={general.logo1.isValid}
                />
              </div>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="border relative w-full h-40 mb-3">
              <label
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for="logo2"
              >
                Logo 2
              </label>
              <div class="flex h-full flex-col justify-center my-2">
                <Image
                  bind:value={general.logo2.value}
                  bind:isValid={general.logo2.isValid}
                />
              </div>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="border relative w-full h-40 mb-3">
              <label
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for="logo1"
              >
                Map 1
              </label>
              <div class="flex h-full flex-col justify-center my-2">
                <Image
                  bind:value={general.map1.value}
                  bind:isValid={general.map1.isValid}
                />
              </div>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="border relative w-full h-40 mb-3">
              <label
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for="logo2"
              >
                Map 2
              </label>
              <div class="flex h-full flex-col justify-center my-2">
                <Image
                  bind:value={general.map2.value}
                  bind:isValid={general.map2.isValid}
                />
              </div>
            </div>
          </div>
        </div>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updateGeneral()}
                disabled={!general.lang.isValid }
                class="bg-[#6e6e85] disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
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
