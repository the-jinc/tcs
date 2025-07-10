import { Hono } from "hono";
import { api } from "./api";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use("*", cors());

app.get("/", (c) => {
  return c.redirect("https://docs.tcs.jinc.team");
});

app.route("/api/v1", api);

export default {
  fetch: app.fetch,
};
