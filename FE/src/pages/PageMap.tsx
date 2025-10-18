import type { ReactNode } from "react";
import type { PageSelection } from "../types/pageSelection";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";

export const PageMap: Record<PageSelection, ReactNode> = {
  HOME: <Home />,
  LOGIN: <Login />,
  SIGNUP: <Signup />,
  PROFILE: <Profile />,
};
