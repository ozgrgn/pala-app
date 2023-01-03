<script>
  import Footer from "$components/Footers/Footer.svelte";
  import { Route, Router } from "svelte-navigator";

  import Header from "./Header/Header.svelte";
</script>

  <div class="min-h-screen">
    <Header />

    <div class=" mx-auto w-full relative ">
      <Router>

      </Router>
    </div>
  </div>
    <Footer />


