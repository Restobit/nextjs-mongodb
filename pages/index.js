import Head from "next/head";

import Nav from "../components/Nav";
import PostCard from "../components/PostCard";
import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
  console.log("posts", posts);
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Nav />

      <main>
        <div className={styles.container}>
          {posts.length === 0 ? (
            <h2>No added posts</h2>
          ) : (
            <ul>
              {posts?.map((post, i) => (
                <PostCard post={post} key={i} />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // get the current environment
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  console.log("dev", dev);
  console.log("DEV_URL", DEV_URL);
  console.log("PROD_URL", PROD_URL);
  console.log("URL", `${dev ? DEV_URL : PROD_URL}/api/posts`);

  // request posts from api
  let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);

  console.log("res ", res);
  // extract the data
  let data = await res.json();
  console.log("data", data);

  return {
    props: {
      posts: data["message"],
    },
  };
}
