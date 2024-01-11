// pages/post/[slug].tsx
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import { getAllPosts, getPostBySlug } from '../../lib/contentful';
import styles from "../../styles/PostDetails.module.scss"
import Navbar from '../../components/Navbar';

interface Post {
   fields: {
     slug: string;
   };
 }

const PostDetailsPage = ({ post }) => {
 return (
  <>
  <Navbar />
    <div className={styles.postContainer}>
      <h1>{post.fields.title}</h1>
      <div>
        <p>{post.fields.summary}</p>
        <h5>Description</h5>
        <p>{post.fields.content.content[0].content[0].value}</p>
        <h5>Author: {post.fields.author.fields.name}</h5>
      </div>
    </div>
  </>

 );
};


export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
   const posts = await getAllPosts();
   const paths = posts.map((post) => ({
     params: { slug: post.fields.slug },
   }));
 
   return {
     paths,
     fallback: false,
   } as GetStaticPathsResult<{ slug: string }>;
 };
 
export const getStaticProps: GetStaticProps = async (context) => {
 const post = await getPostBySlug(context.params.slug as string);
 return {
    props: {
      post,
    },
 };
};

export default PostDetailsPage;