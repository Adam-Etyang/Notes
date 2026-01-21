import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("new-note", "routes/NewNote.tsx"),
  route("note/:id", "routes/ViewNote.tsx"),
  route("edit/:id", "routes/EditNote.tsx"),
] satisfies RouteConfig;
