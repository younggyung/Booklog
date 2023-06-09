import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Post from "./Post";
import classes from "./PostList.module.css";
import Pagination from "./Pagination";

function PostList() {
  const posts = useLoaderData();
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

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
          {posts.slice(offset, offset + limit).map((post) => (
            <Post
              key={Math.random()}
              title={post.title}
              body={
                post.body.length >= 200
                  ? post.body.replace(/(<([^>]+)>)/gi, "").slice(0, 200) +
                    " ..."
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
      <Pagination
        total={posts.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </>
  );
}

export default PostList;
