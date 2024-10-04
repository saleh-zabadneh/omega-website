import { createClient, type QueryParams } from "@sanity/client";
import { ValidLocale } from "@/config/i18n-config";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2021-10-21",
  useCdn: false,
});

export async function fetchSanity<T>(
  query: string,
  params?: QueryParams & { lang?: ValidLocale }
): Promise<T> {
  return client.fetch<T>(query, params as Record<string, unknown>, {
    cache: "no-store",
  });
}
