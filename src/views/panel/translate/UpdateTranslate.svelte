<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate } from "svelte-navigator";
  import { TranslateApiMessage, Translate } from "$services/language";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import { useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  import Alert from "$components/Alert.svelte";
  const deleteTranslateApprove = (translateId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteTranslate(translateId);
          }
          modal.set(null);
        },
      })
    );
  };
  const getLang = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs = response["langs"];
    console.log(langs, "langs");
  };
  getLang();
  const params = useParams();

  let translate;
  let langs = [];
  let values = [
    { key: "lang", customValue: null },
    { key: "homePage", customValue: null },
    { key: "about", customValue: null },
    { key: "treatments", customValue: null },
    { key: "contact", customValue: null },
    { key: "language", customValue: null },
    { key: "emergency_line", customValue: null },
    { key: "weekdays", customValue: null },
    { key: "weekendWorkDays", customValue: null },
    { key: "monday", customValue: null },
    { key: "tuesday", customValue: null },
    { key: "wednesday", customValue: null },
    { key: "thursday", customValue: null },
    { key: "friday", customValue: null },
    { key: "saturday", customValue: null },
    { key: "sunday", customValue: null },
    { key: "allTreatments", customValue: null },
    { key: "get_in_touch_with_us", customValue: null },
    { key: "call_us_anytime", customValue: null },
    { key: "mail_us", customValue: null },
    { key: "book_an_appointment", customValue: null },
    { key: "write_us", customValue: null },
    { key: "name", customValue: null },
    { key: "phone", customValue: null },
    { key: "mail", customValue: null },
    { key: "send", customValue: null },
    { key: "sent", customValue: null },
    { key: "phone_required", customValue: null },
    { key: "name_required", customValue: null },
    { key: "email_required", customValue: null },
    { key: "book", customValue: null },
    { key: "address", customValue: null },
    { key: "book_by_phone", customValue: null },
    { key: "note", customValue: null },
    { key: "other5", customValue: null },
  ];


  const updateTranslate = async () => {
    let editedTranslate = {};
    values.map((v) => {
      editedTranslate[v.key] = translate[v.key].value;
    });

    let response = await RestService.updateTranslate(translate._id, editedTranslate);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/translates");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getTranslate = async () => {
    let response = await RestService.getTranslate($params.translateId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["translate"][v.key] = {
            value: response["translate"][v.key][v.customValue],
          };
        } else {
          response["translate"][v.key] = { value: response["translate"][v.key] };
        }
      });
      translate = {
        ...response["translate"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getTranslate();

  const deleteTranslate = async (translateId) => {
    let response = await RestService.deleteTranslate(translateId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/translates");
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
          navigate("/panel/translates");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteTranslateApprove($params.translateId)}
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
            Translate güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if translate}
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
                bind:value={translate.lang.value}
                bind:isValid={translate.lang.isValid}
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
                AnaSayfa
              </label>
              <Input
                bind:value={translate.homePage.value}
                bind:isValid={translate.homePage.isValid}
                placeholder={"HomePage"}
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
                Hakkımızda
              </label>
              <Input
                bind:value={translate.about.value}
                bind:isValid={translate.about.isValid}
                placeholder={"About"}
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
                Tedaviler
              </label>
              <Input
                bind:value={translate.treatments.value}
                bind:isValid={translate.treatments.isValid}
                placeholder={"Treatments"}
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
                İletişim
              </label>
              <Input
                bind:value={translate.contact.value}
                bind:isValid={translate.contact.isValid}
                placeholder={"Contact"}
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
                Dil
              </label>
              <Input
                bind:value={translate.language.value}
                bind:isValid={translate.language.isValid}
                placeholder={"Language"}
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
                7/24 Acil Hat
              </label>
              <Input
                bind:value={translate.emergency_line.value}
                bind:isValid={translate.emergency_line.isValid}
                placeholder={"24/7 Emergency Phone"}
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
              H.içi Günler
              </label>
              <Input
                bind:value={translate.weekdays.value}
                bind:isValid={translate.weekdays.isValid}
                placeholder={"Monday - Friday"}
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
              H.sonu Günler
              </label>
              <Input
                bind:value={translate.weekendWorkDays.value}
                bind:isValid={translate.weekendWorkDays.isValid}
                placeholder={"Saturday"}
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
                Pazartesi
              </label>
              <Input
                bind:value={translate.monday.value}
                bind:isValid={translate.monday.isValid}
                placeholder={"Monday "}
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
                Salı
              </label>
              <Input
                bind:value={translate.tuesday.value}
                bind:isValid={translate.tuesday.isValid}
                placeholder={"Tuesday"}
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
                Çarşamba
              </label>
              <Input
                bind:value={translate.wednesday.value}
                bind:isValid={translate.wednesday.isValid}
                placeholder={"Wednesday"}
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
                Perşembe
              </label>
              <Input
                bind:value={translate.thursday.value}
                bind:isValid={translate.thursday.isValid}
                placeholder={"Thursday"}
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
                Cuma
              </label>
              <Input
                bind:value={translate.friday.value}
                bind:isValid={translate.friday.isValid}
                placeholder={"Friday"}
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
                Cumartesi
              </label>
              <Input
                bind:value={translate.saturday.value}
                bind:isValid={translate.saturday.isValid}
                placeholder={"Saturday"}
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
                Pazar
              </label>
              <Input
                bind:value={translate.sunday.value}
                bind:isValid={translate.sunday.isValid}
                placeholder={"Sunday"}
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
                Tüm Tedaviler
              </label>
              <Input
                bind:value={translate.allTreatments.value}
                bind:isValid={translate.allTreatments.isValid}
                placeholder={"All Treatments"}
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
                Bizimle İletişime Geçin
              </label>
              <Input
                bind:value={translate.get_in_touch_with_us.value}
                bind:isValid={translate.get_in_touch_with_us.isValid}
                placeholder={"Get in touch with us"}
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
                Bizi Arayın
              </label>
              <Input
                bind:value={translate.call_us_anytime.value}
                bind:isValid={translate.call_us_anytime.isValid}
                placeholder={"Call us anytime"}
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
                Mail ile ulaşın
              </label>
              <Input
                bind:value={translate.mail_us.value}
                bind:isValid={translate.mail_us.isValid}
                placeholder={"Mail us"}
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
                Randevu Oluşturun
              </label>
              <Input
                bind:value={translate.book_an_appointment.value}
                bind:isValid={translate.book_an_appointment.isValid}
                placeholder={"Book an appointment"}
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
                Bize Yazın
              </label>
              <Input
                bind:value={translate.write_us.value}
                bind:isValid={translate.write_us.isValid}
                placeholder={"Write us"}
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
                İsim
              </label>
              <Input
                bind:value={translate.name.value}
                bind:isValid={translate.name.isValid}
                placeholder={"Name"}
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
                bind:value={translate.phone.value}
                bind:isValid={translate.phone.isValid}
                placeholder={"Phone"}
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
                E-Mail
              </label>
              <Input
                bind:value={translate.mail.value}
                bind:isValid={translate.mail.isValid}
                placeholder={"E-mail"}
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
                Gönder
              </label>
              <Input
                bind:value={translate.send.value}
                bind:isValid={translate.send.isValid}
                placeholder={"Send"}
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
                  İsim Gerekli
                </label>
                <Input
                  bind:value={translate.name_required.value}
                  bind:isValid={translate.name_required.isValid}
                  placeholder={"Name required"}
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
                Telefon Gerekli
              </label>
              <Input
                bind:value={translate.phone_required.value}
                bind:isValid={translate.phone_required.isValid}
                placeholder={"Phone required"}
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
                E-mail Gerekli
              </label>
              <Input
                bind:value={translate.email_required.value}
                bind:isValid={translate.email_required.isValid}
                placeholder={"E-mail required"}
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
                Rez.
              </label>
              <Input
                bind:value={translate.book.value}
                bind:isValid={translate.book.isValid}
                placeholder={"Book"}
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
                Adres
              </label>
              <Input
                bind:value={translate.address.value}
                bind:isValid={translate.address.isValid}
                placeholder={"Address"}
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
                Telefonla Rezervasyon
              </label>
              <Input
                bind:value={translate.book_by_phone.value}
                bind:isValid={translate.book_by_phone.isValid}
                placeholder={"Book By Phone"}
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
                Not
              </label>
              <Input
                bind:value={translate.note.value}
                bind:isValid={translate.note.isValid}
                placeholder={"Note"}
                required={true}
              />
            </div>
          </div>
     
        </div>

        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={updateTranslate}
              disabled={!translate.lang.isValid
             }
              class="bg-[#6e6e85] disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
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
