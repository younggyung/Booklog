import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../store'
import Footer from "../components/Footer";

function RootLayout() {

  return (
    <>
      <Provider store={store}>
        <Header />
        <div id="wrapper">
        <Outlet />
        </div>
      </Provider>
      <Footer/>
    </>
  );
}

export default RootLayout;
