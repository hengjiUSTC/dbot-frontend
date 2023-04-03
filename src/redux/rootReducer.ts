import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import botsReducer from './slices/bots';
import chatReducer from './slices/chat';
// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const chatPersistConfig = {
  key: 'chat',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const botsPersistConfig = {
  key: 'bots',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  bots: persistReducer(botsPersistConfig, botsReducer),
  chat: persistReducer(chatPersistConfig, chatReducer),
});

export default rootReducer;
