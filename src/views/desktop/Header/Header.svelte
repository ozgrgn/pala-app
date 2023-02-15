<script>
  import RestService from "$services/rest";
  import { user, cats } from "$services/store";
  import { link, navigate, useLocation } from "svelte-navigator";
  import { modal } from "$services/store";
  import { bind } from "svelte-simple-modal";
  import Alert from "$components/Alert.svelte";

  import { onDestroy } from "svelte";
  import AItem from "./AItem.svelte";
  const preLogout = () => {
    modal.set(
      bind(Alert, {
        message: "Çıkış Yapmak İstediğinizden Emin misiniz ?",
        answer: (message) => {
          if (message) {
          setTimeout(() => {
            logout();
          }, 1);
          }
          modal.set(null);
        },
      })
    );
  };
  let userSub;
  const location = useLocation();
  $: {
    if ($location) {
      window.scrollTo(0, 0);
    }
  }
  let userInfo;
  const getUserInformation = async () => {
    console.log("dddddd");
    let userInfoResponse = await RestService.getMe($user.userId);

    if (userInfoResponse && userInfoResponse.status) {
      userInfo = userInfoResponse["_doc"];
      console.log(userInfo, "userinfo");
    }
  };

  userSub = user.subscribe((userSubValue) => {
    if (userSubValue) {
      getUserInformation();
    }
  });

  onDestroy(userSub);

  const changeNavStatus = () => {
    setTimeout(() => {
      active = !active;
    }, 50);
  };
  const logout = () => {
    user.set(null);
  };
  console.log($user, "user");

  const getCats = async () => {
    let response = await RestService.getCats(undefined, undefined, true);
    $cats = response["cats"];
    console.log($cats, "cats");
  };
  getCats();
  let hover;
</script>

<div
  class="container px-2 md:px-0 mx-auto h-20 border-b flex flex-col justify-center"
>
  <div class="flex justify-between">
    <a href="/" class="z-10">
      <img class="" src="/assets/img/logos/logo-light.png" alt="" />
    </a>
    <div class="flex justify-center self-center w-full">
      <div class="flex justify-center items-center">
        <a use:link href={`/store/home`} class="">Home</a>
      </div>
      <div
        class="relative flex flex-col justify-center z-10 cursor-pointer"
        on:mouseover={() => (hover = true)}
        on:mouseout={() => (hover = false)}
        on:focus
        on:blur
      >
        <div class="w-full px-2 md:px-6 ">Kategoriler</div>
        <div
          class="flex flex-col absolute  min-w-full whitespace-nowrap left-0 top-6 bg-white rounded-b-lg md:p-2 box-shadow shadow-lg {hover
            ? 'opacity-100'
            : '  opacity-0 h-0'} transition-opacity ease-in-out delay:75 duration-500 z-1"
        >
          <AItem
            bind:hover
            customClass="justify-start w-fit pl-2  {hover
              ? 'opacity-100'
              : '  opacity-0 h-0'}"
            active={$location.pathname == `/cats/all`}
            path="/store/category/all">Tümü</AItem
          >
          {#if $cats}
            {#each $cats as cat}
              <AItem
                bind:hover
                customClass="justify-start w-fit pl-2  {hover
                  ? 'opacity-100'
                  : '  opacity-0 h-0'}"
                active={$location.pathname == `/cats/${cat.perma}`}
                path="/store/category/{cat._id}">{cat.name}</AItem
              >
            {/each}
          {/if}
        </div>
      </div>

      <div class="">
        <a use:link href={`/store/member-info`} class=""
          ><span class="hidden md:flex">Üyelik Bilgilerim</span><span
            class="flex md:hidden">Bilgilerim</span
          ></a
        >
      </div>
    </div>
    <div class="w-1/4 flex flex-col justify-center px-2 md:px-0 ">
      {#if $user}
        <div
          on:click={() => {
            preLogout();
          }}
          class="flex cursor-pointer"
        >
          <i class="hidden md:block text-black bi bi-person-fill px-2" />
          <span class="hidden md:flex">Çıkış Yap</span><span
            class="flex md:hidden">Çıkış</span
          >
        </div>
      {:else}
        <a
          use:link
          href="/register"
          on:click={() => {}}
          class="flex cursor-pointer"
        >
          <i class="text-black bi bi-person-fill px-2" /> Kayıt Ol
        </a>
      {/if}
    </div>
  </div>
</div>

<style>
</style>
