import nc from 'next-connect';
import db from '../../../config/connectiondb';
import Product from '../../../models/Product';

const handler = nc();

handler.get(async (req, res) => {
  const { id } = req.query;
  await db.connect();
  const products = await Product.findById(id);
  await db.disconnect();
  res.send(products);
});

export default handler;
