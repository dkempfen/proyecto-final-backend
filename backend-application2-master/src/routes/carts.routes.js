import { Router } from 'express';
import passport from 'passport';
import { authRole } from '../middlewares/auth.middleware.js';
import { createTicket } from '../services/ticket.service.js';
import { CartModel } from '../models/Cart.model.js';
import { ProductModel } from '../models/Product.model.js';

const router = Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authRole('user'),
  async (req, res) => {
    try {
      const newCart = await CartModel.create({
        products: [],
        userEmail: req.user.email,
      });
      res.json(newCart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el carrito' });
    }
  }
);

router.post(
  '/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  authRole('user'),
  async (req, res) => {
    try {
      const { cid, pid } = req.params;

      const cart = await CartModel.findById(cid);
      if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

      const product = await ProductModel.findById(pid);
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

      const index = cart.products.findIndex((p) => p.product.equals(pid));
      if (index !== -1) {
        cart.products[index].quantity += 1;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }

      await cart.save();
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al añadir producto al carrito' });
    }
  }
);

router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid).populate('products.product');
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

router.post(
  '/:cid/purchase',
  passport.authenticate('jwt', { session: false }),
  authRole('user'),
  async (req, res) => {
    try {
      const { cid } = req.params;

      const cart = await CartModel.findById(cid).populate('products.product');
      if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

      let total = 0;
      const productosNoProcesados = [];

      for (const item of cart.products) {
        const product = item.product;

        if (item.quantity <= product.stock) {
          total += product.price * item.quantity;

          product.stock -= item.quantity;
          await product.save();
        } else {
          productosNoProcesados.push(product._id.toString());
        }
      }

      const ticket = total > 0
        ? await createTicket(total, req.user.email)
        : null;

      cart.products = cart.products.filter((p) =>
        productosNoProcesados.includes(p.product._id.toString())
      );
      await cart.save();

      res.json({
        ticket,
        productosNoProcesados,
        carritoActualizado: cart.products,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al finalizar la compra' });
    }
  }
);

export default router;
