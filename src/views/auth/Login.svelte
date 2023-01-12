<script>
  import { link,navigate } from "svelte-navigator";
  import Input from "../../components/Form/Input.svelte";
  import PasswordInput from "../../components/Form/PasswordInput.svelte";
  import { Translate, TranslateApiMessage } from "../../services/language";
  import RestService from "../../services/rest";
  import { user } from "../../services/store";
  import ToastService from "../../services/toast";
  let emailFromInput;
  let password;

  let emailFromInputIsValid;
  let passwordIsValid;

  const login = async () => {
    let response = await RestService.userLogin(emailFromInput, password);
    if (response && response.status) {
      console.log(response,"response")
      user.set({
        email: response.username,
        fullName: response.fullName,
        token: response.token,
        userId: response.userId,
      });
      console.log($user);
      if ($user.super) {
        navigate("/panel/dashboard");
      } else {
        navigate("/home");
      }

      ToastService.success("İşlem başarılı");
    } else {
      console.log("eerrro", response);
      ToastService.error($TranslateApiMessage(response.message));
    }
  };
</script>

<div class="container mx-auto ">
  <div class="lg:flex gap-6">
    <div class="lg:w-1/2">
      <h1 class="text-2xl font-bold py-4">GİRİŞ YAP</h1>
      <div
        class="flex content-center items-center justify-center h-full  border"
      >
        <div class="w-full px-4">
          <div
            class="relative flex flex-col min-w-0 break-words w-full  rounded-lg bg-blueGray-200 border-0"
          >
        
            <div class="flex-auto px-4 lg:px-10 pt-10 pt-0">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-email"
                >
                  {$Translate("Email")}
                </label>

                <Input
                  bind:value={emailFromInput}
                  bind:isValid={emailFromInputIsValid}
                  placeholder={$Translate("Your-email")}
                  required={true}
                  type={"email"}
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  {$Translate("Password")}
                </label>

                <PasswordInput
                  bind:value={password}
                  bind:isValid={passwordIsValid}
                  placeholder={$Translate("Your-password")}
                  required={true}
                />
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    class="form-checkbox border rounded text-blueGray-700 ml-1 w-5 h-5 "
                  />
                  <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    {$Translate("Remember-me")}
                  </span>
                </label>
              </div>

              <div class="text-center w-fit mt-6">
                <button
                  on:click|preventDefault={login}
                  disabled={!emailFromInputIsValid || !passwordIsValid
                    ? true
                    : false}
                  class="disabled:bg-blueGray-400 bg-red-500 text-white active:bg-blueGray-600 text-sm font-bold  px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full "
                  type="button"
                >
                 GİRİŞ YAP
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap my-1 px-4 relative">
            <div class="w-1/2">
              <a
                href="#pablo"
                on:click={(e) => e.preventDefault()}
                class="text-blueGray-200"
              >
                <small> {$Translate("Forgot-password")}</small>
              </a>
            </div>
            <!-- <div class="w-1/2 text-right">
            <a use:link href="/auth/register" class="text-blueGray-200">
              <small>Create new account</small>
            </a>
          </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="lg:w-1/2">
      <h1 class="text-2xl font-bold py-4">YENİ BAYİ OL</h1>
      <div
        class="flex content-center items-start justify-center h-full pt-10 border"
      >
        <div class="w-full px-4">
          <div
            class="relative flex flex-col min-w-0 break-words w-full  rounded-lg bg-blueGray-200 border-0"
          >
        
            <div class="flex-auto px-4 lg:px-10 pt-0">
              <h3 class="font-bold text-black/80 text-md"> KULLANICI OLUŞTUR</h3>
             
         <p class="pt-6 leading-7">Sign up for a free account at our store. Registration is quick and easy. It allows you to be able to order from our shop. To start shopping click register.</p>
        

           
          

              <a use:link href="/register">
                <div   class="text-center w-fit mt-6">
                <button
                  class="disabled:bg-blueGray-400 bg-red-500 text-white active:bg-blueGray-600 text-sm font-bold  px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full "
                  type="button"
                >
                 YENİ BAYİ OLUŞTUR
                </button>
              </div>
              </a>
            </div>
          </div>
       
        </div>
      </div>
    </div>
  </div>
</div>
