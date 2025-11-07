import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";

import appStore from "./utils/store";
import { Provider } from "react-redux";

function App() {

  return (
    <>
    <Provider store={appStore}>
     <Header />
     <Outlet />
     <Footer />
    </Provider>
    </>
  )
}

export default App;
