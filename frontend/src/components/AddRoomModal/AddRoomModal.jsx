import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddRoomModal.module.css";
import TextInput from "../shared/TextInput/TextInput";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { MdCelebration } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { createRoom } from "../../http";

const AddRoomModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");

  const onCreateRoom = async () => {
    try {
      if (!topic) return;
      const { data } = await createRoom({ topic, roomType });
      navigate(`/room/${data.id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeBtn}>
          <IoMdClose />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <TextInput
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            fullwidth="true"
          />
          <h2 className={styles.subHeading}>Room Types</h2>
          <div className={styles.roomsTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <BsGlobeCentralSouthAsia className={styles.typeLogo} />
              <span>Open</span>
            </div>
            <div
              onClick={() => setRoomType("social")}
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
            >
              <IoIosPeople className={styles.typeLogo} />
              <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
            >
              <RiGitRepositoryPrivateFill className={styles.typeLogo} />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button onClick={onCreateRoom} className={styles.footerButton}>
            <MdCelebration className={styles.footerIcon} />
            Let's go
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
