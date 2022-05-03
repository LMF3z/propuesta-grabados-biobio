import nc from 'next-connect';
import db from '../../config/connectiondb';
import ProductModel from '../../models/Product';
import UserModel from '../../models/User.model';
import data from '../../utils/data';

const handler = nc();

handler.get(async (req, res) => {
  try {
    await db.connect();
    await UserModel.deleteMany();
    await UserModel.insertMany(data.users);
    await ProductModel.deleteMany();
    await ProductModel.insertMany(data.products);
    await db.disconnect();
    res.send({ message: 'seeded successfully' });
  } catch (error) {
    console.log('error to seed', error);
    res.send({ message: 'seeded error' });
  }
});

export default handler;
