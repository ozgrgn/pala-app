<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Image from "$components/Form/Image.svelte";
  import Select from "$components/Form/Select.svelte";

  let permissionGroups;

  let values = [
    { key: "fullName", customValue: null },
    { key: "email", customValue: null },
    { key: "password", customValue: null },
    { key: "super", customValue: null },
    { key: "permissionGroup", customValue: null },
  ];

  let admin = {};

  values.map((v) => {
    if (v.defaultValue) {
      admin[v.key] = { value: v.defaultValue };
    } else {
      admin[v.key] = {};
    }
  });

  onMount(() => {
    getPermissionGroups();
  });

  const getPermissionGroups = async () => {
    let getPermissionGroupsResponse = await RestService.getPermissionGroups();

    permissionGroups = getPermissionGroupsResponse["permissionGroups"];
  };

  const addAdmin = async () => {
    let data = {};
    values.map((v) => {
      data[v.key] = admin[v.key]?.value;
    });
    let response = await RestService.addAdmin(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/admins");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4 ">
    <button
      class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
      type="button"
      on:click={() => {
        navigate("/panel/admins");
      }}
    >
      <i class="fa fa-arrow-left" />
      {$Translate("Back")}
    </button>
    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="text-center flex justify-between">
          <h3 class="font-semibold text-lg text-blueGray-700">Admin ekle</h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Admin başlığı
              </label>

              <Input
                bind:value={admin.fullName.value}
                bind:isValid={admin.fullName.isValid}
                placeholder={"Tam isim"}
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
                Admin e-posta adresi
              </label>

              <Input
                bind:value={admin.email.value}
                bind:isValid={admin.email.isValid}
                placeholder={"Mail adresi"}
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
                Admin şifresi
              </label>

              <Input
                bind:value={admin.password.value}
                bind:isValid={admin.password.isValid}
                placeholder={"Şifre"}
                required={true}
              />
            </div>
          </div>

          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for=""
              >
                Admin grubu
              </label>

              {#if permissionGroups}
                <Select
                  bind:value={admin.permissionGroup.value}
                  bind:isValid={admin.permissionGroup.isValid}
                  values={permissionGroups}
                  title={"Admin grubu seç"}
                  valuesKey={"_id"}
                  valuesTitleKey={"name"}
                  customClass={"w-full border-0"}
                />
              {/if}
            </div>
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={addAdmin}
              disabled={!admin.fullName.isValid ||
                !admin.email.isValid ||
                !admin.permissionGroup.isValid ||
                !admin.password.isValid}
              class="bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
              type="button"
            >
              {$Translate("Save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
