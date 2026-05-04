import { createClient } from "next-sanity";

export const projectId = "du2rbk00";
export const dataset = "production";
export const apiVersion = "2024-05-02";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use the Sanity CDN for faster response times and lower load
});
