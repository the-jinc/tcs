import { Hono } from "hono";
import {
  fetchPosts,
  fetchPost,
  fetchPostsOffsets,
  fetchSearches,
} from "./utils/fetch.js";
import { infoParser, postParser, postsParser } from "./utils/parser.js";
import { parse } from "node-html-parser";

const fetchAndParse = async (fetchFunction: Function, ...args: any[]) => {
  const data = await fetchFunction(...args);
  return parse(data);
};

export const api = new Hono()
  .get("info/:username", async (c) => {
    const username = c.req.param("username");
    const root = await fetchAndParse(fetchPosts, username);
    const info = infoParser(root);
    return c.json(info);
  })
  .get("/post/:username/:id", async (c) => {
    const { username, id } = c.req.param();
    const root = await fetchAndParse(fetchPost, username, id);
    const message = postParser(root, id);
    return c.json(message);
  })
  .get("/posts/:username", async (c) => {
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
  })
  .get("/search/:username", async (c) => {
    const { username } = c.req.param();
    const { query } = c.req.query();

    if (!query) {
      return c.json({ message: "input query params to search" });
    }

    const root = await fetchAndParse(fetchSearches, username, query);
    const messages = postsParser(root);
    return c.json(messages);
  });
