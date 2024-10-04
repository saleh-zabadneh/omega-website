import { client } from "@/lib/sanity";

export async function getSteps() {
  const query = `
    *[_type == "steps"] | order(_createdAt asc) {
      _id,
      icon {
        "url": asset->url
      },
      title
    }
  `;

  return client.fetch(query);
}
