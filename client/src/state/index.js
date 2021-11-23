import { configureStore } from '@reduxjs/toolkit';
import backupAddressReducer from './backup'
import vaultReducer from './vault'


export const store = configureStore({
  reducer: {
   backup:backupAddressReducer,
   vault:vaultReducer
  },
});