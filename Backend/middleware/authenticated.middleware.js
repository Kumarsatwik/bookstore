const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        // next(new HttpException(401, "Invalid token"));
        return res.status(400).json({ message: "Invalid Token" });
      }
      req.user = decoded;
    });
    next();
  } catch (err) {
    // next(new HttpException(401, "Unauthorized"));
    // return res.status(400).json({ message: "Something went wrong" });
    next();
  }
};
module.exports = { verifyToken };
