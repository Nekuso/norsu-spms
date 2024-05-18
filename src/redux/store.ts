import { configureStore } from "@reduxjs/toolkit";
import currentEmployeeReducer from "./slices/employeeSlice";
import sectorsSlice from "./slices/sectorsSlice";
import uomsReducer from "./slices/uomsSlice";
import rolesReducer from "./slices/rolesSlice";
import brandsReducer from "./slices/brandsSlice";
import mainSuppliesCartSlice from "./slices/mainSuppliesCartSlice";
import supplyCategoriesSlice from "./slices/supplyCategoriesSlice";
import mainSuppliesSlice from "./slices/mainSuppliesSlice";

export const store = configureStore({
  reducer: {
    currentSession: currentEmployeeReducer,
    sectors: sectorsSlice,
    uoms: uomsReducer,
    mainSupplies: mainSuppliesSlice,
    supplyCategories: supplyCategoriesSlice,
    roles: rolesReducer,
    brands: brandsReducer,

    mainSuppliesCart: mainSuppliesCartSlice,
  },
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
