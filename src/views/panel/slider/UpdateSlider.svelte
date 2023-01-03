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
  const deleteSliderApprove = (sliderId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteSlider(sliderId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();

  let slider;

  let values = [
    { key: "lang", customValue: null },
    { key: "title", customValue: null },
    { key: "description", customValue: null },
    { key: "backgroundBanner", customValue: null },
    { key: "order", customValue: null },
    { key: "isActive", customValue: null },
    { key: "mobileBanner", customValue: null },
  ];


  const updateSlider = async () => {
    let editedSlider = {};
    values.map((v) => {
      editedSlider[v.key] = slider[v.key].value;
    });

    let response = await RestService.updateSlider(slider._id, editedSlider);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/sliders");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getSlider = async () => {
    let response = await RestService.getSlider($params.sliderId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["slider"][v.key] = {
            value: response["slider"][v.key][v.customValue],
          };
        } else {
          response["slider"][v.key] = { value: response["slider"][v.key] };
        }
      });
      slider = {
        ...response["slider"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getSlider();

  const deleteSlider = async (sliderId) => {
    let response = await RestService.deleteSlider(sliderId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/sliders");
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
          navigate("/panel/sliders");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteSliderApprove($params.sliderId)}
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
            Slider güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if slider}
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
              bind:value={slider.lang.value}
              values={[
                { lang: "tr" },
                { lang: "en"},
                { lang: "ru" },
              ]}
              title={"Dil Seçin"}
              valuesKey={"lang"}
              valuesTitleKey={"lang"}
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
                Sıra
              </label>

              <NumberInput
                bind:value={slider.order.value}
                bind:isValid={slider.order.isValid}
                placeholder={"Sıra"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="rectangleBanner"
              >
                Aktif mi ?
              </label>

              <Switch bind:value={slider.isActive.value} />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Slider Spot
              </label>

              <Input
                bind:value={slider.title.value}
                bind:isValid={slider.title.isValid}
                placeholder={"Spot"}
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
                Slider Başlık
              </label>

              <Input
                bind:value={slider.description.value}
                bind:isValid={slider.description.isValid}
                placeholder={"Başlık"}
                required={true}
              />
            </div>
          </div>
   

          <div class="w-full lg:w-6/12 px-4">
            <div class="border relative w-full h-72 mb-3">
              <label
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for="backgroundBanner"
              >
                Arka plan banner
              </label>
              <div class="flex h-full flex-col justify-center my-2">
                <Image
                  bind:value={slider.backgroundBanner.value}
                  bind:isValid={slider.backgroundBanner.isValid}
                />
              </div>
            </div>
          </div>
   
          <div class="w-full lg:w-6/12 px-4">
            <div class="border relative w-full h-72 mb-3">
              <label
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for="rectangleBanner"
              >
                Mobile Banner
              </label>
              <div class="flex h-full flex-col justify-center my-2">
                <Image
                  bind:value={slider.mobileBanner.value}
                  bind:isValid={slider.mobileBanner.isValid}
                />
              </div>
            </div>
          </div>
   
        </div>

        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={updateSlider}
              disabled={!slider.title.isValid ||
                !slider.description.isValid ||
                !slider.order.isValid}
              class="bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
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
