import UserDetails from "../Model/User.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function register(req, res) {
  const {  username , email, password  } = req.body;
  // Check if email already exists
  UserDetails.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Create new user
    const handlepassword = bycrypt.hashSync(password, 5);
    const newUser = new UserDetails({
      username,
      email,
      password:handlepassword,
    });
    newUser.save().then((user) => {
      res.status(201).json(user);
    });
  });}

  
export function login(req, res) {   
    const { email, password } = req.body;
    UserDetails.findOne({ email: email }).then((user) => {  
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordCorrect = bycrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ email: user.email, id: user._id }, "YTClone", { expiresIn: "1h" });
        res.status(200).json({ user, token , username:user.username , channelName:user.channelName , avatar:user.avatar });
        });
}


export async function createChannel(req, res) {
  const { username, channelName, avatar } = req.body;

  if (!username || !channelName || !avatar) {
    return res.status(400).json({ message: 'Username, channel name, and avatar are required' });
  }

  try {
    const user = await UserDetails.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.channelName = channelName;
    user.avatar = avatar;
    await user.save();

    res.status(201).json({ message: 'Channel created successfully', channelName: user.channelName, avatar: user.avatar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}