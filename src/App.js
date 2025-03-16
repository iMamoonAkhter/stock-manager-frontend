import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import UserRegister from "../src/Form/UserRegister";
import Login from "../src/Form/Login";
import TenantLogin from "../src/Form/TenantLogin";
import Admin from "./Dashboard/Admin";
import Store from "../src/Store/Store";
import adminLogin from "../src/Form/adminLogin";
import CreateNew from "../src/Form/CreateNewTenant";
import AdminRegister from "../src/Form/AdminRegister";
import ForgotPassword from "../src/Form/ForgotPassword";
import AdminForgotPass from "../src/Form/AdminForgotPass";
import ResetPassword from "../src/Form/ResetPassword";
import AdminResetPass from "./Form/AdminResetPass";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/adminlogin" exact component={adminLogin} />
          <Route path="/tenantlogin" exact component={TenantLogin} />
          <Route path="/tenantlogin/:token" exact component={TenantLogin} />
          <Route path="/createnew" exact component={CreateNew} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/admin/:token" exact component={Admin} />
          <Route path="/store" exact component={Store} />
          <Route path="/store/:token" exact component={Store} />
          <Route path="/register" exact component={UserRegister} />
          <Route path="/registeradmin" exact component={AdminRegister} />
          <Route path="/forgotpassword" exact component={ForgotPassword} />
          <Route
            path="/adminforgotpassword"
            exact
            component={AdminForgotPass}
          />
          <Route path="/resetpassword" exact component={ResetPassword} />
          <Route path="/adminresetpassword" exact component={AdminResetPass} />
        </Switch>
      </BrowserRouter>
      {/* <Login /> 
      <UserRegister />
      <Admin />
     <Store /> */}
    </ThemeProvider>
  );
}

export default App;
