export const endpoints: TEndpoint[] = [
  {
    title: "Retrieve Channel Information",
    description: "Fetches detailed information about a specific channel.",
    api: "api/info/:username",
    pathParams: { username: "The unique identifier of the channel." },
    request: "https://tcs.jinc.team/api/info/abdeta_terefe",
    response: `{
  "username": "@abdeta_terefe",
  "name": "Abdi",
  "description": "Personal blogs and writing channel.\\nVisit my website for more about me.\\nhttps://abdeta.vercel.app",
  "image": "https://cdn4.cdn-telegram.org/file/b3uV1U-66y1Ce0SV_3LWtcy1OSTvdsIAHmk_vonfxdu3ituTpcp-w5og_svrPbp8fJD3m2N1CeSfWJ_9Mw1nOxZMIBkAqBaf7Ups8Q72kb2eDflhyDv5oUOeW84tp1NmP2CU7RpW5GQiDd8N--fMVA8M91jFZIhlGnn6fKzQFGsclxvZveu55JFjKyBKMYNDWVoYkfJO8z7UogMzPYo3wDJWsnTbfqLDIEOOnZxQ8KsvPmGze2UQKjxww2LFWaXfXUQW9oJWNNPHg44GhXblbTs29RChUKZ56RukdUr2KQw-44EJq8XfT-dKdlvJbbbYMMVIZB0SeZBibBGrwfLeBw.jpg",
  "subscribers": "18",
  "photos": "61",
  "videos": "4",
  "files": "3",
  "links": "10"
}`,
  },
  {
    title: "Retrieve Single Post",
    description:
      "Fetches detailed information about a specific post within a channel.",
    api: "api/post/:username/:id",
    pathParams: {
      username: "The unique identifier of the channel.",
      id: "The unique identifier of the post.",
    },
    request: "https://tcs.jinc.team/api/post/abdeta_terefe/101",
    response: `{
  "id": "101",
  "user": "Abdi",
  "text": "Deno is actually great.",
  "views": "81",
  "time": "2023-11-29T17:44:51+00:00"
}`,
  },
  {
    title: "Retrieve Channel Posts",
    description: "Fetches the most recent 20 posts from a specific channel.",
    api: "api/posts/:username",
    pathParams: { username: "The unique identifier of the channel" },
    queryParams: {
      before: "Fetches 20 posts preceding a specific post ID",
      after: "Fetches 20 posts following a specific post ID",
    },
    request: "https://tcs.jinc.team/api/posts/abdeta_terefe?after=111",
    response: `[
  {
    "id": "113",
    "user": "Abdi",
    "images": [
      "https://cdn4.cdn-telegram.org/file/e4VQjgPyb5u3-rcWsIs4Xs8cHKp8iAwyEN-ZFUEhmlxWgHh-1HzP56pT9OGokTDFl-ajdKWcT2WLODlPtWkoCOIjeFbXvCv7LcdCuNn_wWopA_yaAHfHsssXRDw32xK9fG0hbtzkzD7Gj7xWysu3gBJSY2YQ02I6TDbrGMV1Tz9Dra7MPp6DpnHJIVTb3lNchyZLdAK8ihM87N3GHV1iSiegda9R35iGxuixoGxhUbP6LnCNhYSpTnY-fmMlENLBK7Q2QK6na8U-hg5MSjezeZs91lfRqrtmf2b1kqzCgc95Imwk2c2y4NVcVNkDfhvT7Uie7SqPHS8KAROKqelCFw.jpg",
      "https://cdn4.cdn-telegram.org/file/hPBXXhoGgGpNwAFAWtDsjcJLe6M7c_YXlv9r9QKhZqgO8FjuWeDGafi4LKdWst7lyP2opVrETF408Y6LAlRzXBAscUvtKeoglIcXrhoaematICIzrSoKfXW2UsOesmjpRTVxy3GlcyRNibEqpwm37qonE0-7Z_LNBWvq2Cr5cWPoIdJtUJRiHoI2Qtbh_Kxvgg8RHj2gdrSea962Mcyeo0JdzMC4tk838U3s-XvtBITlkwmTTj-_CdRtnwxSm87mg-PC6ccNiTSnQ63ydwKlNwHiuVTQi-WUJBjK7DsQO8F_L16Dl9DpRwwDZqPA_YwZDo3u9KkR_N7f6T2dT5ahRQ.jpg"
    ],
    "views": "139",
    "time": "2024-01-20T12:25:19+00:00"
  },
  {
    "id": "116",
    "user": "Abdi",
    "text": "https://github.com/abdetaterefe/phone_recap",
    "views": "145",
    "time": "2024-01-20T14:26:47+00:00",
    "reply": {
      "id": "111",
      "author": "Abdi"
    }
  }
]`,
  },
  {
    title: "Retrieve Search Results",
    description:
      "Fetches the most recent 20 posts that match a specific search query.",
    api: "api/search/:username",
    pathParams: { username: "The unique identifier of the channel." },
    queryParams: { query: "The search term or phrase." },
    request: "https://tcs.jinc.team/api/search/abdeta_terefe?query=java",
    response: `[
  {
    "id": "60",
    "user": "Abdi",
    "text": "a simple Java project that scraps websites and saves data in JSON format.",
    "image": "https://cdn4.cdn-telegram.org/file/lFiUEitq5wavzL0TafcRQBAKftwIQlPB0OI49NggCEy2VPYfR3MJckyQJWN5Ppb3QCQuaNo9yDu8_QtBEDrp2j2aNg5Q-V1xhOx9GmuE9ILzjkSH8y3Fzn45sp2pTnq6qPRMFvgZSK2bRUG8apieFWUumoOfEHK5szD0cCtQdoKsd7fW51k7TbZZhQnSKpOm_RFN4HdzP4708LO1Dz1jIJfSKvMu-aV_dHI7Lmdv4oZPYkezymx29d8VPFdpLu5vvovfTsIZjSDX8dYPrmdZTG4KyPZdK2XW5A9i1jJtwX9Nv2sdQfRJZU2LytkDifDFluHl7eXjNGl3wAyT6fgV7A.jpg'",
    "views": "50",
    "time": "2023-04-18T17:47:14+00:00"
  }
]`,
  },
];
