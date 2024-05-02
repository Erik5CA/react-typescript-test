import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages";
import store from "./redux/store";
import { LayoutComponent } from "./styled-components";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <LayoutComponent>
        <Home />
      </LayoutComponent>
    </Provider>
  );
}

export default App;
