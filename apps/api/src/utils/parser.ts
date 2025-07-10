import { HTMLElement } from "node-html-parser";

export const infoParser = (root: HTMLElement): TInfo => {
  const channelInfo: TInfo = {};

  const username = root.querySelector(".tgme_channel_info_header_username a");
  if (username) {
    channelInfo.username = username.text;
  }

  const name = root.querySelector(".tgme_channel_info_header_title span");
  if (name) {
    channelInfo.name = name.text;
  }

  const description = root.querySelector(".tgme_channel_info_description");
  if (description) {
    channelInfo.description = description.rawText;
  }

  const image = root.querySelector(".tgme_page_photo_image img");
  if (image) {
    channelInfo.image = image.getAttribute("src")!;
  }

  const counters = root.querySelectorAll(".tgme_channel_info_counter");
  if (counters) {
    counters.forEach((counter) => {
      const value = counter.querySelector(".counter_value")?.text;
      const type = counter.querySelector(".counter_type")?.text;
      switch (type) {
        case "subscribers":
          channelInfo.subscribers = value;
          break;
        case "photos":
          channelInfo.photos = value;
          break;
        case "videos":
          channelInfo.videos = value;
          break;
        case "files":
          channelInfo.files = value;
          break;
        case "links":
          channelInfo.links = value;
          break;
      }
    });
  }

  return channelInfo;
};

export const postParser = (root: HTMLElement, id: string): TMessage => {
  const message: TMessage = {};

  message.id = id;

  const user = root.querySelector(".tgme_widget_message_owner_name");
  if (user) {
    message.user = user.text;
  }

  const text = root.querySelector(".tgme_widget_message_text");
  if (text) {
    message.text = text.text;
  }

  const images = root.querySelectorAll(".tgme_widget_message_photo_wrap");
  if (images) {
    if (images.length === 1) {
      const style = images[0].getAttribute("style") || "";
      const start = style.indexOf("url('");
      const end = style.indexOf('")', start);
      const url = style.slice(start + 5, end);
      message.image = url;
    }
    if (images.length > 1) {
      const imagesList: string[] = [];
      images.forEach((image) => {
        const style = image.getAttribute("style") || "";
        const start = style.indexOf("url('");
        const end = style.indexOf('")', start);
        const url = style.slice(start + 5, end - 1);
        imagesList.push(url);
      });
      message.images = imagesList;
    }
  }

  const views = root.querySelector(".tgme_widget_message_views");
  if (views) {
    message.views = views.text;
  }

  const time = root.querySelector(".tgme_widget_message_date time");
  if (time) {
    message.time = time.getAttribute("datetime");
  }

  const replyElement = root.querySelector(".tgme_widget_message_reply");
  if (replyElement) {
    message.reply = {};
    const replyId = replyElement.getAttribute("href")?.split("/");
    if (replyId) {
      const messageId = replyId[replyId.length - 1];
      message.reply.id = messageId;
    }
    const replyAuthor = replyElement.querySelector(
      ".tgme_widget_message_author_name"
    );
    if (replyAuthor) {
      message.reply.author = replyAuthor.text;
    }
    const replyText = replyElement.querySelector(
      ".tgme_widget_message_metatext"
    );
    if (replyText) {
      message.reply.text = replyText.text;
    }
  }

  return message;
};

export const postsParser = (root: HTMLElement): TMessage[] => {
  return root
    .querySelectorAll(".tgme_widget_message_wrap")
    .map((messageWrap) => {
      const message: TMessage = {};

      const id = messageWrap
        .querySelector(".tgme_widget_message_date")
        ?.getAttribute("href")
        ?.split("/");

      if (id) {
        const messageId = id[id.length - 1];
        message.id = messageId;
      }

      const user = messageWrap.querySelector(".tgme_widget_message_owner_name");
      if (user) {
        message.user = user.text;
      }

      const text = messageWrap.querySelector(".tgme_widget_message_text");
      if (text) {
        message.text = text.text;
      }

      const images = messageWrap.querySelectorAll(
        ".tgme_widget_message_photo_wrap"
      );
      if (images) {
        if (images.length === 1) {
          const style = images[0].getAttribute("style") || "";
          const start = style.indexOf("url('");
          const end = style.indexOf('")', start);
          const url = style.slice(start + 5, end);
          message.image = url;
        }
        if (images.length > 1) {
          const imagesList: string[] = [];
          images.forEach((image) => {
            const style = image.getAttribute("style") || "";
            const start = style.indexOf("url('");
            const end = style.indexOf('")', start);
            const url = style.slice(start + 5, end - 1);
            imagesList.push(url);
          });
          message.images = imagesList;
        }
      }

      const views = messageWrap.querySelector(".tgme_widget_message_views");
      if (views) {
        message.views = views.text;
      }

      const time = messageWrap.querySelector(".tgme_widget_message_date time");
      if (time) {
        message.time = time.getAttribute("datetime");
      }

      const replyElement = messageWrap.querySelector(
        ".tgme_widget_message_reply"
      );
      if (replyElement) {
        message.reply = {};
        const replyId = replyElement.getAttribute("href")?.split("/");
        if (replyId) {
          const messageId = replyId[replyId.length - 1];
          message.reply.id = messageId;
        }
        const replyAuthor = replyElement.querySelector(
          ".tgme_widget_message_author_name"
        );
        if (replyAuthor) {
          message.reply.author = replyAuthor.text;
        }
        const replyText = replyElement.querySelector(
          ".tgme_widget_message_metatext"
        );
        if (replyText) {
          message.reply.text = replyText.text;
        }
      }

      return message;
    });
};
