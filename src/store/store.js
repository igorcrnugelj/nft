import { configureStore } from "@reduxjs/toolkit";
import { layerReducer } from "./reducers/Layer";
import { collectionReducer } from "./reducers/Collection";
import { mainPanelReducer } from "./reducers/MainPanel";
import { notificationsReducer } from "./reducers/Notifications";
import { loginReducer } from "./reducers/Login";

const store = configureStore({
  reducer: {
    layers: layerReducer,
    collectionsStore: collectionReducer,
    mainPanelStore: mainPanelReducer,
    notificationsStore: notificationsReducer,
    loginStore: loginReducer,
  },
});

export default store;
