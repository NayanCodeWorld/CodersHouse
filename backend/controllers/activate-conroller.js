const jimp = require("jimp");
const path = require("path");
const UserService = require("../services/user-service");
const UserDto = require("../dtos/user-dto");

class ActivateController {
  // Activate user
  async activate(req, res) {
    const { name, avatar } = req.body;
    //console.log("name:", name);
    if (!name || !avatar) {
      return res.status(404).json({ message: "All fields are required" });
    }
    // console.log("avatar >>> >>", avatar);
    // Image Base64 encoded
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpg|jpeg|svg);base64,/, ""),
      "base64"
    );
    //console.log("2", buffer);
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

    try {
      const jimpResponse = await jimp.read(buffer);
      //console.log("3", jimpResponse);
      jimpResponse
        .resize(150, jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (error) {
      return res.status(500).json({ message: "Could not process image" });
    }

    // update user
    try {
      const user = await UserService.findUser({ _id: req.user.id });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.save();
      return res.json({ user: new UserDto(user), auth: true });
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}

module.exports = new ActivateController();
