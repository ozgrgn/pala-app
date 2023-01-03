<script>
  import Alert from "$components/Alert.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate, useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  const deleteTreatmentPageApprove = (treatmentPageId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteTreatmentPage(treatmentPageId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();

  console.log($params,"paramparaa")


  let treatmentPage;
  let langs = [];

  let values = [
    { key: "lang", customValue: null },
    { key: "header", customValue: null },
    { key: "text", customValue: null },
  ];
  const getLang = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs = response["langs"];
    console.log(langs, "langs");
  };
  getLang();
  const updateTreatmentPage = async () => {
    let editedTreatmentPage = {};
    editedTreatmentPage.images = treatmentPage.images;
    editedTreatmentPage.logos = treatmentPage.logos;
    values.map((v) => {
      editedTreatmentPage[v.key] = treatmentPage[v.key].value;
    });

    let response = await RestService.updateTreatmentPage(treatmentPage._id, editedTreatmentPage);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/treatmentpages");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getTreatmentPage = async () => {
    let response = await RestService.getTreatmentPage($params.treatments_pageId);
console.log(response,"sfsffs")
    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["treatmentPage"][v.key] = {
            value: response["treatmentPage"][v.key][v.customValue],
          };
        } else {
          response["treatmentPage"][v.key] = { value: response["treatmentPage"][v.key] };
        }
      });
      treatmentPage = {
        ...response["treatmentPage"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getTreatmentPage();

  const deleteTreatmentPage = async (treatmentPageId) => {
    let response = await RestService.deleteTreatmentPage(treatmentPageId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/treatmentpages");
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
          navigate("/panel/treatmentpages");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteTreatmentPageApprove($params.treatmentPageId)}
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
            Tedavi sayfası güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if treatmentPage}
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
                bind:value={treatmentPage.lang.value}
                bind:isValid={treatmentPage.lang.isValid}
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
                Başlık
              </label>
              <Input
                bind:value={treatmentPage.header.value}
                bind:isValid={treatmentPage.header.isValid}
                placeholder={"Tedavi Sayfası Başlık"}
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
                Metin
              </label>
              <Textarea
                bind:value={treatmentPage.text.value}
                bind:isValid={treatmentPage.text.isValid}
                placeholder={"Tedavi Sayfası Metin"}
                required={true}
              />
            </div>
          </div>
        </div>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updateTreatmentPage()}
                disabled={!treatmentPage.lang.isValid }
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
