import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import logger from 'redux-logger'
import {
  FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import reducers from './reducers'

const isDev = process.env.NODE_ENV === 'development'

const persistConfig = {
  debug: isDev,
  // blacklist: ['loading'],
  key: 'root',
  storage,
  version: 1,
}

// TODO: Verify and invalidate JWT every time there's an action (on browser side)
// const jwtValidation = (store) => (next) => (action) => {
//   next(action)
// }

// Use middlewares to load the API reducers (under API slice) & any other custom middlewares
const middleware = [
  // addressApi.middleware,
  logger,
]

// if (!isProduction) middleware.push(logger)

const persistingReducer = persistReducer(persistConfig, combineReducers(reducers))

/**
 * Automatically configures `thunk` & `DevTools`, among others (getDefaultMiddleware), and combines slices
 *
 * Slice: "collection of Redux reducer logic and actions for a single feature in your app"
 * NOTE: Slices use Immer.js, which provides intuitive manipulation of the state (takes care of immutability!)
 *       "state" parameter is a "draft" of changes to be introduced to the original state. That draft "state"
 *       can be changed normally (like mutable object) but Immer.js produces new state (immutability!)
 */
export const store = configureStore({
  reducer: persistingReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // NOTE: Must ignore these Redux-Persist actions (they are non-serialized)
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // ignoredPaths: ['web3'],
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  }).concat(...middleware), // .concat(...middleware),
  // middleware: enhancers,
  devTools: isDev,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
