import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "..users/user.model.js";

export const register = async (req, res, next) => {
    try {
    const { username, email, password } = req.body;

    const exist = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (exist)
      return res.status(400).json({ message: 'Usuario ya existe' });

    const encrypted = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: encrypted,
    });

    await user.save();

    res.status(201).json({ message: 'Usuario registrado' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
    try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user)
      return res.status(400).json({ message: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
      { uid: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};