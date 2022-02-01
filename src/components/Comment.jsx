import React, { useContext, useState } from "react";
import Post from "./Post";
import { Context } from "../App";
import DeleteModal from "./DeleteModal";
import plus from "../images/icon-plus.svg";
import minus from "../images/icon-minus.svg";
import reply from "../images/icon-reply.svg";
import edit from "../images/icon-edit.svg";
import trash from "../images/icon-delete.svg";

function Comment({
  rep,
  comment,
  increase,
  decrease,
  handleDelete,
  index,
  arrId,
  handleUpdate,
}) {
  const [replyMode, setReplyMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [update, setUpdate] = useState(comment.content);

  const { setOpenModal } = useContext(Context);

  return (
    <>
      <DeleteModal
        handleDelete={handleDelete}
        id={comment.id}
        index={index}
        arrId={arrId}
      />
      <div className='comment'>
        {/*------------- Desktop -------------------*/}
        <div className='comment_score desktop'>
          <img
            onClick={() => {
              increase(comment.id, index, arrId);
            }}
            className='comment_score_img'
            src={plus}
            alt=''
          />
          <p className='comment_score_num'>{comment.score}</p>
          <img
            className='comment_score_img'
            onClick={() => {
              decrease(comment.id, index, arrId);
            }}
            src={minus}
            alt=''
          />
        </div>
        {/*------------- Desktop -------------------*/}
        <div className='comment_content'>
          <div className='comment_content_top'>
            <div className='comment_content_top_first'>
              <img
                className='comment_content_top_item image'
                src={comment.user.image.png.default}
                alt=''
              />
              <p className='comment_content_top_item username'>
                {comment.user.username}
              </p>{" "}
              {comment.user.username === "juliusomo" && (
                <p className='comment_content_top_item you'>you</p>
              )}
              <p className='comment_content_top_item timeStamp'>
                {comment.createdAt}
              </p>
            </div>
            {/*------------- Desktop -------------------*/}
            <div className='comment_content_top_second desktop'>
              {comment.user.username === "juliusomo" ? (
                <div className='actions_container'>
                  <div
                    onClick={() => setOpenModal(true)}
                    className='action_item'
                  >
                    <div className='hover_cover'></div>
                    <img src={trash} alt='' />
                    <span className='comment_content_top_second_text delete'>
                      Delete
                    </span>
                  </div>
                  <div
                    onClick={() => setEditMode(!editMode)}
                    className='action_item'
                  >
                    <div className='hover_cover'></div>
                    <img src={edit} alt='' />
                    <span className='comment_content_top_second_text'>
                      Edit
                    </span>
                  </div>
                </div>
              ) : (
                !rep && (
                  <div
                    onClick={() => setReplyMode(!replyMode)}
                    className='action_item'
                  >
                    <div className='hover_cover'></div>
                    <img src={reply} alt='' />
                    <span className='comment_content_top_second_text'>
                      Reply
                    </span>
                  </div>
                )
              )}
            </div>
            {/*------------- Desktop -------------------*/}
          </div>
          <div className='comment_content_main'>
            {" "}
            <span className='replingTo'>
              {comment.replyingTo && `@${comment.replyingTo}`}
            </span>{" "}
            {editMode ? (
              <>
                <textarea
                  className='post_input'
                  value={update}
                  onChange={(e) => {
                    setUpdate(e.target.value);
                  }}
                ></textarea>
                <button
                  onClick={() => {
                    handleUpdate(comment.id, update, index, arrId);
                    setEditMode(false);
                  }}
                  className='btn postBtn'
                >
                  Update
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className='btn cancelBtn'
                >
                  Cancel
                </button>
              </>
            ) : (
              comment.content
            )}
          </div>
        </div>
        {/*------------- Mobile -------------------*/}
        <div className='mobile_controls'>
          <div className='comment_score mobile'>
            <img
              onClick={() => {
                increase(comment.id, index, arrId);
              }}
              className='comment_score_img'
              src={plus}
              alt=''
            />
            <p className='comment_score_num'>{comment.score}</p>
            <img
              className='comment_score_img'
              onClick={() => {
                decrease(comment.id, index, arrId);
              }}
              src={minus}
              alt=''
            />
          </div>

          <div className='comment_content_top_second mobile'>
            {comment.user.username === "juliusomo" ? (
              <div className='actions_container'>
                <div onClick={() => setOpenModal(true)} className='action_item'>
                  <div className='hover_cover'></div>
                  <img src={trash} alt='' />
                  <span className='comment_content_top_second_text delete'>
                    Delete
                  </span>
                </div>
                <div
                  onClick={() => setEditMode(!editMode)}
                  className='action_item'
                >
                  <div className='hover_cover'></div>
                  <img src={edit} alt='' />
                  <span className='comment_content_top_second_text'>Edit</span>
                </div>
              </div>
            ) : (
              !rep && (
                <div
                  onClick={() => setReplyMode(!replyMode)}
                  className='action_item'
                >
                  <div className='hover_cover'></div>
                  <img src={reply} alt='' />
                  <span className='comment_content_top_second_text'>Reply</span>
                </div>
              )
            )}
          </div>
        </div>
        {/*------------- Mobile -------------------*/}
      </div>

      <div style={{ display: replyMode ? "block" : "none" }}>
        <Post
          replyMode={replyMode}
          setReplyMode={setReplyMode}
          comment={comment}
        />
      </div>
    </>
  );
}

export default Comment;
