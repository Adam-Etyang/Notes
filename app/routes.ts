import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("viewNotes", "./viewNotes.tsx"),
  route("note:id", "./viewNotes.tsx"),
  route("newNote", "./newNote.tsx"),
] satisfies RouteConfig;
