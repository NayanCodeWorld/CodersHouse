import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RoomCard.module.css";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/room/${room.id}`)} className={styles.card}>
      <h3 className={styles.topic}>{room.topic}</h3>
      <div
        className={`${styles.speakers} ${
          room.speakers.length === 1 ? styles.singleSpeaker : ""
        }`}
      >
        <div className={styles.avatar}>
          {room.speakers.map((speaker) => (
            <img key={speaker.id} src={speaker.avatar} alt={speaker.name} />
          ))}
        </div>
        <div className={styles.names}>
          {room.speakers.map((speaker) => (
            <div className={styles.nameWraper} key={speaker.id}>
              <span className="name">{speaker.name}</span>
              <IoChatbubbleEllipsesOutline />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.peoplecount}>
        <span>{room.totalPeople}</span>
        <FaUsers />
      </div>
    </div>
  );
};

export default RoomCard;
