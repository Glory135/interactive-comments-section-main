import { useContext, useState } from "react";
import { Context } from "../App";
import "../styles.css";

function Post({ replyMode, setReplyMode, comment }) {
  const [post, setPost] = useState("");
  const { comments, setComments, user } = useContext(Context);

  const handlePost = () => {
    const newArr = [...comments];
    const time = new Date().toDateString();
    const randomNum = Math.floor(Math.random() * 100);
    newArr.push({
      id: comments.length + randomNum,
      content: post,
      createdAt: time,
      user: user.user,
      username: user.user.username,
      replies: [],
      score: 0,
    });
    setComments(newArr);
    localStorage.setItem("Comments-App", JSON.stringify(newArr));
    setPost("");
  };
  const handleReply = () => {
    const newRep = [...comment.replies];
    const time = new Date().toDateString();
    const randomNum = Math.floor(Math.random() * 100);
    newRep.push({
      id: newRep.length + randomNum,
      content: post,
      createdAt: time,
      user: user.user,
      score: 0,
      replyingTo: comment.user.username,
    });
    const newState = comments.map((single) => {
      single.id === comment.id &&
        (single = {
          id: single.id,
          content: single.content,
          createdAt: single.createdAt,
          user: single.user,
          score: single.score,
          replies: newRep,
        });
      return single;
    });
    setPost("");
    setReplyMode(false);
    setComments(newState);
    localStorage.setItem("Comments-App", JSON.stringify(newState));
  };

  return (
    <div className='comment'>
      {/* -------Desktop------------- */}
      <div className='post_img_container desktop'>
        <img className='post_img' src={user.user.image.png.default} alt='' />
      </div>
      {/* -------Desktop------------- */}
      <div className='post_input_container'>
        <textarea
          placeholder='Add a comment...'
          className='post_input'
          value={post}
          onChange={(e) => {
            setPost(e.target.value);
          }}
        ></textarea>
      </div>
      {/* -------Desktop------------- */}
      <div className='post_action_container desktop'>
        <button
          onClick={replyMode ? handleReply : handlePost}
          className='btn postBtn'
        >
          {replyMode ? "REPLY" : "SEND"}
        </button>
        {replyMode && (
          <button onClick={() => setReplyMode(false)} className='btn cancelBtn'>
            Cancel
          </button>
        )}
      </div>
      {/* -------Desktop------------- */}

      {/* -------mobile------------- */}
      <div className='mobile_post'>
        <div className='post_img_container mobile'>
          <img className='post_img' src={user.user.image.png.default} alt='' />
        </div>
        <div className='post_action_container mobile'>
          <button
            onClick={replyMode ? handleReply : handlePost}
            className='btn postBtn'
          >
            {replyMode ? "REPLY" : "SEND"}
          </button>
          {replyMode && (
            <button
              onClick={() => setReplyMode(false)}
              className='btn cancelBtn'
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      {/* -------mobile------------- */}
    </div>
  );
}

export default Post;
