import express from 'express';
import { User } from '../entity/User';
import {AppDataSource} from '../data-source';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    userRepository.save(user)

    res.status(200).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
