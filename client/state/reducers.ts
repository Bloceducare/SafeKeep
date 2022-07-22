import { combineReducers } from '@reduxjs/toolkit'
import backupAddressReducer from "../views/BackupAddress/state";
import vaultReducer from "../views/Wallet/state";
import inheritors from "../views/Inheritors/state";
import ui from "./ui";
import ping from "../views/Ping/state";
import backupAddress from "../views/BackupAddress/state";
import sharedTxn from "./shared";
import userReducer from "./user";
import auth from "./auth"
import { Api } from "../services/api";
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'


const authPersistConfig = {
    key: 'auth',
    storage: storage,
    // blacklist: ['fetchingUser']
  }

export const store = combineReducers({
    [Api.reducerPath]: Api.reducer,
    auth: persistReducer(authPersistConfig, auth),
    backup: backupAddressReducer,
    user: userReducer,
    vault: vaultReducer,
    inheritors,
    ui,
    ping,
    backupAddress,
    sharedTxn,
});


