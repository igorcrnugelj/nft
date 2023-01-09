import {configureStore} from '@reduxjs/toolkit'

import {layerReducer} from './reducers/Layer-reducer'
import {collectionReducer} from './reducers/Collection-reducer'
import {mainPanelReducer} from './reducers/MainPanel-reducer'
import {notificationsReducer} from './reducers/Notifications-reducer'

const store = configureStore({
  reducer: {
    layers: layerReducer,
    collectionsStore: collectionReducer,
    mainPanelStore: mainPanelReducer,
    notificationsStore: notificationsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

export default store
