<script>
  import RestService from "$services/rest";
  import { user, cats } from "$services/store";
  import { link, useLocation } from "svelte-navigator";

  import { onDestroy } from "svelte";
  import AItem from "./AItem.svelte";
  console.log($user, "usersrsers");
  let userSub;
  const location = useLocation();
  let userInfo;
  $: {
    if ($location) {
      window.scrollTo(0, 0);
    }
  }

  const getUserInformation = async () => {
    let userInfoResponse = await RestService.getMe($user.userId);

    if (userInfoResponse && userInfoResponse.status) {
      userInfo = userInfoResponse["info"];
      console.log(userInfoResponse, "userinfo");
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

<div class="container mx-auto h-20 border-b flex flex-col justify-center">
  <div class="flex justify-between">
    <a href="/" class="z-10">
      <img class="" src="/assets/img/logos/logo-light.png" alt="" />
    </a>
    <div class="flex justify-center self-center w-full">
      <a use:link href={`/store/home`} class=""><span>Home</span></a>

      <div
        class="relative flex flex-col justify-center z-10 cursor-pointer"
        on:mouseover={() => (hover = true)}
        on:mouseout={() => (hover = false)}
        on:focus
        on:blur
      >
        <div class="w-full  px-6 ">Kategoriler</div>
        <div
          class="flex flex-col absolute pr-8 min-w-full whitespace-nowrap left-0 top-6 bg-white rounded-b-lg p-2 box-shadow shadow-lg {hover
            ? 'opacity-100'
            : '  opacity-0 h-0'} transition-opacity ease-in-out delay:75 duration-500 z-1"
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
          ><span>Üyelik Bilgilerim</span></a
        >
      </div>
    </div>
    <div class="w-1/4 flex flex-col justify-center">
      {#if $user}
        <div
          on:click={() => {
            logout();
          }}
          class="flex cursor-pointer"
        >
          <i class="text-black bi bi-person-fill px-2" /> Çıkış Yap
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
  .active {
    left: 0px;
    transition: all 1s;
  }
</style>
