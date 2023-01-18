<script>
  import Input from "$components/Form/Input.svelte";
  import PasswordInput from "$components/Form/PasswordInput.svelte";
  import { user} from "$services/store";
  import RestService from "$services/rest";
  import { Translate, TranslateApiMessage } from "$services/language";
  import ToastService from "$services/toast";
  import { navigate } from "svelte-navigator";


let userInfo
let dialCode
  const getUserInformation = async () => {
    let userInfoResponse = await RestService.getMe($user.userId);

    if (userInfoResponse && userInfoResponse.status) {
      userInfo = userInfoResponse["_doc"];
      console.log(userInfo, "userinfo");
    }
  };

  getUserInformation()

  const updateUser = async () => {
    userInfo
    if (userInfo.phone.replace(/\s/g, "").length < 10) {
      ToastService.error("Telefon numaranızı kontrol ediniz.");
      return;
    }
    let response = await RestService.updateUser($user.userId, userInfo);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/store");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  }
</script>
<div class="container flex justify-center mx-auto ">
    <div class="lg:flex gap-6">
   
        <div class="w-full">
          <h1 class="text-xl font-bold py-4">ÜYELİK BİLGİLERİNİ GÜNCELLE</h1>
          <div
            class="grid lg:grid-cols-1 content-center items-start justify-center h-full  border"
          >
            <div class="w-full px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full rounded-lg bg-blueGray-200 border-0"
              >
                <div class="flex-auto px-4 lg:px-10 pt-0">
                  <h3 class="font-bold text-black/80 text-md">
                    KULLANICI BİLGİLERİ
                  </h3>
                </div>
                {#if userInfo}
                <div class="flex-auto px-4 lg:px-10 pt-10 ">
                  <div class="relative w-full mb-3">
                    <label
                      class="block  text-blueGray-600 text-xs font-bold mb-2"
                      for="grid-email"
                    >
                      İsim
                    </label>
  
                    <Input
                      bind:value={userInfo.fullName}
                      customClass={"text-primary placeholder:text-primary placeholder:opacity-50"}
                      placeholder="Adınız"
                      required={true}
                    />
                  </div>
  
                  <div class="relative w-full mb-3">
                    <label
                      class="block  text-blueGray-600 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                       Telefon
                    </label>
                    <Input
                      bind:value={userInfo.phone}
                      bind:dialCode
                      customClass={"text-primary placeholder:text-primary placeholder:opacity-50 w-full"}
                      placeholder="Yetkili Mobil Telefon"
                      required={true}
                      name={"mobile"}
                    />
                  </div>
                  <div class="relative w-full mb-3">
                    <label
                      class="block  text-blueGray-600 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      E-posta
                    </label>
  
                    <Input
                      bind:value={userInfo.email}
                      customClass={"text-primary placeholder:text-primary placeholder:opacity-50"}
                      placeholder="E-posta adresi"
                      required={true}
                      type={"email"}
                      name={"email"}
                      disabled
                    />
                  </div>
  
                  <div class="relative w-full mb-3">
                    <label
                      class="block  text-blueGray-600 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Şifre
                    </label>
                    <PasswordInput
                      bind:value={userInfo.password}
                      name={"password"}
                      customClass={"text-primary placeholder:text-primary placeholder:opacity-50"}
                      placeholder="Şifre"
                      required={true}
                      autocomplete={"new-password"}
                    />
                  </div>
                </div>

                <div class="flex flex-wrap">
                  <div class="w-full lg:w-12/12 px-4 text-right mt-5">
                    <button
                      on:click={() => updateUser()}
                      disabled={!userInfo.fullName}
                      class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
                      type="button"
                    >
                      Güncelle
                    </button>
                  </div>
                </div>
                {/if}
              </div>
            </div>
          
          </div>
        </div>
     
    
  
    </div>
  </div>