import { applyMiddleware, createStore } from "redux";
import rootReducer from "./index";
import thunk from "redux-thunk";

export default function configureStore() {
  return createStore(rootReducer,applyMiddleware(thunk));
}


// bir fonksıyon vasıtası ile bir store olusturmak ıstedık ve o da root reducer ı içeriyor