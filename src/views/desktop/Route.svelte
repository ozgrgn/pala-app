<script>
  import Footer from "$components/Footers/Footer.svelte";
  import { onDestroy } from "svelte";
  import { Route, Router } from "svelte-navigator";
  import Cat from "./Cat/Cat.svelte";

  import Header from "./Header/Header.svelte";
  import Home from "./Home/Home.svelte";
  import { user } from "$services/store";
  import { navigate, useLocation } from "svelte-navigator";
  import RestService from "$services/rest";

  const location = useLocation();

  let userAuthSubscription;

  userAuthSubscription = user.subscribe(async (auth) => {
    if (!auth) {
      navigate("/auth/login");
    } else {
      let response = await RestService.userVerifyToken();
      if (response && response.status) {
        if ($location?.pathname?.indexOf("store/") == -1) {
          navigate("/store/home");
        }
      } else {
        user.set(null);
      }
    }
  });

  onDestroy(() => {
    userAuthSubscription();
  });
</script>

<div class="min-h-screen">
  <Header />

  <div class=" mx-auto w-full relative ">
    <Router>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/category/:catid">
        <Cat />
      </Route>
    </Router>
  </div>
</div>
<Footer />
