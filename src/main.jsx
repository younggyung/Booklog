import React from "react";
import ReactDOM from "react-dom/client";
import Posts, { loader as postsLoader } from "./routes/Posts.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewPost, { action as newpostAction } from "./routes/NewPost.jsx";
import RootLayout from "./routes/RootLayout.jsx";
import PostDetail, {
  loader as postDetailLoader,
} from "./routes/Postdetail.jsx";
import Editor from "./routes/Editor.jsx";
import BookSearch from "./routes/BookSearch.jsx";
import UpdatePost, { action as updateAction } from "./routes/UpdatePost.jsx";

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
        element: <Editor />,
        action: newpostAction,
      },
      {
        path: "post/:id",
        element: <PostDetail />,
        id: "post",
        loader: postDetailLoader,
        children: [],
      },
      {
        path: "post/:id/update",
        element: <UpdatePost />,
        action: updateAction,
        loader: postDetailLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
