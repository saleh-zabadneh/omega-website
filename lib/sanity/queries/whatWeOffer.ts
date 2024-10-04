import { client } from "@/lib/sanity";

export async function getWhatWeOffer() {
  const query = `
    *[_type == "whatWeOffer"] | order(_createdAt asc) {
      _id,
      icon {
        "url": asset->url
      },
      caption,
      title,
      text,
      button {
        icon {
          "url": asset->url
        },
        title
      }
    }
  `;

  return client.fetch(query);
}
