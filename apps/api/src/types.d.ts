interface TInfo {
  username?: string;
  name?: string;
  description?: string;
  image?: string;
  subscribers?: string;
  photos?: string;
  videos?: string;
  files?: string;
  links?: string;
}

interface TReply {
  id?: string;
  text?: string;
  author?: string;
}

interface TMessage {
  id?: string;
  user?: string;
  text?: string;
  image?: string;
  images?: string[];
  views?: string;
  time?: string;
  reply?: Reply;
}
