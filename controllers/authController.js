import User from "../models/User.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });


    res.json({ token: "no now token" })
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  };
};
