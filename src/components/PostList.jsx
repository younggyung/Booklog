import NewPost from "./NewPost";
import Post from "./Post";
import Header from "./Header";
import {useState} from 'react';

function PostList({posts}) {

  return (
    <>    
      {posts.length === 0 && (
        <div style={{ textAlign: "center" }}>
          <h2>작성된 글이 없습니다</h2>
          <p>첫번째 글을 작성해보세요!</p>
        </div>
      )}
      {posts.length > 0 &&
        posts.map((post) => (
          <Post key={Math.random()} title={post.title} body={post.body} />
        ))}
    </>
  );
}

export default PostList;
