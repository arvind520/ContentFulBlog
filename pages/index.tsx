import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllPosts } from "../lib/contentful";
import algoliasearch from "algoliasearch";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import styles from "../styles/PostsList.module.scss";
const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_SEARCH_API_KEY
);

const index = client.initIndex("myassessment");

const IndexPage = ({ posts }) => {

  return (
    <div >
      <Navbar />
      <SearchBar />
      <div className={styles.postSection}>
        {posts.map((post) => (
            <div key={post.sys.id} className={styles.postCard}>
            <h2>{post.fields.title}</h2>
            <p>{post.fields.summary}</p>
            <Link  href={`/post/${post.fields.slug}`}>
            Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

async function clearAndAddPostsToAlgolia() {
  try {
    // Clear all records in the "myassessment" index
    await index.clearObjects();

    // Get all posts from Contentful
    const posts = await getAllPosts();

    // Transform the posts to the format expected by Algolia
    const transformedPosts = posts.map((post) => ({
      title: post.fields.title,
      slug: post.fields.slug,
      summary: post.fields.summary,
      content: (post.fields.content as any).content[0].content[0].value,
      // add any other fields you want to index here
    }));

    // Add the transformed posts to the "myassessment" index
    await index.saveObjects(transformedPosts, {
      autoGenerateObjectIDIfNotExist: true,
    });

    console.log("All posts have been added to Algolia");
  } catch (error) {
    console.error("Error clearing and adding posts to Algolia:", error);
  }
}

export const getStaticProps: GetStaticProps = async () => {
  // Call the function to clear and add posts to Algolia
  await clearAndAddPostsToAlgolia();

  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
};

export default IndexPage;
