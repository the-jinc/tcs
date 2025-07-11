import { createRoute } from "honox/factory";
import { postParser } from "../../../../lib/parser";
import { parse } from "node-html-parser";
import { fetchPost } from "../../../../lib/fetch";

const fetchAndParse = async (fetchFunction: Function, ...args: any[]) => {
  const data = await fetchFunction(...args);
  return parse(data);
};

export default createRoute(async (c) => {
  const { username, id } = c.req.param();
  const root = await fetchAndParse(fetchPost, username, id);
  const message = postParser(root, id);
  return c.json(message);
});
