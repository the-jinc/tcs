import { createRoute } from "honox/factory";
import { parse } from "node-html-parser";
import { fetchSearches } from "../../../lib/fetch";
import { postsParser } from "../../../lib/parser";

const fetchAndParse = async (fetchFunction: Function, ...args: any[]) => {
  const data = await fetchFunction(...args);
  return parse(data);
};

export default createRoute(async (c) => {
  const { username } = c.req.param();
  const { query } = c.req.query();

  if (!query) {
    return c.json({ message: "input query params to search" });
  }

  const root = await fetchAndParse(fetchSearches, username, query);
  const messages = postsParser(root);
  return c.json(messages);
});
