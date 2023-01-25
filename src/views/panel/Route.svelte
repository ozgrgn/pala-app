<script>
  import FooterAdmin from "$components/Footers/FooterAdmin.svelte";
  import { Route, Router } from "svelte-navigator";
  import AdminNavbar from "./Navbar.svelte";

  import Dashboard from "./Dashboard.svelte";

  import CreateSlider from "./pala-slider/CreateSlider.svelte";
  import Sliders from "./pala-slider/Sliders.svelte";
  import UpdateSlider from "./pala-slider/UpdateSlider.svelte";

  import Admins from "./admin/Admins.svelte";
  import CreateAdmin from "./admin/CreateAdmin.svelte";
  import UpdateAdmin from "./admin/UpdateAdmin.svelte";
  import { panelDrawer } from "$services/store";


  import RestService from "$services/rest";
  import { onDestroy, onMount } from "svelte";
  import Modal from "svelte-simple-modal";
  import { modal } from "../../services/store";

  import Brands from "./pala-brand/Brands.svelte";
  import CreateBrand from "./pala-brand/CreateBrand.svelte";
  import UpdateBrand from "./pala-brand/UpdateBrand.svelte";
  import Cats from "./pala-category/Cats.svelte";
  import CreateCat from "./pala-category/CreateCat.svelte";
  import UpdateCat from "./pala-category/UpdateCat.svelte";
  import CreateCustomer from "./pala-customer/CreateCustomer.svelte";
  import Customers from "./pala-customer/Customers.svelte";
  import UpdateCustomer from "./pala-customer/UpdateCustomer.svelte";
  import CreateMembership from "./pala-membership/CreateMembership.svelte";
  import Memberships from "./pala-membership/Memberships.svelte";
  import UpdateMembership from "./pala-membership/UpdateMembership.svelte";
  import CreateProduct from "./pala-product/CreateProduct.svelte";
  import Products from "./pala-product/Products.svelte";
  import UpdateProduct from "./pala-product/UpdateProduct.svelte";
  import CreateTransaction from "./pala-transaction/CreateTransaction.svelte";
  import Transactions from "./pala-transaction/Transactions.svelte";
  import UpdateTransaction from "./pala-transaction/UpdateTransaction.svelte";
  import CreateUnit from "./pala-unit/CreateUnit.svelte";
  import Units from "./pala-unit/Units.svelte";
  import UpdateUnit from "./pala-unit/UpdateUnit.svelte";
  import CreateUser from "./pala-user/CreateUser.svelte";
  import UpdateUser from "./pala-user/UpdateUser.svelte";
  import Users from "./pala-user/Users.svelte";


  import { admin } from "$services/store";
  import { navigate, useLocation } from "svelte-navigator";
  import Sidebar from "./Sidebar.svelte";

  const location = useLocation();
  let adminAuthSubscription;

  onMount(() => {
    adminAuthSubscription = admin.subscribe(async (auth) => {
      if (!auth) {
        navigate("/panel/login");
      } else {
        let response = await RestService.verifyToken();
        if (response && response.status) {
          if ($location?.pathname?.indexOf("panel") == -1) {
            navigate("/panel/dashboard");
          }
        } else {
          admin.set(null);
        }
      }
    });
  });

  onDestroy(() => {
    adminAuthSubscription();
  });

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
 
    <Sidebar />
    <div
      class="
      {!$panelDrawer ? 'ml-0' : ''}
      {$panelDrawer ? 'ml-[18rem]' : ''}
       transition-all flex flex-col"
    >
 
    <div class="relative bg-[#6e6e85] md:pt-32 pb-32 pt-12" />

    <div class="px-2 mx-auto w-full -m-24">
      <AdminNavbar />
      <Router>
        <!-- Dashboard -->
        <Route path="dashboard" component={Dashboard} />
        <Route path="" component={Dashboard} />

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

        <!-- Unit -->
        <Route path="update-unit/:unitId" component={UpdateUnit} />

        <Route path="create-unit" component={CreateUnit} />

        <Route path="units" component={Units} />

        <!-- Customer -->
        <Route path="update-customer/:customerId" component={UpdateCustomer} />

        <Route path="create-customer" component={CreateCustomer} />

        <Route path="customers" component={Customers} />
        <!-- Transaction -->
        <Route
          path="update-transaction/:transactionId"
          component={UpdateTransaction}
        />

        <Route path="create-transaction" component={CreateTransaction} />

        <Route path="transactions" component={Transactions} />

        <!-- Admin -->
        <Route path="update-admin/:adminId" component={UpdateAdmin} />

        <Route path="create-admin" component={CreateAdmin} />

        <Route path="admins" component={Admins} />

        <!-- Admin -->
        <Route path="update-user/:userId" component={UpdateUser} />

        <Route path="create-user" component={CreateUser} />

        <Route path="users" component={Users} />

        <!-- Slider -->
        <Route path="update-slider/:sliderId" component={UpdateSlider} />

        <Route path="create-slider" component={CreateSlider} />

        <Route path="sliders" component={Sliders} />


      </Router>

      <FooterAdmin />
    </div>
  </div>
  </div>
</div>
