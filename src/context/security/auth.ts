import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import User from "../../users/domain/User";
const SECRET_KEY: Secret = "mySecretKey";

const createToken = (user: User): string => {
  const payload = {
    user: {
      name: user.name,
    },
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1 days" });
};

const isAuth = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    return true;
  } catch (err) {
    return false;
  }
};

export { createToken, isAuth };
