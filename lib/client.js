import sanityClient from "@sanity/client";
import { ImageUrlBuilder } from "next-sanity-image";

export const client = sanityClient({
  projectId: "nuydtbop",
  dataset: "production",
  apiVersion: "2023-04-01",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
