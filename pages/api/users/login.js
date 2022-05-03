import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import auth from '../../../utils/auth';
import db from '../../../config/connectiondb';
import UserModel from '../../../models/User.model';

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connect();
    const user = await UserModel.findOne({ email: req.body.email });
    await db.disconnect();

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = auth.signToken(user);
      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401).send({ message: 'Correo o contraseña invalida.' });
    }
  } catch (error) {
    console.log('error servidor', error);
    res.status(500).send({ message: 'Error del servidor.' });
  }
});

export default handler;
