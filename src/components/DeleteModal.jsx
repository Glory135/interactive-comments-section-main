import { useContext } from "react";
import { Context } from "../App";
import { makeStyles, Modal, Container } from "@material-ui/core";
import "../styles.css";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 350,
    height: 200,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    borderRadius: 10,
    border: 0,
    outline: 0,
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
      hwight: "50vh",
    },
  },
  para: {
    color: "#b7b9bb",
    fontSize: 16,
  },
  btn_container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));
function DeleteModal({ handleDelete, id, index, arrId }) {
  const { openModal, setOpenModal } = useContext(Context);
  const classes = useStyles();
  return (
    <div>
      <Modal open={openModal}>
        <Container className={classes.container}>
          <h3>Delete Comment</h3>
          <p className={classes.para}>
            Are you sure you want to delete this comment? This will remove this
            comment and cannot be undone.
          </p>
          <div className={classes.btn_container}>
            <button
              onClick={() => setOpenModal(false)}
              className='btn deleteCancel'
            >
              No, Cancel
            </button>
            <button
              onClick={() => {
                handleDelete(id, index, arrId);
                setOpenModal(false);
              }}
              className='btn cancelBtn'
            >
              Yes, Delete
            </button>
          </div>
        </Container>
      </Modal>
    </div>
  );
}

export default DeleteModal;
