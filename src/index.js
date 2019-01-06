// import "spectre.css/dist/spectre.min.css";
// import "spectre.css/dist/spectre-exp.min.css";
// import "spectre.css/dist/spectre-icons.min.css";
// import "spectre.css/dist/spectre-icons.min.css";
import "mini.css/dist/mini-nord.css"
import "./style";

import { createStore, Provider } from "unistore/full/preact";
import devtools from "unistore/devtools";
import initState from "./store/initState";
import App from './components/App';

// adds memory backing to a unistore store instance
function addMemory(store) {
  if (typeof window !== "undefined") {
    if (window.STATE) store.setState(window.STATE);
    store.subscribe(state => {
      window.STATE = state;
    });
  }
}

let store = process.env.NODE_ENV === "production" ? createStore(initState) : devtools(createStore(initState));
addMemory(store);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
