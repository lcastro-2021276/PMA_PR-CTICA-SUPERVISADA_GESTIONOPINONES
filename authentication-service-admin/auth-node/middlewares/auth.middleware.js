import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token requerido o mal formato' });
  }

  const token = authHeader.split(' ')[1]; // separar "Bearer" del token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Puedes guardar solo lo que necesites del token
    req.user = { id: decoded.id, email: decoded.email }; 

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};