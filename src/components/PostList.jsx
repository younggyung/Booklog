import { useLoaderData } from "react-router-dom";
import Post from "./Post";
import classes from "./PostList.module.css";

function PostList() {
  const posts = useLoaderData();
  console.log(posts)

  return (
    <>
      {posts.length === 0 && (
        <div style={{ textAlign: "center" }}>
          <h2>작성된 글이 없습니다</h2>
          <p>첫번째 글을 작성해보세요!</p>
        </div>
      )}
      {posts.length > 0 && (
        <ul className={classes.postlist}>
          {posts.map((post) => (
            <Post
              key={Math.random()}
              title={post.title}
              body={
                post.body.length >= 200
                  ? post.body.replace(/(<([^>]+)>)/gi, "").slice(0, 200)+' ...'
                  : post.body.replace(/(<([^>]+)>)/gi, "")
              }
              date={post.date}
              id={post.id}
              category={post.category}
              writeDate={post.writeDate}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default PostList;
