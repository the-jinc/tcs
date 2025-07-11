import { createRoute } from "honox/factory";
import { fetchPosts, fetchPostsOffsets } from "../../../lib/fetch";
import { postsParser } from "../../../lib/parser";
import { parse } from "node-html-parser";

const fetchAndParse = async (fetchFunction: Function, ...args: any[]) => {
  const data = await fetchFunction(...args);
  return parse(data);
};

export default createRoute(async (c) => {
  const { username } = c.req.param();
  const { before, after } = c.req.query();

  if (before && after) {
    return c.json({
      message: "can't use both before and after at the same time.",
    });
  }

  const offsetType = before ? "before" : "after";
  const offsetValue = before || after;
  const fetchFunction = offsetValue ? fetchPostsOffsets : fetchPosts;
  const fetchArgs = offsetValue
    ? [username, offsetType, offsetValue]
    : [username];

  const root = await fetchAndParse(fetchFunction, ...fetchArgs);
  const messages = postsParser(root);
  return c.json(messages);
});
