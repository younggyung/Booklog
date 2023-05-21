import PostList from "./components/PostList";
import Header from "./components/Header";
import NewPost from "./components/NewPost";
import {useState} from 'react';

function App() {
  const [postingMode, setPostingMode] = useState(false);
  const [posts, setPosts] = useState([]);

  function addPostHandler(postData) {
    const newPosts = [...posts];
    newPosts.push(postData);
    setPosts(newPosts);
    hideModal();
  }

  function hideModal(){
    setPostingMode(false);
  }

  function showModal(){
    setPostingMode(true);
  }
  return (
    <>
      <Header onPosting={showModal}/>
      {postingMode && <NewPost closePosting={hideModal} savePost={addPostHandler}/>}
      {!postingMode && <PostList posts={posts}/>}
    </>
  );
}

export default App;
