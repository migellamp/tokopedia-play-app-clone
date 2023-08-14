import * as React from "react";
import axios from "axios";
import "./style.css";
import { io } from "socket.io-client";
import { Box, Input, Modal, Button, Typography } from "@mui/material";
import { AvatarGenerator } from "random-avatar-generator";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../../context/user";

const Chat = ({ id }) => {
  const socket = io.connect(process.env.REACT_APP_API_URL);
  const { userInfo, setUserInfo } = React.useContext(UserContext);
  // eslint-disable-next-line
  const [listComment, setListComment] = React.useState([]);
  const [listAvatars, setListAvatars] = React.useState([]);
  const [selectedId, setSelectedIds] = React.useState("");
  const [selectedAvatars, setSelectedAvatars] = React.useState("");

  const [comment, setComment] = React.useState("");
  const [userType, setUserType] = React.useState("Anon");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const getLiveChat = async () => {
    try {
      const chatList = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/comment/${id}`
      );
      setListComment(chatList.data.comment);
    } catch (error) {
      console.log(error);
    }
  };

  const getComment = (e) => {
    setComment(e.target.value);
  };

  const sendComment = (event) => {
    event.preventDefault();
    if (
      sessionStorage.getItem("user") === "" ||
      sessionStorage.getItem("user") === null
    ) {
      handleOpen();
    } else {
      const timeComment = new Date().toLocaleString();
      const commentObj = {
        username: sessionStorage.getItem("user"),
        profilePictue: sessionStorage.getItem("avatar"),
        comment: comment,
        timeStamp: timeComment,
        videoId: id.toString(),
      };
      socket.emit("chatmessage", commentObj);
    }
    setComment("");
  };

  const messageEl = React.useRef(null);

  React.useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({
          top: target.scrollHeight,
          behavior: "smooth",
          block: "nearest",
          inline: "block",
        });
      });
    }
  }, []);

  const setAvatar = (id) => {
    setSelectedIds(id);
  };

  const setAvatars = (id) => {
    setAvatar(id);
    setSelectedAvatars(listAvatars[id]);
  };

  React.useEffect(() => {
    setListAvatars("");
    for (let i = 0; i < 5; i++) {
      let generator = new AvatarGenerator();
      let newAvatar = generator.generateRandomAvatar();
      setListAvatars((prev) => [...prev, newAvatar]);
    }
  }, []);

  const generateAvatar = () => {
    setListAvatars("");
    for (let i = 0; i < 5; i++) {
      let generator = new AvatarGenerator();
      let newAvatar = generator.generateRandomAvatar();
      setListAvatars((prev) => [...prev, newAvatar]);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    getLiveChat();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const eventListener = (data) => {
      setListComment((prev) => [...prev, data]);
    };
    socket.on("message", eventListener);
    return () => socket.off("message", eventListener);
  }, [socket]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const submitUsername = (event) => {
    event.preventDefault();
    sessionStorage.setItem("avatar", listAvatars[selectedId]);
    sessionStorage.setItem("user", userType);
    const userObj = {
      username: userType,
      avatar: listAvatars[selectedId],
    };
    setUserInfo(userObj);
    handleClose();
  };

  return (
    <>
      <div className="container-comment">
        <h6 className="liveChat">Live Chat</h6>
        <div className="container-list-comment" ref={messageEl}>
          {listComment !== null
            ? listComment?.map((val, id) => {
                return (
                  <div key={id}>
                    <div className="comment-bar">
                      <img
                        src={val.profilePictue}
                        alt=""
                        width={25}
                        className="mb-2"
                      />
                      <h6 className="comment-list-user">
                        <span className="comment-username">{val.username}</span>
                        <span className="comment-body">{val.comment}</span>
                      </h6>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Masukkan Username
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              Pilih Avatar{" "}
              {sessionStorage.getItem("avatar") !== null && (
                <button
                  className="buttonChangeUsername"
                  onClick={generateAvatar}
                >
                  generate new?
                </button>
              )}
              <div
                className="list-avatar-section"
                style={{ display: "flex", flexDirection: "row" }}
              >
                {listAvatars.map((val, id) => {
                  return (
                    <button
                      className="buttonAvatar"
                      key={id}
                      style={{ background: "none", border: "none" }}
                      onClick={() => setAvatars(id)}
                    >
                      <img src={val} alt="" width={50} />
                    </button>
                  );
                })}
              </div>
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              Masukkan username terlebih dahulu untuk dapat masuk kedalam live
              chat.
            </Typography>
            <form onSubmit={submitUsername}>
              <img
                src={selectedAvatars}
                alt=""
                width={40}
                style={{ marginRight: 15 }}
              />
              <Input
                placeholder="Masukkan Username ..."
                onChange={(e) => setUserType(e.target.value)}
                style={{ width: 200 }}
              ></Input>

              <Button onClick={submitUsername}>Enter</Button>
            </form>
          </Box>
        </Modal>
        <div className="container-user-input">
          <div className="image-user">
            {sessionStorage.getItem("user") !== null ? (
              <img src={sessionStorage.getItem("avatar")} alt="" width={40} />
            ) : null}
          </div>
          <div className="input-user">
            <h6>
              {sessionStorage.getItem("user") !== null ? (
                <>
                  {sessionStorage.getItem("user")}
                  <button
                    className="buttonChangeUsername ml-1"
                    onClick={handleOpen}
                  >
                    change?
                  </button>
                </>
              ) : null}
            </h6>
            <form onSubmit={sendComment}>
              <div className="insert-comment">
                <input
                  type="text"
                  className="inputComment"
                  placeholder="Comment"
                  onChange={getComment}
                  value={comment}
                  onClick={
                    sessionStorage.getItem("user") === null ? handleOpen : null
                  }
                />
                <button className="sendButton">{<SendIcon />}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
