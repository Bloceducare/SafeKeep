import { configureStore } from "@reduxjs/toolkit";
import backupAddressReducer from "../pages/BackupAddress/state";
import vaultReducer from "../pages/Wallet/state";
import inheritors from "../pages/Inheritors/state";
import ui from "./ui";
import ping from "../pages/Ping/state";
import backupAddress from "../pages/BackupAddress/state";
import sharedTxn from "./shared";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    backup: backupAddressReducer,
    user: userReducer,
    vault: vaultReducer,
    inheritors,
    ui,
    ping,
    backupAddress,
    sharedTxn,
  },
});
