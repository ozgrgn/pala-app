<script>
  import Alert from "$components/Alert.svelte";
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
  const deleteAboutApprove = (aboutId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteAbout(aboutId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();

  let deleteImage = (index) => {
    about.images.splice(index, 1);
    about.images = about.images;
  };
  let deleteLogo = (index) => {
    about.logos.splice(index, 1);
    about.logos = about.logos;
  };
  let about;
  let langs = [];

  let values = [
    { key: "lang", customValue: null },
    { key: "about_spot", customValue: null },
    { key: "about_title", customValue: null },
    { key: "about_left", customValue: null },
    { key: "about_right", customValue: null },
  ];
  const getLang = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs = response["langs"];
    console.log(langs, "langs");
  };
  getLang();
  const updateAbout = async () => {
    let editedAbout = {};
    editedAbout.images = about.images;
    editedAbout.logos = about.logos;
    values.map((v) => {
      editedAbout[v.key] = about[v.key].value;
    });

    let response = await RestService.updateAbout(about._id, editedAbout);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/abouts");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getAbout = async () => {
    let response = await RestService.getAbout($params.aboutId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["about"][v.key] = {
            value: response["about"][v.key][v.customValue],
          };
        } else {
          response["about"][v.key] = { value: response["about"][v.key] };
        }
      });
      about = {
        ...response["about"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getAbout();

  const deleteAbout = async (aboutId) => {
    let response = await RestService.deleteAbout(aboutId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/abouts");
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
          navigate("/panel/abouts");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteAboutApprove($params.aboutId)}
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
            About güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if about}
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
                bind:value={about.lang.value}
                bind:isValid={about.lang.isValid}
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
                  Spot
                </label>
                <Input
                  bind:value={about.about_spot.value}
                  bind:isValid={about.about_spot.isValid}
                  placeholder={"Hakkımızda Spot"}
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
                  Başlık
                </label>
                <Input
                  bind:value={about.about_title.value}
                  bind:isValid={about.about_title.isValid}
                  placeholder={"Hakkımızda Başlık"}
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
                  Text Sol
                </label>

                <Textarea
                  placeholder={"Text 1"}
                  bind:value={about.about_left.value}
                  bind:incomingValue={about.about_left.value}
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Text Sağ
                </label>
                <Textarea
                  bind:value={about.about_right.value}
                  bind:incomingValue={about.about_right.value}
                  placeholder={"Text 2"}
                />
              </div>
            </div>
          </div>
          <div class="flex flex-wrap my-4">
            <div class="lg:w-6/12 px-4">
              <div class="">
                <div class=" ">
                  {#each about.images as aboutImage, index}
                    <div class="border mt-2 p-1 grid grid-flow-col">
                      <span
                        class="px-2 flex flex-col justify-center text-blueGray-600 text-xs font-bold"
                        >{index + 1}.{"Resim"}</span
                      >
                      <div class="col-span-2">
                        <ImageArray bind:value={about.images[index].image} />
                      </div>
                      <div class="flex flex-col justify-center items-end">
                        <button
                          on:click={() => deleteImage(index)}
                          class="w-14 bg-red-500 hover:bg-red-600 text-white font-bold text-xs m-2 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
                          type="button"
                        >
                          SİL
                        </button>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
              <button
                on:click={() =>
                  (about.images = [...about.images, { image: null }])}
                class=" mt-2 bg-red-400 disabled:bg-red-300 text-white active:bg-[#6e6e85] font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
              >
                Hakkımızda Resmi Ekle
              </button>
            </div>
            <div class="lg:w-6/12 px-4">
              <div class="">
                <div class=" ">
                  {#each about.logos as aboutLogo, index}
                    <div class="border mt-2 p-1 grid grid-flow-col">
                      <span
                        class="px-2 flex flex-col justify-center text-blueGray-600 text-xs font-bold"
                        >{index + 1}.{"Resim"}</span
                      >
                      <div class="col-span-2">
                        <ImageArray
                          bind:value={about.logos[index].image}
                          {index}
                        />
                      </div>
                      <div class="flex flex-col justify-center items-end">
                        <button
                          on:click={() => deleteLogo(index)}
                          class="w-14 bg-red-500 hover:bg-red-600 text-white font-bold text-xs m-2 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
                          type="button"
                        >
                          SİL
                        </button>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
              <button
                on:click={() =>
                  (about.logos = [...about.logos, { image: null }])}
                class=" mt-2 bg-red-400 disabled:bg-red-300 text-white active:bg-[#6e6e85] font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
              >
                Logo Ekle
              </button>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updateAbout()}
                disabled={!about.lang.isValid }
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
