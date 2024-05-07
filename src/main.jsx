import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import fbconfig from "./firebase/FirebaseConfig";
import { initializeApp } from "firebase/app";
import { Provider } from "react-redux";
import store from "./store/store.js";

const app = initializeApp(fbconfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
