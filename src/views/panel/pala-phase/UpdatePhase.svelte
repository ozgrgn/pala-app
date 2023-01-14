<script>
  import Alert from "$components/Alert.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import TextEditor from "$components/Form/TextEditor.svelte";
  import Switch from "$components/Switch.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate, useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  const deletePhaseApprove = (phaseId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deletePhase(phaseId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();


  let phase;
  let langs = [];

  let values = [
    { key: "name", customValue: null },
    { key: "note", customValue: null },
    { key: "isActive", customValue: null },
  ];

  const updatePhase = async () => {
    let editedPhase = {};

    values.map((v) => {
      editedPhase[v.key] = phase[v.key].value;
    });

    let response = await RestService.updatePhase(phase._id, editedPhase);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/phases");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getPhase = async () => {
    let response = await RestService.getPhase($params.phaseId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["phase"][v.key] = {
            value: response["phase"][v.key][v.customValue],
          };
        } else {
          response["phase"][v.key] = { value: response["phase"][v.key] };
        }
      });
      phase = {
        ...response["phase"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getPhase();

  const deletePhase = async (phaseId) => {
    let response = await RestService.deletePhase(phaseId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/phases");
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
          navigate("/panel/phases");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deletePhaseApprove($params.phaseId)}
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
            Marka güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if phase}
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Marka İsmi
              </label>
              <Input
                bind:value={phase.name.value}
                bind:isValid={phase.name.isValid}
                placeholder={"Marka İsmi"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-7/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Not
              </label>
              <Textarea
                bind:value={phase.note.value}
                bind:isValid={phase.note.isValid}
                placeholder={"Marka Notu"}
                required={false}
              />
            </div>
          </div>
      
          <div class="w-full lg:w-2/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="rectangleBanner"
              >
                Aktif mi ?
              </label>

              <Switch bind:value={phase.isActive.value} />
            </div>
          </div>
  
        </div>

          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updatePhase()}
                disabled={!phase.name.isValid }
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
