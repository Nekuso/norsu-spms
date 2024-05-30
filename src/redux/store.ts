import { configureStore } from "@reduxjs/toolkit";
import currentEmployeeReducer from "./slices/employeeSlice";
import sectorsSlice from "./slices/sectorsSlice";
import uomsReducer from "./slices/uomsSlice";
import rolesReducer from "./slices/rolesSlice";
import mainSuppliesCartSlice from "./slices/mainSuppliesCartSlice";
import supplyCategoriesSlice from "./slices/supplyCategoriesSlice";
import mainSuppliesSlice from "./slices/mainSuppliesSlice";
import requestsSlice from "./slices/requestSlice";
import requestsCartSlice from "./slices/requestCartSlice";

export const store = configureStore({
  reducer: {
    currentSession: currentEmployeeReducer,
    sectors: sectorsSlice,
    uoms: uomsReducer,
    supplyCategories: supplyCategoriesSlice,
    roles: rolesReducer,

    mainSupplies: mainSuppliesSlice,
    mainSuppliesCart: mainSuppliesCartSlice,

    request: requestsSlice,
    requestCart: requestsCartSlice,
  },
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
