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
  const deleteCompApprove = (compId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteComp(compId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();


  let comp;
  let langs = [];

  let values = [
    { key: "name", customValue: null },
    { key: "note", customValue: null },
    { key: "isActive", customValue: null },
  ];

  const updateComp = async () => {
    let editedComp = {};

    values.map((v) => {
      editedComp[v.key] = comp[v.key].value;
    });

    let response = await RestService.updateComp(comp._id, editedComp);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/comps");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getComp = async () => {
    let response = await RestService.getComp($params.compId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["comp"][v.key] = {
            value: response["comp"][v.key][v.customValue],
          };
        } else {
          response["comp"][v.key] = { value: response["comp"][v.key] };
        }
      });
      comp = {
        ...response["comp"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getComp();

  const deleteComp = async (compId) => {
    let response = await RestService.deleteComp(compId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/comps");
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
          navigate("/panel/comps");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteCompApprove($params.compId)}
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
        {#if comp}
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                 Firma/Kişi İsmi
              </label>
              <Input
                bind:value={comp.name.value}
                bind:isValid={comp.name.isValid}
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
                bind:value={comp.note.value}
                bind:isValid={comp.note.isValid}
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

              <Switch bind:value={comp.isActive.value} />
            </div>
          </div>
  
        </div>

          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updateComp()}
                disabled={!comp.name.isValid }
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
