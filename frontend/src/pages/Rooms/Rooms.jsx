import React, { useState, useEffect } from "react";
import styles from "./Rooms.module.css";
import { FaSearch } from "react-icons/fa";
import { RiUserAddFill } from "react-icons/ri";
import RoomCard from "../../components/RoomCard/RoomCard";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import { getAllRooms } from "../../http";

const Rooms = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  const onHandleOpenModal = () => setShowModal(true);

  return (
    <div className="container">
      <div className={styles.roomsHeader}>
        <div className={styles.left}>
          <span className={styles.heading}>All voice rooms</span>
          <div className={styles.searchBoxWrapper}>
            <FaSearch />
            <input type="text" className={styles.searchInput} />
          </div>
        </div>
        <div className={styles.right}>
          <button onClick={onHandleOpenModal} className={styles.startRoomBtn}>
            <RiUserAddFill />
            <span>Start Room</span>
          </button>
        </div>
      </div>
      <div className={styles.roomList}>
        {rooms?.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
      {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Rooms;
