import express from 'express';
import { getRepository } from 'typeorm';
import { Order } from '../entity/Order';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const orderRepository = getRepository(Order);
    const orders = await orderRepository.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { userId, walkerId, orderStatus, startTime, endTime } = req.body;
  try {
    const orderRepository = getRepository(Order);
    const order = new Order();
    order.userId = userId;
    order.walkerId = walkerId;
    order.orderStatus = orderStatus;
    order.startTime = new Date(startTime);
    order.endTime = new Date(endTime);
    await orderRepository.save(order);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const orderRepository = getRepository(Order);
    await orderRepository.delete(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
