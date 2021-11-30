import { configureStore } from "@reduxjs/toolkit";
import backupAddressReducer from "../pages/BackupAddress/state";
import vaultReducer from "../pages/Wallet/state";
import inheritors from "../pages/Inheritors/state";
import ui from "./ui";

export const store = configureStore({
  reducer: {
    backup: backupAddressReducer,
    vault: vaultReducer,
    inheritors,
    ui,
  },
});
