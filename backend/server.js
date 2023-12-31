require("dotenv").config();
const express = require("express");
const DBConnection = require("./dataBase");
const router = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const ACTIONS = require("./actions");

const app = express();
DBConnection(); // DB Connection

// socket.io initialization
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

app.use("/storage", express.static("storage"));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(express.json({ limit: "8mb" }));
app.use(router);

// Socket logic
const socketUserMapping = {};

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  // add peer
  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMapping[socket.id] = user;

    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
        user,
      });
      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
        user: socketUserMapping[clientId],
      });
    });
    socket.join(roomId);
  });

  // handle realy ice
  socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  //handle realy sdp ( session description )
  socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  });

  // Leaving the room
  const leaveRoom = ({ roomId }) => {
    const { rooms } = socket;
    Array.from(rooms).forEach((roomId) => {
      const clients = Array.from(io.socket.adapters.rooms.get(roomId) || []);
      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
          userId: socketUserMapping[socket.id]?.id,
        });
        socket.emit(ACTIONS.REMOVE_PEER, {
          peerId: clientId,
          userId: socketUserMapping[clientId]?.id,
        });
      });
      socket.leave(roomId);
    });
    delete socketUserMapping[socket.id];
  };

  socket.on(ACTIONS.LEAVE, leaveRoom);
  socket.on("disconnecting", leaveRoom);
});

server.listen(process.env.PORT, () =>
  console.log(`Port listening on ${process.env.PORT}`)
);
