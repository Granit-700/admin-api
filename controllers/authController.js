import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username.trim() || !password.trim()) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    await User.findByIdAndUpdate(user._id, { refreshToken });

    res.json({ token });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.user.id;
    const { password, newPassword, newUsername } = req.body;

    if (!password) {
      return res.status(400).json({ message: "current password is required" });
    }

    if (!newUsername && !newPassword) {
      return res.status(400).json({ message: "nothing to update" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "wrong password" });

    const updatedFields = {};
    if (newUsername) updatedFields.username = newUsername;
    if (newPassword) {
      updatedFields.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { returnDocument: "after", runValidators: true },
    );

    const safeUser = updatedUser.toObject();
    delete safeUser.password;

    res.json({ message: "Data successfully updated", user: safeUser });
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};
