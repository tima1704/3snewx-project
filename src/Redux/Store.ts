import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { RootReducer } from "./RootReducer";

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const Store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export default Store;
