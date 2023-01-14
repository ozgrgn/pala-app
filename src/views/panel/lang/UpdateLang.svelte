<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate } from "svelte-navigator";
  import { TranslateApiMessage, Translate } from "$services/language";
  import Input from "$components/Form/Input.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Image from "$components/Form/Image.svelte";
  import Select from "$components/Form/Select.svelte";
  import Switch from "$components/Switch.svelte";
  import { useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  import Alert from "$components/Alert.svelte";
  const deleteLangApprove = (langId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteLang(langId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();

  let lang;

  let values = [
    { key: "lang", customValue: null },
    { key: "title", customValue: null },
    { key: "order", customValue: null },
    { key: "isActive", customValue: null },
  ];

  const updateLang = async () => {
    let editedLang = {};
    values.map((v) => {
      editedLang[v.key] = lang[v.key].value;
    });

    let response = await RestService.updateLang(lang._id, editedLang);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/langs");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getLang = async () => {
    let response = await RestService.getLang($params.langId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["lang"][v.key] = {
            value: response["lang"][v.key][v.customValue],
          };
        } else {
          response["lang"][v.key] = { value: response["lang"][v.key] };
        }
      });
      lang = {
        ...response["lang"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getLang();

  const deleteLang = async (langId) => {
    let response = await RestService.deleteLang(langId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/langs");
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
          navigate("/panel/langs");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteLangApprove($params.langId)}
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
            Lang güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if lang}
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Dil İsmi
              </label>
              <Input
                bind:value={lang.title.value}
                bind:isValid={lang.title.isValid}
                placeholder={"Dil İsmi"}
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
                Dil Kısaltması
              </label>
              <Input
                bind:value={lang.lang.value}
                bind:isValid={lang.lang.isValid}
                placeholder={"Dil Kısaltması"}
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
                Sıra
              </label>

              <NumberInput
                bind:value={lang.order.value}
                bind:isValid={lang.order.isValid}
                placeholder={"Sıra"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="rectangleBanner"
              >
                Aktif mi ?
              </label>

              <Switch bind:value={lang.isActive.value} />
            </div>
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={updateLang}
              disabled={!lang.title.isValid ||
                !lang.lang.isValid ||
                !lang.order.isValid}
              class="bg-[#6e6e85] disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
              type="button"
            >
              {$Translate("Save")}
            </button>
          </div>
        </div>
        {/if}
      </div>
    </div>
  </div>
</div>
