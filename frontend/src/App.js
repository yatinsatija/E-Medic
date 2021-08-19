import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import LandingHeader from "./components/navbar/LandingHeader";
import CSHeader from "./components/CSHeader";
import HomePage from "./pages/HomePage";
import React from "react";
import CustomerSignIn from "./pages/signin/customerSignIn";
import StaffSignIn from "./pages/signin/StaffSignIn";
import DoctorSignIn from "./pages/signin/DoctorSignIn";
import AdminSignIn from "./pages/signin/AdminSignIn";
import Registration from "./pages/registration/Registration";
import SDRegistration from "./pages/registration/SDRegistration";
import CustomerSelectionPage from "./pages/CustomerSelectionPage";
import EPHome from "./pages/EPHARMACY/EPHome";
import { useStateValue } from "./pages/EPHARMACY/StateProvider";
import EHeader from "./pages/EPHARMACY/Header/EHeader";
import Checkout from "./pages/EPHARMACY/Checkout/Checkout";
import Delivery from "./pages/EPHARMACY/Checkout/Delivery";
import Payment from "./pages/EPHARMACY/Payment/Payment";
import Prescription from "./pages/EPHARMACY/Prescription/Prescription";
import StaffValidation from "./pages/EPHARMACY/staff validation/StaffValidation";
import Order from "./pages/EPHARMACY/Order/Order";
import MyOrders from "./pages/EPHARMACY/MyOrders/MyOrders";
import CustomerLanding from "./pages/ECONSULTANCY/CustomerLanding/CustomerLanding";
import DoctorLanding from "./pages/ECONSULTANCY/DoctorLanding/DoctorLanding";
import AddMedicine from "./pages/EPHARMACY/staff validation/AddMedicine";
import UpdateMedicine from "./pages/EPHARMACY/staff validation/UpdateMedicine";
import RemoveDoctor from "./pages/EPHARMACY/RemoveDoctor/RemoveDoctor";

function App() {
  const [{}, dispatch] = useStateValue();
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/">
            <LandingHeader />
            <HomePage />
          </Route>
          <Route path="/csignin">
            <LandingHeader />
            <CustomerSignIn />
          </Route>
          <Route path="/staffsignin">
            <LandingHeader />
            <StaffSignIn />
          </Route>
          <Route path="/doctorsignin">
            <LandingHeader />
            <DoctorSignIn />
          </Route>
          <Route path="/adminsignin">
            <LandingHeader />
            <AdminSignIn />
          </Route>
          <Route path="/doctorlanding">
            <CSHeader />
            <br />
            <br />
            <br />
            <br />
            <DoctorLanding />
          </Route>
          <Route path="/register">
            <LandingHeader />
            <Registration />
          </Route>
          <Route path="/sdregister">
            <CSHeader />
            <SDRegistration />
          </Route>
          <Route path="/removedoctor">
            <CSHeader />
            <br />
            <br />
            <br />
            <br />
            <br />
            <RemoveDoctor />
          </Route>
          <Route path="/customerselection">
            <CSHeader />
            {/* <EHeader /> */}
            <CustomerSelectionPage />
          </Route>
          <Route path="/epharmacy">
            {/* <LandingHeader /> */}
            <EHeader />
            <EPHome />
          </Route>
          <Route path="/validate">
            {/* <LandingHeader /> */}
            <CSHeader />
            <br />
            <br />
            <br />
            <br />
            <br />
            <StaffValidation />
          </Route>
          <Route path="/addmedicine">
            {/* <LandingHeader /> */}
            <CSHeader />
            <br />
            <br />
            <br />
            <br />
            <br />
            <AddMedicine />
          </Route>
          <Route path="/updatemedicine">
            {/* <LandingHeader /> */}
            <CSHeader />
            <br />
            <br />
            <br />
            <br />
            <br />
            <UpdateMedicine />
          </Route>
          <Route path="/prescription">
            {/* <LandingHeader /> */}
            <EHeader />
            <Prescription />
          </Route>
          {/* <Route path="/popup">
            <Popup />
          </Route> */}
          <Route path="/checkout">
            {/* <LandingHeader /> */}
            <EHeader />
            <Checkout />
          </Route>
          <Route path="/delivery">
            {/* <LandingHeader /> */}
            <EHeader />
            <Delivery />
          </Route>
          <Route path="/payment">
            {/* <LandingHeader /> */}
            <EHeader />
            <Payment />
          </Route>
          <Route path="/order">
            <EHeader />
            <br />
            <br />
            <br />
            <br />
            {/* <EHeader /> */}
            <Order />
          </Route>
          <Route path="/econsultancy">
            <CSHeader />
            {/* <CHeader /> */}
            <CustomerLanding />
          </Route>
          <Route path="/myorders">
            <EHeader />
            <br />
            <br />
            <br />
            <br />
            {/* <EHeader /> */}
            <MyOrders />
          </Route>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
