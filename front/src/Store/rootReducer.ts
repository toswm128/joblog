import { createSelectorHook } from "react-redux";
import { combineReducers } from "redux";
import { BlogStateType } from "./BlogStore/type";

import WriteEditorReducer from "./WriteEditorStore/reducer";
import BlogReducer from "./BlogStore/reducer";
import UserReducer from "./UserStore/reducer";
import { WriteEditorStateType } from "./WriteEditorStore/type";
import { UserStateType } from "./UserStore/type";

const rootReducer = combineReducers({
  WriteEditor: WriteEditorReducer,
  Blog: BlogReducer,
  User: UserReducer,
});

export type RootStateType = {
  WriteEditor: WriteEditorStateType;
  Blog: BlogStateType;
  User: UserStateType;
};

export const useTypedSelector = createSelectorHook<RootStateType>();

export default rootReducer;
