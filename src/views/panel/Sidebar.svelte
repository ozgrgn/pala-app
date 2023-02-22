<script>
  import {
    panelDrawer,
    user,
  } from "$services/store";
  import SideMenuButton from "./SideMenuButton.svelte";

  let innerWidth;
  let oldInnerWidth;
  $: {
    if (oldInnerWidth != innerWidth) {
      if (innerWidth < 800 && $panelDrawer) {
        panelDrawer.set(false);
      }
      if (innerWidth > 800 && !$panelDrawer) {
        panelDrawer.set(true);
      }
    }
    oldInnerWidth = innerWidth;
  }
</script>



<svelte:window bind:innerWidth />
<div
  class="fixed transition-all z-[99999] 
  {!$panelDrawer ? 'w-0 hidden' : ''}
  {$panelDrawer  ? 'w-[18rem]' : ''}
  bg-[#f6f8fa] h-screen flex flex-row z-[100]"
>
  <div class="w-[18rem] shadow-lg" >
    <div class="py-2 flex justify-center">
      <img class=" h-20" src="/assets/img/logos/logo-light.png" alt="" />

    </div>

    <div class="grid grid-cols-3 w-full mb-4 px-1 gap-2">

    </div>

    <div class="overflow-y-auto h-[calc(100%-9.75rem)] px-4">
      <div class="rounded bg-neutral p-2 flex flex-col gap-1 mb-2">
        <h2 class="text-black text-bold border-b text-md py-1">KULLANICILAR</h2>

        <SideMenuButton
          icon={"bi bi-person"}
          title={"Kullanıcılar"}
          href={"/panel/users"}
        />

        <SideMenuButton
        icon={"bi bi-shop-window"}
          title={"Firmalar"}
          href={"/panel/customers"}
        />

      </div>
      <div class="rounded bg-neutral p-2 flex flex-col gap-1 mb-2">
        <h2 class="text-black text-bold border-b text-md py-1">TANIMLAMALAR</h2>

        <SideMenuButton
          icon={"bi bi-tag"}
          title={"Kategoriler"}
          href={"/panel/cats"}
        />
        <SideMenuButton
        icon={"bi bi-bag-heart"}
        title={"Üyelikler"}
        href={"/panel/memberships"}
      />

        <SideMenuButton
        icon={"bi bi-award"}
          title={"Markalar"}
          href={"/panel/brands"}
        />

        <SideMenuButton
        icon={"bi bi-calculator"}
          title={"Birimler"}
          href={"/panel/units"}
        />
      </div>
      <div class="rounded bg-neutral p-2 flex flex-col gap-1 mb-2">
        <h2 class="text-black text-bold border-b text-md py-1">SATIŞ İŞLEMLERİ</h2>

        <SideMenuButton
          icon={"bi bi-cart4"}
          title={"Ürünler"}
          href={"/panel/products"}
        />

        <SideMenuButton
        icon={"bi bi-basket2"}
          title={"Satışlar"}
          href={"/panel/transactions"}
        />

      </div>
      <div class="rounded bg-neutral p-2 flex flex-col gap-1 mb-2">
        <h2 class="text-black text-bold border-b text-md py-1">SİTE VERİLERİ</h2>

        <SideMenuButton
          icon={"bi bi-images"}
          title={"Sliderlar"}
          href={"/panel/sliders"}
        />

      </div>
    </div>
    
  </div>

</div>

