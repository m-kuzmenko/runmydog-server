import express from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import 'dotenv/config'

const secret = process.env.token;

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRepository = getRepository(User);
    let user = new User();
    user.email = email;
    // user.password = password;
    // user.hashPassword();
    user = await userRepository.save(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    // if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
    //   return res.status(401).json({ error: 'Invalid email or password' });
    // }
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
