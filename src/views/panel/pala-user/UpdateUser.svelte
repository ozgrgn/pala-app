<script>
  import Alert from "$components/Alert.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Input from "$components/Form/Input.svelte";
  import PasswordInput from "$components/Form/PasswordInput.svelte";
  import PhoneInput from "$components/Form/PhoneInput.svelte";
  import Select from "$components/Form/Select.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import TextEditor from "$components/Form/TextEditor.svelte";
  import Switch from "$components/Switch.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate, useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  const deleteUserApprove = (userId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteUser(userId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();
  let memberships;
  const getMemberships = async () => {
    let response = await RestService.getMemberships(undefined, undefined);
    memberships = response["memberships"];
    console.log(memberships, "memberships");
  };
  getMemberships();
  let user;
  let langs = [];
  let dialCode;

  let values = [
    { key: "fullName", customValue: null },
    { key: "email", customValue: null },
    { key: "isActive", customValue: null },
    { key: "password", customValue: null },
    { key: "phone", customValue: null },
    { key: "membership", customValue: null },
  ];

  const updateUser = async () => {
    let editedUser = {};
    if (user.phone.value.replace(/\s/g, "").length < 10) {
      ToastService.error("Telefon numaranızı kontrol ediniz.");
      return;
    }


    values.map((v) => {
      editedUser[v.key] = user[v.key].value;
    });

    let response = await RestService.updateUser(user._id, editedUser);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/users");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getUser = async () => {
    let response = await RestService.getUser($params.userId);
    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["user"][v.key] = {
            value: response["user"][v.key][v.customValue],
          };
        } else {
          response["user"][v.key] = { value: response["user"][v.key] };
        }
      });
      user = {
        ...response["user"],
      };
      console.log(user,"usususu")


      if(!user.membership.value) {
        user.isActive.value=false
      }
      console.log(dialCode);
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getUser();

  const deleteUser = async (userId) => {
    let response = await RestService.deleteUser(userId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/users");
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
          navigate("/panel/users");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteUserApprove($params.userId)}
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
            Kullanıcı güncelle
          </h3>
          <div class="flex flex-end">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Üyelik
              </label>
              {#if memberships&&user}
                <Select
                  bind:value={user.membership.value}
                  bind:isValid={user.membership.isValid}
                  values={memberships}
                  title={"Üyelik Seçin"}
                  valuesKey={"_id"}
                  valuesTitleKey={"name"}
                  customClass={"w-full"}
                />
              {/if}
            </div>

            <div class="relative mb-3 px-10">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="rectangleBanner"
              >
                Aktif mi ?
              </label>
              {#if user}
                <Switch bind:value={user.isActive.value} disabled={!user.membership.value} />
              {/if}
            </div>
          </div>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if user}
          <div class="flex flex-wrap my-4">
            <div class="w-full lg:w-3/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Kullanıcı İsmi
                </label>
                <Input
                  bind:value={user.fullName.value}
                  bind:isValid={user.fullName.isValid}
                  placeholder={"Kullanıcı İsmi"}
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
                  Email
                </label>
                <Input
                  bind:value={user.email.value}
                  bind:isValid={user.email.isValid}
                  placeholder={"Email"}
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
                  Telefon
                </label>
                <Input
                bind:value={user.phone.value}
                bind:isValid={user.phone.isValid}
                placeholder={"Telefon"}
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
                  Şifre
                </label>
                <PasswordInput
                  bind:value={user.password.value}
                  bind:isValid={user.password.isValid}
                  placeholder={"Şifre"}
                  required={true}
                />
              </div>
            </div>
    
          </div>

          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updateUser()}
                disabled={!user.fullName.isValid}
                class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
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
