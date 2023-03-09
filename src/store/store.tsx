import { configureStore } from "@reduxjs/toolkit";

import { layerReducer } from "./reducers/Layer-reducer";
import { collectionReducer } from "./reducers/Collection-reducer";
import { mainPanelReducer } from "./reducers/MainPanel-reducer";
import { notificationsReducer } from "./reducers/Notifications-reducer";
import { loginReducer } from "./reducers/Login-reducer";

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
