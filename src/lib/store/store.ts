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

const rootReducer = combineReducers({
  title: titleReducer,
  flashcards: flashcardReducer,
  description: descriptionReducer,
});

const persistConfig = {
  key: "root",
  storage: storageToUse,
  whitelist: ["title", "flashcards, description"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Prevents errors in Redux Persist actions
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
