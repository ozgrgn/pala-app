<!-- App.svelte -->
<script>
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { onMount } from "svelte";
  import { Route, Router, navigate } from "svelte-navigator";
  import { lang } from "./services/store";
  import AdminLogin from "./views/auth/AdminLogin.svelte";
  import Auth from "./views/auth/Auth.svelte";
  import Register from "./views/auth/Register.svelte";
  import DesktopRoutes from "./views/desktop/Route.svelte";
  import AdminRoute from "./views/panel/Route.svelte";
  import CatalogIndex from "./views/pala-catalog/CatalogIndex.svelte";
  import Test from "./views/pala-catalog/test.svelte";
  import CatalogPdf from "./views/pala-catalog/CatalogPdf.svelte";

  lang.set("tr");

  onMount(() => {
    if (window.location.pathname == "" || window.location.pathname == "/") {
      navigate("store");
    }
  });
</script>

<SvelteToast />

<Router primary={false}>
  <Route path="panel/login" component={AdminLogin} />
  <Route path="auth/*auth" component={Auth} />

  <Route path="register" component={Register} />
  <Route path="panel/*" component={AdminRoute} />
  <Route path="store/*" component={DesktopRoutes} />
  <Route path="catalog" component={CatalogIndex} />
  <Route path="catalog/pdf" component={CatalogPdf} />

  <Route path="test/*" component={Test} />

</Router>
