import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

//creatStore와 같은 개념. 스토어를 생성하고 reducer를 등록할 수 있게 하는 구조
//authSlice에 등록한 authReducer를 auth 로 등록
const store = configureStore({
    reducer: {
    auth: authReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

export default store;
