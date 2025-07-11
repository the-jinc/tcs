const fetchFromTelegram = async (url: string, referrer?: string) => {
  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.text();
  return result;
};

export const fetchPost = async (username: string, id: string) => {
  const url = `https://t.me/${username}/${id}?embed=1&mode=tme`;
  const referrer = `https://t.me/s/${username}`;
  return fetchFromTelegram(url, referrer);
};

export const fetchPosts = async (username: string) => {
  const url = `https://t.me/s/${username}`;
  return fetchFromTelegram(url);
};

export const fetchSearches = async (username: string, query: string) => {
  const url = `https://t.me/s/${username}?q=${query}`;
  const referrer = `https://t.me/s/${username}`;
  return fetchFromTelegram(url, referrer);
};

export const fetchPostsOffsets = async (
  username: string,
  offset: string,
  id: string
) => {
  const url = `https://t.me/s/${username}?${offset}=${id}`;
  return fetchFromTelegram(url);
};
