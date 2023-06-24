import React from "react";
import ReactDOM from "react-dom/client";
import Posts from "./routes/Posts.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/RootLayout.jsx";
import PostDetail, {
  loader as postDetailLoader,
} from "./routes/Postdetail.jsx";
// import Editor, {action as EditorAction} from "./routes/Editor.jsx";
import Editor from "./routes/Editor.jsx";
import BookSearch from "./routes/BookSearch.jsx";
import UpdatePost from "./routes/UpdatePost.jsx";
import Login from "./routes/Login.jsx";
import { loader as postsLoader } from "./components/PostList.jsx";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Posts />,
        loader: postsLoader,
        children:[ { path: "/search-books", element: <BookSearch /> },
      ]
      },
      {
        path: "/newpost",
        element: <Editor/>,
        //action: EditorAction,
      },
      {
        path: "post/:id",
        element: <PostDetail />,
        id: "post",
        loader: postDetailLoader,
      },
      {
        path: "post/:id/update",
        element: <UpdatePost />,
        loader: postDetailLoader,
      },
      {
        path: "login",
        element: <Login />,
      } ]},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
