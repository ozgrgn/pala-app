<script>
  import Alert from "$components/Alert.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Input from "$components/Form/Input.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Select from "$components/Form/Select.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import TextEditor from "$components/Form/TextEditor.svelte";
  import Switch from "$components/Switch.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate, useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  import { modal, panelDrawer } from "$services/store";
  import { onMount } from "svelte";
  import PasswordInput from "../../../components/Form/PasswordInput.svelte";

  let products;
  let basePriceId;
  let targetPriceId;
  let newPrices;
  let percent = 0;
  let _memberships = [];
  let pass
  onMount(() => {
    setTimeout(() => {
      panelDrawer.set(false);
    }, 50);
  });
  const sendApprove = () => {
    modal.set(
      bind(Alert, {
        message: `${
          memberships.find((item) => item._id == targetPriceId).name
        } fiyat grubundaki fiyatlar,${
          memberships.find((item) => item._id == basePriceId).name
        } fiyatlarına %${percent} eklenmiş haliyle değişecek. Onaylıyor musunuz?`,
        answer: (message) => {
          if (message) {
            send();
          }
          modal.set(null);
        },
      })
    );
  };
  $: if (targetPriceId) {
    getProducts();
  }
  const getProducts = async () => {
    let response = await RestService.getProducts();
    if (response && response["status"]) {
      products = response["products"];
    } else console.log("ürünler gelemedi");
  };
  const send = async () => {
    let response = await RestService.updatePrices(products);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const updatePrices = async () => {
    products.map((product, i) => {
      let a = product.prices.find((price) => price._id == targetPriceId);
      console.log(a, "aaaa");
      if (a) {
        console.log("no");
      } else {
        let addMembership = memberships.find(
          (membership) => membership._id == targetPriceId
        );
        products[i].prices.push({
          name: addMembership.name,
          _id: addMembership._id,
        });
        console.log(product.no, products[i].prices, "şşş");
      }
      product.prices.map((price, y) => {
        console.log(product.no, price, "----");
        if (price._id == targetPriceId) {
          console.log(product.no, price, "price");
          let basePrice = product.prices.find(
            (price) => price._id == basePriceId
          ).price
            ? product.prices.find((price) => price._id == basePriceId).price
            : 0;
          console.log(product.no, basePrice, "basePrice");
          products[i].prices[y].price = Number(
            basePrice + (basePrice * percent) / 100
          ).toFixed(2);
          products[i].prices[y].price=Number(products[i].prices[y].price)
          
          console.log(
            product.no,
            products[i].prices[y],
            products[i].prices[y].price,
            basePrice + (basePrice * percent) / 100,
            "products[i].prices[y]"
          );

          // console.log(product.no,Number(
          //   basePrice + (basePrice * percent) / 100
          // ).toFixed(2))
        }
      });
    });
    newPrices = true;
    console.log(products, "products");
  };
  let memberships;
  const getMemberships = async () => {
    let response = await RestService.getMemberships();
    memberships = response["memberships"];
    memberships.map((membership, i) => {
      memberships[i]["price"] = 0;
    });
    console.log(memberships, "bbbbb");
  };

  getMemberships();
  $: if (basePriceId) {
    console.log(basePriceId);
    _memberships = memberships.filter((item) => item._id != basePriceId);
    console.log(memberships, _memberships, " ,a_");
  }
  // const tmp = async () => {
  //   let response = await RestService.tmp();
  // }
  // tmp()
</script>
{#if pass && pass=="1453"}
<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4">
    <button
      class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
      type="button"
      on:click={() => {
        navigate("/panel/cats");
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
          <h3 class="font-semibold text-lg text-blueGray-700">
            Toplu Fiyat Güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Referans Fiyat Grubu
              </label>
              {#if memberships}
                <Select
                  bind:value={basePriceId}
                  title="Referans Fiyat Grubunu Seçin"
                  values={memberships}
                  valuesKey={"_id"}
                  valuesTitleKey={"name"}
                  customClass={"w-full bg-slate-200 h-10"}
                  disabled={newPrices}
                />
              {/if}
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Değişecek Fiyat Grubu
              </label>
              {#if memberships}
                <Select
                  bind:value={targetPriceId}
                  title="Değişecek Fiyat Grubunu Seçin"
                  values={_memberships}
                  valuesKey={"_id"}
                  valuesTitleKey={"name"}
                  customClass={"w-full bg-slate-200 h-10"}
                  disabled={newPrices}
                />
              {/if}
            </div>
          </div>
          <div class="w-full lg:w-2/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Değişim <span class="font-normal italic"></span>
              </label>
              {#if memberships}
                <NumberInput
                  bind:value={percent}
                  customClass="appearance-none h-10"
                  required={false}
                  disabled={newPrices}
                />
                <div class="absolute top-[2rem] right-2">%</div>
              {/if}
            </div>
          </div>
          <div class="w-full lg:w-2/12 px-4">
            <div class="relative w-full mb-3 py-6">
              {#if memberships}
                {#if !newPrices}
                  <button
                    on:click={() => {
                      updatePrices();
                    }}
                    class="bg-orange-500 disabled:bg-red-300 h-9 text-white active:bg-bred-400 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1"
                    disabled={!basePriceId || !targetPriceId || !percent}
                  >
                    Fiyatları Güncelle
                  </button>
                {:else}
                  <button
                    on:click={() => {
                      sendApprove();
                    }}
                    class="bg-green-500 disabled:bg-red-300 h-9 text-white active:bg-bred-400 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1"
                  >
                    Tümünü Değiştir
                  </button>
                {/if}
              {/if}
            </div>
          </div>
        </div>
        <div class="flex flex-wrap my-4">
          {#if products && basePriceId && targetPriceId}
            <table class=" items-center w-full bg-white border-collapse">
              <thead>
                <tr>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold
                bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  >
                    Resim
                  </th>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold
                  bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  >
                    No
                  </th>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold
                bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  >
                    {memberships.find(
                      (membership) => membership._id == basePriceId
                    ).name}</th
                  >
                  <th
                    class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold
              bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  >
                    {memberships.find(
                      (membership) => membership._id == targetPriceId
                    ).name}</th
                  >
                </tr>
              </thead>
              {#each products as product}
                <tr class="">
                  <td
                    class="border-t-0 border px-2 flex justify-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center font-medium"
                  >
                    {#if product.images[0]?.image}
                      <img
                        class="w-10 h-16 object-contain"
                        src={product.images[0]?.image}
                        alt=""
                      />
                    {:else}
                      <div class="h-16 flex justify-center items-center">-</div>
                    {/if}
                  </td>
                  <td
                    class="border-t-0 border px-2 align-middle text-xs whitespace-nowrap text-center font-medium {product?.isActive ==
                    false
                      ? 'text-red-500'
                      : 'text-green-700 '}">{product.no}</td
                  >

                  <td
                    class="border-t-0 border px-2 align-middle border text-xs whitespace-nowrap text-center font-semibold"
                  >
                    {product.prices.find((price) => price._id == basePriceId)
                      .price
                      ? product.prices.find((price) => price._id == basePriceId)
                          .price
                      : "-"}
                    {product.prices.find((price) => price._id == basePriceId)
                      .price
                      ? "€"
                      : ""}</td
                  >
                  <td
                    class="border-t-0 border px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center font-semibold"
                  >
                    {product.prices.find((price) => price._id == targetPriceId)
                      ?.price
                      ? product.prices.find(
                          (price) => price._id == targetPriceId
                        ).price
                      : "-"}
                    {product.prices.find((price) => price._id == targetPriceId)
                      ?.price
                      ? "€"
                      : ""}</td
                  >
                </tr>{/each}
            </table>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
{:else}
<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
  <div class="flex flex-wrap my-4">
<div class="relative w-full mb-3">
  <label
    class="block  text-blueGray-600 text-xs font-bold mb-2"
    for="grid-password"
  >
    {$Translate("Password")}
  </label>

  <Input
    bind:value={pass}
    name={"password"}

    placeholder={$Translate("Your-password")}
    required={true}
    autocomplete={"new-password"}
  />
</div>
  </div>
</div>
{/if}
