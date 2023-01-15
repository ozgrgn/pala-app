<script>
  import Input from "$components/Form/Input.svelte";
  import PasswordInput from "$components/Form/PasswordInput.svelte";
  import PhoneInput from "$components/Form/PhoneInput.svelte";
  import { user} from "$services/store";
  import RestService from "$services/rest";

let userInfo
let dialCode
  const getUserInformation = async () => {
    let userInfoResponse = await RestService.getMe($user.userId);

    if (userInfoResponse && userInfoResponse.status) {
      userInfo = userInfoResponse["info"];
      console.log(userInfoResponse, "userinfo");
    }
  };

  getUserInformation()
</script>
<div class="container mx-auto ">
    <div class="lg:flex gap-6">
   
        <div class="w-full">
          <h1 class="text-2xl font-bold py-4">ÜYELİK BİLGİLERİNİ GÜNCELLE</h1>
          <div
            class="grid lg:grid-cols-2 content-center items-start justify-center h-full  border"
          >
            <div class="w-full px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full  rounded-lg bg-blueGray-200 border-0"
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
                      bind:value={userInfo.name.value}
                      bind:isValid={userInfo.name.isValid}
                      bind:isDirty={userInfo.name.isDirty}
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
                      Soyisim
                    </label>
  
                    <Input
                      bind:value={userInfo.surname.value}
                      bind:isValid={userInfo.isValid}
                      bind:isDirty={userInfo.surname.isDirty}
                      customClass={"text-primary placeholder:text-primary placeholder:opacity-50"}
                      placeholder="Soyadınız"
                      required={true}
                    />
                  </div>
                  <div class="relative w-full mb-3">
                    <label
                      class="block  text-blueGray-600 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Mobil Telefon
                    </label>
                    <PhoneInput
                      bind:value={userInfo.mobile.value}
                      bind:dialCode
                      bind:isValid={userInfo.mobile.isValid}
                      bind:isDirty={userInfo.mobile.isDirty}
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
                      bind:value={userInfo.email.value}
                      bind:isValid={userInfo.email.isValid}
                      bind:isDirty={userInfo.email.isDirty}
                      customClass={"text-primary placeholder:text-primary placeholder:opacity-50"}
                      placeholder="E-posta adresi"
                      required={true}
                      type={"email"}
                      name={"email"}
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
                      bind:value={userInfo.password.value}
                      bind:isValid={userInfo.password.isValid}
                      bind:isDirty={userInfo.password.isDirty}
                      name={"password"}
                      customClass={"text-primary placeholder:text-primary placeholder:opacity-50"}
                      placeholder="Şifre"
                      required={true}
                      autocomplete={"new-password"}
                    />
                  </div>
                </div>
                {/if}
              </div>
            </div>
          
          </div>
        </div>
     
    
  
    </div>
  </div>