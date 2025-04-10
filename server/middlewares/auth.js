const jwt = require("jsonwebtoken")

exports.isLogedIn = async (req, res, next) => {
    const authHeader = req.headers["authorization"] ;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized user", success: false });
    }
  
    // Extract and clean the token
    const rawToken = authHeader.split(" ")[1];
    const token = rawToken?.trim().replace(/^"|"$/g, ""); // Remove extra quotes

    // const {token} = req.body

    if (!token) return res.status(401).json({ message: "Unauthorized user", success: false });
    try {
        const decoded = await jwt.verify(token.trim(), "pixel");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", success: false, error });
    }
}