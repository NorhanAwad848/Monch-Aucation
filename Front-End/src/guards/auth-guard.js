import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../core/services/auth";

export const AuthGuard = ({ roles }) => {
  const { token, user } = getAuthToken();
  if (!token) {
    return <> {roles.length == 0 ? <Outlet /> : <Navigate to={"/login"} />} </>;
  } else {
    return <> {roles.find((role) => user.role.includes(role)) ? <Outlet /> : <Navigate to={`${user.role.toLowerCase()}-home`} />} </>;
  }
};
