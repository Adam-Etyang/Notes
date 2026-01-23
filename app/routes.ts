import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("NewNote", "routes/NewNote.tsx"),
  route("note/:id", "routes/ViewNote.tsx"),
  route("edit/:id", "routes/EditNote.tsx"),
  route("Settings", "routes/Settings.tsx"),
] satisfies RouteConfig;
