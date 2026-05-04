const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "du2rbk00",
  dataset: "production",
  apiVersion: "2024-05-02",
  useCdn: false,
});

async function testFetch() {
  try {
    const posts = await client.fetch('*[_type == "post"]');
    console.log("POSTS_FOUND:", posts.length);
    console.log("ALL_TYPES:", await client.fetch('array::unique(*._type)'));
  } catch (error) {
    console.error("FETCH_ERROR:", error.message);
  }
}

testFetch();
