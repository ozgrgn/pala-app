<script>
  import FooterAdmin from "$components/Footers/FooterAdmin.svelte";
  import { Route, Router } from "svelte-navigator";
  import AdminNavbar from "./Navbar.svelte";

  import Dashboard from "./Dashboard.svelte";

  import CreateSlider from "./slider/CreateSlider.svelte";
  import Sliders from "./slider/Sliders.svelte";
  import UpdateSlider from "./slider/UpdateSlider.svelte";

  import UpdateAdmin from "./admin/UpdateAdmin.svelte";
  import CreateAdmin from "./admin/CreateAdmin.svelte";
  import Admins from "./admin/Admins.svelte";
  import UpdateLang from "./lang/UpdateLang.svelte";
  import CreateLang from "./lang/CreateLang.svelte";
  import Langs from "./lang/Langs.svelte";
  import UpdateHome from "./homePage/UpdateHome.svelte";
  import CreateHome from "./homePage/CreateHome.svelte";
  import Homes from "./homePage/Homes.svelte";
  import UpdateAbout from "./about/UpdateAbout.svelte";
  import CreateAbout from "./about/CreateAbout.svelte";
  import Abouts from "./about/Abouts.svelte";
  import UpdateTreatment from "./treatment/UpdateTreatment.svelte";
  import CreateTreatment from "./treatment/CreateTreatment.svelte";
  import Treatments from "./treatment/Treatments.svelte";
  import UpdateTreatmentPage from "./treatmentPage/UpdateTreatmentPage.svelte";
  import CreateTreatmentPage from "./treatmentPage/CreateTreatmentPage.svelte";
  import TreatmentPages from "./treatmentPage/TreatmentPages.svelte";
  import UpdateContact from "./contact/UpdateContact.svelte";
  import CreateContact from "./contact/CreateContact.svelte";
  import Contacts from "./contact/Contacts.svelte";
  import UpdateGeneral from "./general/UpdateGeneral.svelte";
  import CreateGeneral from "./general/CreateGeneral.svelte";
  import Generals from "./general/Generals.svelte";
  import UpdateTranslate from "./translate/UpdateTranslate.svelte";
  import CreateTranslate from "./translate/CreateTranslate.svelte";
  import Translates from "./translate/Translates.svelte";
  import { modal } from "../../services/store";
  import Modal from "svelte-simple-modal";
  import UpdateCat from "./pala-category/UpdateCat.svelte";
  import CreateCat from "./pala-category/CreateCat.svelte";
  import Cats from "./pala-category/Cats.svelte";
  import UpdateBrand from "./pala-brand/UpdateBrand.svelte";
  import CreateBrand from "./pala-brand/CreateBrand.svelte";
  import Brands from "./pala-brand/Brands.svelte";
  import UpdateMembership from "./pala-membership/UpdateMembership.svelte";
  import CreateMembership from "./pala-membership/CreateMembership.svelte";
  import Memberships from "./pala-membership/Memberships.svelte";
  import UpdateProduct from "./pala-product/UpdateProduct.svelte";
  import CreateProduct from "./pala-product/CreateProduct.svelte";
  import Products from "./pala-product/Products.svelte";
  import UpdateUnit from "./pala-unit/UpdateUnit.svelte";
  import CreateUnit from "./pala-unit/CreateUnit.svelte";
  import Units from "./pala-unit/Units.svelte";
  // let userAuthSubscription = user.subscribe(async (auth) => {
  //   if (!auth) {
  //     navigate("/auth/login");
  //     SOCKET.stopConnection();
  //     if (window.location.pathname.indexOf("admin") != -1) {
  //       navigate("/auth/login");
  //     }
  //   } else {
  //     let response = await RestService.verifyToken();
  //     if (response && response.status) {
  //       SOCKET.startConnection();
  //       if (
  //         window.location.pathname == "/auth/login" ||
  //         window.location.pathname == "/panel" ||

  //         window.location.pathname == "/panel/"
  //       ) {
  //         navigate("/panel/dashboard");
  //       }
  //     } else {
  //       user.set(null);
  //     }
  //   }
  // });
  // onDestroy(() => {
  //   userAuthSubscription;
  // });
