<script>
  import PhoneInput from "../../components/Form/PhoneInput.svelte";
  import { link, navigate } from "svelte-navigator";
  import Input from "../../components/Form/Input.svelte";
  import PasswordInput from "../../components/Form/PasswordInput.svelte";
  import { Translate, TranslateApiMessage } from "../../services/language";
  import RestService from "../../services/rest";
  import { user } from "../../services/store";
  import ToastService from "../../services/toast";
  import CountrySelect from "$components/Form/CountrySelect.svelte";
  let email = {};
  let phone = {};
  let mobile = {};
  let name = {};
  let surname = {};
  let password = {};
  let companyName = {};
  let country = {};
  let city = {};
  let post = {};
  let street = {};
  let companyId;
  let sent;
  let userId
  let editedPhone;
  let editedMobile;
  let processing;

  let emailFromInputIsValid;
  let passwordIsValid;

  
  const companyRegister = async () => {
if(!country.value) {
  ToastService.error(
        "Lütfen Ülke Girin"
      );
      return
}
      let data = {};
      (data.user = userId),
      (data.name = companyName.value),
        (data.country = country.value),
        (data.street = street.value),
        (data.post = post.value),
        (data.city = city.value),
        (data.phone = phone.value);
      let customerResponse = await RestService.addCustomer(data);
      if (customerResponse && customerResponse.status) {
        console.log(customerResponse);
 
        ToastService.success(
        "Kayıt Başarılı. Onay işleminden sonra bilgilendirileceksiniz"
      );
      sent = true;
      processing = false;
      } else {
        processing = false;
        ToastService.error($TranslateApiMessage(customerResponse.message));
      }
    };

  const register = async () => {
    processing = true;

    

    let registerResponse = await RestService.signup(
      companyId,
      name.value,
      surname.value,
      email.value,
      mobile.value,
      password.value
    );
    if (registerResponse && registerResponse.status) {
      userId=registerResponse.userId
      console.log(userId,"userId");
      if (userId) {
        companyRegister()
      }

    } else {
      processing = false;
      ToastService.error($TranslateApiMessage(registerResponse.message));
    }

  };

  // function handleKeydown(event) {
  //   if (event.code == "Enter") {
  //     if (email.isValid && step == "login_email") {
  //     }
  //   }
  // }
</script>

<div class="container mx-auto ">
  <div class="lg:flex gap-6">
    {#if !sent}
      <div class="w-full">
        <h1 class="text-2xl font-bold py-4">YENİ BAYİ KAYDI</h1>
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
              <div class="flex-auto px-4 lg:px-10 pt-10 ">
                <div class="relative w-full mb-3">
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-email"
                  >
                    İsim
                  </label>

                  <Input
                    bind:value={name.value}
                    bind:isValid={name.isValid}
                    bind:isDirty={name.isDirty}
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
                    bind:value={surname.value}
                    bind:isValid={surname.isValid}
                    bind:isDirty={surname.isDirty}
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
                  <Input
                    bind:value={mobile.value}
                    bind:isValid={mobile.isValid}
                    bind:isDirty={mobile.isDirty}
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
                    bind:value={email.value}
                    bind:isValid={email.isValid}
                    bind:isDirty={email.isDirty}
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
                    bind:value={password.value}
                    bind:isValid={password.isValid}
                    bind:isDirty={password.isDirty}
                    name={"password"}
                    customClass={"text-primary placeholder:text-primary placeholder:opacity-50"}
                    placeholder="Şifre"
                    required={true}
                    autocomplete={"new-password"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="w-full px-4">
            <div
              class="relative flex flex-col min-w-0 break-words w-full  rounded-lg bg-blueGray-200 border-0"
            >
              <div class="flex-auto px-4 lg:px-10 pt-0">
                <h3 class="font-bold text-black/80 text-md">FİRMA BİLGİLERİ</h3>
              </div>
              <div class="flex-auto px-4 lg:px-10 pt-10 ">
                <div class="relative w-full mb-3">
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-email"
                  >
                    Firma İsmi
                  </label>

                  <Input
                    bind:value={companyName.value}
                    bind:isValid={companyName.isValid}
                    bind:isDirty={companyName.isDirty}
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
                    Firma Telefon
                  </label>
                  <Input
                    bind:value={phone.value}
                    bind:isValid={phone.isValid}
                    bind:isDirty={phone.isDirty}
                    customClass={"text-primary placeholder:text-primary placeholder:opacity-50 w-full"}
                    placeholder="Telefon numaranız"
                    required={true}
                    name={"phone"}
                  />
                </div>
                <div class="flex gap-4 relative w-full mb-3">
                  <div class="w-1/2 country-select">
                    <label
                      class="block  text-blueGray-600 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Ülke
                    </label>

                    <CountrySelect
                      bind:value={country.value}
                      bind:isValid={country.isValid}
                      bind:isDirty={country.isDirty}
                      customClass={"text-primary placeholder:text-primary placeholder:opacity-50 "}
                      placeholder="Ülke"
                      required={true}
                    />
                  </div>
                  <div class="w-1/2">
                    <label
                      class="block  text-blueGray-600 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Şehir
                    </label>

                    <Input
                      bind:value={city.value}
                      bind:isValid={city.isValid}
                      bind:isDirty={city.isDirty}
                      customClass={"text-primary placeholder:text-primary placeholder:opacity-50"}
                      placeholder="Ülke"
                      required={true}
                    />
                  </div>
                </div>
                <div class="relative w-full mb-3">
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Posta Kodu
                  </label>
                  <Input
                    bind:value={post.value}
                    bind:isValid={post.isValid}
                    bind:isDirty={post.isDirty}
                    customClass={"text-primary placeholder:text-primary placeholder:opacity-50 w-full"}
                    placeholder="Posta Kodu"
                    required={true}
                    name={"post"}
                  />
                </div>
                <div class="relative w-full mb-3">
                  <label
                    class="block text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Adres
                  </label>

                  <Input
                    bind:value={street.value}
                    bind:isValid={street.isValid}
                    bind:isDirty={street.isDirty}
                    customClass={"text-primary placeholder:text-primary placeholder:opacity-50"}
                    placeholder="Adres"
                    required={true}
                    type={"text"}
                    name={"street"}
                  />
                </div>

                <div class="flex justify-start w-full mt-6">
                  <button
                    on:click|preventDefault={register}
                    class="disabled:bg-blueGray-400 bg-red-500 text-white active:bg-blueGray-600 text-sm font-bold  px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 w-fit "
                    type="button"
                  >
                    KAYIT OL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div
        class="container text-center items-center  h-screen mx-auto flex flex-col justify-center"
      >
        <img
          class="h-28 w-fit py-4 "
          src="/assets/img/logos/logo-light.png"
          alt=""
        />
        Bayi kaydınız alınmıştır.<br /> Kaydınız incelendikten sonra
        bilgilendirileceksiniz. <br /> Desteğe ihtiyacınız varsa lütfen
        <span> <a href="mailto:info@pala.com"> info@pala.com</a> </span> adresine
        iletin.
      </div>
    {/if}
  </div>
</div>
