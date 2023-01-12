<script>
  import Footer from "$components/Footers/Footer.svelte";
  import { Route, Router } from "svelte-navigator";
  import Cat from "./Cat/Cat.svelte";

  import Header from "./Header/Header.svelte";
  import Home from "./Home/Home.svelte";
</script>

  <div class="min-h-screen">
    <Header />

    <div class=" mx-auto w-full relative ">
      <Router>
        <Route path="/">
          <Home/>
        </Route>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/category/:catid">
          <Cat/>
        </Route>
      </Router>
    </div>
  </div>
    <Footer />