</script>

<Modal show={$modal} />
<div>
  <!-- <Sidebar /> -->

  <div class="relative bg-blueGray-100">
    <AdminNavbar />

    <div class="relative bg-blue-600 md:pt-32 pb-32 pt-12" />

    <div class="px-2 mx-auto w-full -m-24">
      <Router>
        <!-- Dashboard -->
        <Route path="dashboard" component={Dashboard} />

        <!-- Category -->
        <Route path="update-cat/:catId" component={UpdateCat} />

        <Route path="create-cat" component={CreateCat} />

        <Route path="cats" component={Cats} />

        <!-- Brand -->
        <Route path="update-brand/:brandId" component={UpdateBrand} />

        <Route path="create-brand" component={CreateBrand} />

        <Route path="brands" component={Brands} />
        <!-- Membership -->
        <Route
          path="update-membership/:mambershipId"
          component={UpdateMembership}
        />

        <Route path="create-membership" component={CreateMembership} />

        <Route path="memberships" component={Memberships} />
        <!-- products -->
        <Route path="update-product/:productId" component={UpdateProduct} />

        <Route path="create-product" component={CreateProduct} />

        <Route path="products" component={Products} />


        <!-- Brand -->
        <Route path="update-unit/:unitId" component={UpdateUnit} />

        <Route path="create-unit" component={CreateUnit} />

        <Route path="units" component={Units} />








        <!-- Admin -->
        <Route path="update-admin/:adminId" component={UpdateAdmin} />

        <Route path="create-admin" component={CreateAdmin} />

        <Route path="admins" component={Admins} />

        <!-- Slider -->
        <Route path="update-slider/:sliderId" component={UpdateSlider} />

        <Route path="create-slider" component={CreateSlider} />

        <Route path="sliders" component={Sliders} />

        <!-- Ana Sayfa -->
        <Route path="update-home/:homeId" component={UpdateHome} />

        <Route path="create-home" component={CreateHome} />

        <Route path="homes" component={Homes} />
        <!-- Hakkımızda -->
        <Route path="update-about/:aboutId" component={UpdateAbout} />

        <Route path="create-about" component={CreateAbout} />

        <Route path="abouts" component={Abouts} />

        <!-- Tedavi-Sayfası -->
        <Route
          path="update-treatmentpage/:treatments_pageId"
          component={UpdateTreatmentPage}
        />

        <Route path="create-treatmentpage" component={CreateTreatmentPage} />

        <Route path="treatmentpages" component={TreatmentPages} />
        <!-- İletişim -->
        <Route path="update-contact/:contactId" component={UpdateContact} />

        <Route path="create-contact" component={CreateContact} />

        <Route path="contacts" component={Contacts} />
        <!-- Genel Bilgiler -->
        <Route path="update-general/:generalId" component={UpdateGeneral} />

        <Route path="create-general" component={CreateGeneral} />

        <Route path="generals" component={Generals} />
        <!-- Çeviriler -->
        <Route
          path="update-translate/:translateId"
          component={UpdateTranslate}
        />

        <Route path="create-translate" component={CreateTranslate} />

        <Route path="translates" component={Translates} />
        <!-- Diller -->
        <Route path="update-lang/:langId" component={UpdateLang} />

        <Route path="create-lang" component={CreateLang} />

        <Route path="langs" component={Langs} />

        <!-- Tedaviler -->
        <Route
          path="update-treatment/:treatmentId"
          component={UpdateTreatment}
        />

        <Route path="create-treatment" component={CreateTreatment} />

        <Route path="treatments" component={Treatments} />
      </Router>

      <FooterAdmin />
    </div>
  </div>
</div>
