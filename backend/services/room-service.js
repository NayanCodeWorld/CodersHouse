const RoomModel = require("../models/room-model");

class RoomService {
  async create(payload) {
    const { topic, roomType, ownerId } = payload;
    const room = await RoomModel.create({
      topic,
      roomType,
      ownerId,
      speakers: [ownerId],
    });
    return room;
  }

  async getAllRooms(roomTypes) {
    return await RoomModel.find({ roomType: { $in: roomTypes } })
      .populate("speakers")
      .populate("ownerId")
      .exec();
  }
}

module.exports = new RoomService();
