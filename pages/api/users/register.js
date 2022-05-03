import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import auth from '../../../utils/auth';
import db from '../../../config/connectiondb';
import UserModel from '../../../models/User.model';

const handler = nc();

handler.post(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await db.connect();
    const newUser = new UserModel({
      name,
      email,
      password: bcrypt.hashSync(password),
      isAdmin: false,
    });

    const createdUser = await newUser.save();

    await db.disconnect();

    const token = auth.signToken(createdUser);

    res.send({
      token,
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
    });
  } catch (error) {
    console.log('error message ->', error.message);
    console.log(
      'error type ->',
      error?.keyValue?.email ? 'Correo existente' : ''
    );
    res
      .status(500)
      .send({
        message: error?.keyValue?.email
          ? 'Correo existente'
          : 'Error del servidor.',
      });
  }
});

export default handler;
