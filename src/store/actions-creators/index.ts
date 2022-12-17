import {glossaryAsyncActionCreators} from "./GlossaryActionCreators";
import {userAsyncActionCreators} from "./UserActionCreators";
import {userSlice} from "../reducers/UserSlice";
import {glossarySlice} from "../reducers/GlossarySlice";

export const actionsCreators = {
  ...glossaryAsyncActionCreators,
  ...userAsyncActionCreators,
  ...userSlice.actions,
  ...glossarySlice.actions
}