import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import titleReducer from "./features/title/titleSlice";
import flashcardReducer from "./features/flashcards/flashcardSlice";
import descriptionReducer from "./features/description/descriptionSlice";

// Fallback storage for server-side (no window or localStorage on SSR)
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const isClient = typeof window !== "undefined";
const storageToUse = isClient ? storage : createNoopStorage();

// Combine your reducers
const rootReducer = combineReducers({
  title: titleReducer,
  flashcards: flashcardReducer,
  description: descriptionReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage: storageToUse, // Use appropriate storage (localStorage on client)
  whitelist: ["title", "flashcards", "description"], // Corrected whitelist
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer and middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore redux-persist actions
      },
    }),
});

// Export persistor and store
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
