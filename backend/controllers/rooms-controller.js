const RoomDto = require("../dtos/room-dto");
const roomService = require("../services/room-service");

class RoomsController {
  // Create a new Room
  async create(req, res) {
    const { topic, roomType } = req.body;

    if (!roomType || !topic) {
      return res
        .status(400)
        .json({ message: "Room type and topic is required" });
    }

    const room = await roomService.create({
      topic,
      roomType,
      ownerId: req.user.id,
    });

    return res.json(new RoomDto(room));
  }
  // get all oprn rooms
  async index(req, res) {
    const rooms = await roomService.getAllRooms(["open"]);
    const allRooms = rooms?.map((room) => new RoomDto(room));
    return res.json(allRooms);
  }
}

module.exports = new RoomsController();
