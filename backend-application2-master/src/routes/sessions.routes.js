import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'coderSecretKey';
const JWT_EXPIRES_IN = '1h';

const handleLoginSuccess = async (req, res) => {
  if (!req?.user?._id) {
    return res.status(400).json({ error: 'Usuario no encontrado en la solicitud.' });
  }

  const token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  res.json({ message: '✅ Login exitoso', token });
};

const handleCurrentUser = (req, res) => {
  if (!req?.user) {
    return res.status(404).json({ error: 'Usuario no encontrado.' });
  }

  const { _id, email, first_name, last_name, role } = req.user;

  res.json({
    id: _id,
    email,
    fullName: `${first_name} ${last_name}`.trim(),
    role,
  });
};

router.post('/register',
  passport.authenticate('register', { session: false }),
  (req, res) => {
    res.json({ message: '✅ Usuario registrado correctamente' });
  }
);

router.post('/login',
  passport.authenticate('login', { session: false }),
  handleLoginSuccess
);

router.get('/current',
  passport.authenticate('jwt', { session: false }),
  handleCurrentUser
);

export default router;
