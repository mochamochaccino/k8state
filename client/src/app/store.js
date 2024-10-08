import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { clusterApi } from "../features/cluster-view/clusterViewApiSlice";
import { clusterLogsApi } from "../features/cluster-log/clusterLogsApiSlice";
import portalSliceReducer from "../features/captive-portal/captivePortalSlice";
import clusterViewReducer from "../features/cluster-view/clusterViewApiSlice";
import clusterLogsReducer from "../features/cluster-log/clusterLogsApiSlice";
import iframeReducer from "../features/grafana-dashboard/GrafanaDashboardApiSlice";
// Combine the slices and RTK Query APIs into the root reducer
const rootReducer = combineReducers({
    [clusterApi.reducerPath]: clusterApi.reducer, // Adding the RTK Query reducer
    [clusterLogsApi.reducerPath]: clusterLogsApi.reducer, // Adding the RTK Query reducer
    clusterView: clusterViewReducer, // Adding the clusterView slice reducer
    portalSlice: portalSliceReducer, // Adding the portal slice reducer
    clusterLogs: clusterLogsReducer, // Adding the clusterLogs slice reducer
    iframe: iframeReducer,
});
// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(clusterApi.middleware, clusterLogsApi.middleware), // Adding RTK Query middleware
        preloadedState,
    });
    // configure listeners using the provided defaults
    // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
    setupListeners(store.dispatch);
    return store;
};
export const store = makeStore();
