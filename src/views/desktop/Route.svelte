<script>
  import Footer from "$components/Footers/Footer.svelte";
  import { onDestroy } from "svelte";
  import { Route, Router } from "svelte-navigator";
  import Modal from "svelte-simple-modal";
  import { modal } from "../../services/store";
  import Header from "./Header/Header.svelte";
  import Home from "./Home/Home.svelte";
  import { user } from "$services/store";
  import { navigate, useLocation } from "svelte-navigator";
  import RestService from "$services/rest";
  import ProductDetailPage from "./ProductDetail-Page/ProductDetailPage.svelte";
  import ProductsPage from "./Products-Page/ProductsPage.svelte";
  import MemberInfo from "./MemberInfo-Page/MemberInfo.svelte";
  import History from "./History/History.svelte";

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
<Modal show={$modal} />

<div class="min-h-screen">
  <Header />

  <div class=" mx-auto w-screen px-2 md-px-0 relative ">
    <Router>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/category/:catid">
        <ProductsPage />
      </Route>
      <Route path="/product/:productid">
        <ProductDetailPage />
      </Route>
      <Route path="/member-info">
        <MemberInfo />
      </Route>
      <Route path="/history">
        <History />
      </Route>
    </Router>
  </div>
</div>
<Footer />
