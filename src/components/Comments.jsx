import { useContext } from "react";
import { Context } from "../App";
import Comment from "./Comment";

function Comments() {
  const { comments, setComments } = useContext(Context);
  const isAReply = true;

  const handleCommentScoreIncrease = (id) => {
    const newArr = comments.map((item) => {
      item.id === id &&
        (item = {
          id: item.id,
          content: item.content,
          createdAt: item.createdAt,
          user: item.user,
          score: item.score + 1,
          replies: item.replies,
        });

      return item;
    });
    setComments(newArr);
    localStorage.setItem("Comments-App", JSON.stringify(newArr));
  };
  const handleCommentScoreDecrease = (id) => {
    const newArr = comments.map((item) => {
      item.id === id &&
        (item = {
          id: item.id,
          content: item.content,
          createdAt: item.createdAt,
          user: item.user,
          score: item.score - 1,
          replies: item.replies,
        });
      return item;
    });
    setComments(newArr);
    localStorage.setItem("Comments-App", JSON.stringify(newArr));
  };

  const handleReplyScoreIncrease = (id, index, arrId) => {
    const newArr = comments[index].replies.map((item) => {
      item.id === id &&
        (item = {
          id: item.id,
          content: item.content,
          createdAt: item.createdAt,
          user: item.user,
          score: item.score + 1,
          replyingTo: item.replyingTo,
        });
      return item;
    });
    const newState = comments.map((single) => {
      single.id === arrId &&
        (single = {
          id: single.id,
          content: single.content,
          createdAt: single.createdAt,
          user: single.user,
          username: single.username,
          score: single.score,
          replies: newArr,
        });
      return single;
    });
    setComments(newState);
    localStorage.setItem("Comments-App", JSON.stringify(newState));
  };
  const handleReplyScoreDecrease = (id, index, arrId) => {
    const newArr = comments[index].replies.map((item) => {
      item.id === id &&
        (item = {
          id: item.id,
          content: item.content,
          createdAt: item.createdAt,
          user: item.user,
          score: item.score - 1,
          replyingTo: item.replyingTo,
        });
      return item;
    });
    const newState = comments.map((single) => {
      single.id === arrId &&
        (single = {
          id: single.id,
          content: single.content,
          createdAt: single.createdAt,
          user: single.user,
          score: single.score,
          replies: newArr,
        });
      return single;
    });
    setComments(newState);
    localStorage.setItem("Comments-App", JSON.stringify(newState));
  };

  const handleCommentUpdate = (id, update) => {
    const newArr = comments.map((item) => {
      item.id === id &&
        (item = {
          id: item.id,
          content: update,
          createdAt: item.createdAt,
          user: item.user,
          score: item.score,
          replies: item.replies,
        });

      return item;
    });
    setComments(newArr);
    localStorage.setItem("Comments-App", JSON.stringify(newArr));
  };
  const handleReplyUpdate = (id, update, index, arrId) => {
    const newArr = comments[index].replies.map((item) => {
      item.id === id &&
        (item = {
          id: item.id,
          content: update,
          createdAt: item.createdAt,
          user: item.user,
          score: item.score,
          replyingTo: item.replyingTo,
        });
      return item;
    });
    const newState = comments.map((single) => {
      single.id === arrId &&
        (single = {
          id: single.id,
          content: single.content,
          createdAt: single.createdAt,
          user: single.user,
          username: single.username,
          score: single.score,
          replies: newArr,
        });
      return single;
    });
    setComments(newState);
    localStorage.setItem("Comments-App", JSON.stringify(newState));
  };

  const handleCommentDelete = (id) => {
    const newArr = [...comments];
    const newState = newArr.filter((index) => index.id !== id);
    setComments(newState);
    localStorage.setItem("Comments-App", JSON.stringify(newState));
  };
  const handleReplyDelete = (id, index, arrId) => {
    const newRep = comments[index].replies.filter((item) => item.id !== id);
    const newState = comments.map((single) => {
      single.id === arrId &&
        (single = {
          id: single.id,
          content: single.content,
          createdAt: single.createdAt,
          user: single.user,
          username: single.username,
          score: single.score,
          replies: newRep,
        });
      return single;
    });
    setComments(newState);
    localStorage.setItem("Comments-App", JSON.stringify(newState));
  };
  return (
    <div>
      {comments.map((item, index) => (
        <div key={item.id}>
          <div className='comment-container'>
            <Comment
              handleDelete={handleCommentDelete}
              increase={handleCommentScoreIncrease}
              decrease={handleCommentScoreDecrease}
              handleUpdate={handleCommentUpdate}
              comment={item}
            />
          </div>
          {item.replies.map((item2) => (
            <div key={item2.id} className='reply-container'>
              <Comment
                rep={isAReply}
                index={index}
                comment={item2}
                arrId={item.id}
                increase={handleReplyScoreIncrease}
                decrease={handleReplyScoreDecrease}
                handleUpdate={handleReplyUpdate}
                handleDelete={handleReplyDelete}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Comments;
