import { useLoaderData, defer } from "react-router-dom";
import { useState, useEffect } from "react";
import Post from "./Post";
import classes from "./PostList.module.css";
import Pagination from "./Pagination";

function PostList() {
  //defferdData (프로미스 객체 그대로 받아온다)
  const { resData } = useLoaderData();

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resDataValue = await resData;
        setPosts(resDataValue);
        setIsLoading(false);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [resData]);

  return (
    <>
      {isLoading && (
        <h3 className={classes.loading}>
          잠시만요! 데이터를 받아오고 있어요😉 조금 느리지만 착한친구랍니다<span className={classes.loadingAnimation}></span>
        </h3>
      )}
      {!isLoading && posts.length === 0 && (
        <div style={{ textAlign: "center" }}>
          <h2>작성된 글이 없습니다</h2>
          <p>첫번째 글을 작성해보세요!</p>
        </div>
      )}
      {!isLoading && posts.length > 0 && (
        <>
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
          <div className={classes.howmany}>
            <span>게시글 수</span>
            <select
              onChange={(e) => {
                setLimit(e.target.value);
              }}
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
          <Pagination
            total={posts.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
}

export default PostList;
export async function loader() {
  const responsePromise = fetch("https://seed-foggy-apartment.glitch.me/posts");
  const resDataPromise = responsePromise.then((response) => response.json());

  const deferredData = defer({
    resData: resDataPromise,
  });

  return deferredData;
}
