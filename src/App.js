import React, { useEffect, useState } from "react";
import Comments from "./components/Comments";
import Post from "./components/Post";
import { data } from "./data";
import "./styles.css";

export const Context = React.createContext();

function App() {
  const [comments, setComments] = useState(data.comments);
  const [openModal, setOpenModal] = useState(false);
  const user = data.currentUser;

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("Comments-App"));
    storage && setComments(storage);
  }, [setComments]);

  return (
    <Context.Provider
      value={{ openModal, setOpenModal, comments, setComments, user }}
    >
      <main className='main'>
        <Comments />
        <div className='post_container'>
          <Post />
        </div>
      </main>
      <div className='attribution'>
        Challenge by
        <a
          href='https://www.frontendmentor.io?ref=challenge'
          target='_blank'
          rel='noreferrer'
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href='https://www.frontendmentor.io?ref=challenge' rel='noreferrer'>
          Glory
        </a>
        .
      </div>
    </Context.Provider>
  );
}

export default App;
