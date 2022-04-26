import { applyMiddleware } from "redux";
import chat from "./chat.reducer";
import auth from "./auth.reducer";

export default applyMiddleware({
  chat,
  auth,
});
