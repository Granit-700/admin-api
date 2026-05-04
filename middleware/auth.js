import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  };

  if (authHeader.split(" ")[0] !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized" });
  };

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.error(e.message || e);
    res.status(401).json({ message: "Unauthorized" });
  };
};
