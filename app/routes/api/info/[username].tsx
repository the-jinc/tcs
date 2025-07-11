import { createRoute } from "honox/factory";
import { fetchPosts } from "../../../lib/fetch";
import { infoParser } from "../../../lib/parser";
import { parse } from "node-html-parser";

const fetchAndParse = async (fetchFunction: Function, ...args: any[]) => {
  const data = await fetchFunction(...args);
  return parse(data);
};

export default createRoute(async (c) => {
  const username = c.req.param("username");
  const root = await fetchAndParse(fetchPosts, username);
  const info = infoParser(root);
  return c.json(info);
});
