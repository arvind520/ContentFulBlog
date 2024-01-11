import { createClient } from 'contentful';

const client = createClient({
 space: process.env.CONTENTFUL_SPACE_ID,
 accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getAllPosts() {
 const entries = await client.getEntries({
    content_type: 'post',
 });

 return entries.items;
}

export async function getPostBySlug(id) {
 const entries = await client.getEntries({
    content_type: 'post',
 });
 let post = entries.items.find((item)=> item.fields.slug === id);

 return post;
}