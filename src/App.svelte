<!-- App.svelte -->
<script>
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { Route, Router, navigate } from "svelte-navigator";
  import {
    lang,
    langs,
    user,
    general,
    translate,
    treatments,
  } from "./services/store";
  import AdminRoute from "./views/panel/Route.svelte";
  import DesktopRoutes from "./views/desktop/Route.svelte";
  import Auth from "./views/auth/Auth.svelte";
  import { onDestroy } from "svelte";
  import RestService from "./services/rest";
  import { isDesktop } from "$services/utils";
  import Register from "./views/auth/Register.svelte";

  // const getGenerals = async () => {
  //   let response = await RestService.getGenerals(undefined, undefined, $lang);

  //   general.set(response["generals"][0]);
  //   console.log($general, "general");
  // };
  // getGenerals();
  // const getTranslates = async () => {
  //   let response = await RestService.getTranslates(undefined, undefined, $lang);
  //   translate.set(response["translates"][0]);
  //   console.log($translate, "translate");

  // };
  // getTranslates();

  // const getLangs = async () => {
  //   let response = await RestService.getLangs(undefined, undefined);
  //   langs.set(response["langs"]);
  //   console.log($langs, "langs");
  // };
  // getLangs();
  // const getTreatments = async () => {
  //   let response = await RestService.getTreatments(
  //     undefined,
  //     undefined,
  //     $lang,
  //     true,
  //     undefined
  //   );
  //   treatments.set(response["treatments"]);
  //   console.log($treatments, "treatments");
  // };
  // getTreatments();
  if (!window.location.pathname.includes("panel")
) {
    let userAuthSubscription = user.subscribe(async (auth) => {
      if (!auth) {
        navigate("/auth/login");

        if (window.location.pathname.indexOf("admin") != -1) {
          navigate("/auth/login");
        }
      } else {
        let response = await RestService.userVerifyToken();
        if (response && response.status) {
          if (
            window.location.pathname.includes("panel")
          
          ) {
            console.log("panel")
            navigate("/panel/dashboard");
          } else {
            navigate("/home");
          }
        } else {
          user.set(null);
        }
      }
    });
    onDestroy(() => {
      userAuthSubscription;
    });
  }

  let browserLang = navigator.language || navigator.userLanguage;
  if (!$lang) lang.set(browserLang.split("-")[0]);
</script>

<SvelteToast />

<Router primary={false}>
  <Route path="auth/*auth" component={Auth} />
  <Route path="register" component={Register} />
  <Route path="panel/*" component={AdminRoute} />
  {#if isDesktop()}
    <Route component={DesktopRoutes} />
  {:else}
    <Route component={DesktopRoutes} />
  {/if}
</Router>
