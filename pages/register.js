import { useEffect, useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { StoreContext } from '../store/store';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import userTypes from '../store/user.types';

const Register = () => {
  const router = useRouter();
  const { redirect } = router.query;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(StoreContext);
  const { userInfo } = state;

  const classes = useStyles();

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const handleRegister = async (data) => {
    closeSnackbar();

    if (data.password !== data.confirmPassword) {
      return enqueueSnackbar('Contraseñas no coinciden', {
        variant: 'error',
      });
    }

    try {
      const res = await axios.post('/api/users/register', data);
      dispatch({ type: userTypes.USER_LOGIN, payload: res.data });
      router.push(redirect || '/');
    } catch (error) {
      console.log('error ->', error);
      enqueueSnackbar(
        error.response.data ? error.response.data.message : error.message,
        {
          variant: 'error',
        }
      );
    }
  };

  return (
    <Layout title="Registrarse">
      <form onSubmit={handleSubmit(handleRegister)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Registrarse
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Nombre"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Nombre invalido, debe tener, al menos, 6 caracteres'
                        : 'Nombre es requerido'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Correo"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Correo invalido'
                        : 'Correo es requerido'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Contraseña"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Contraseña debe tener minimo 6 caracteres.'
                        : 'Contraseña es requerida.'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="confirmPassword"
                  label="Confirmar Contraseña"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
                        ? 'Contraseña debe tener minimo 6 caracteres.'
                        : 'Contraseña es requerida.'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Registrar
            </Button>
          </ListItem>
          <ListItem>
            ¿Ya tienes una cuenta? &nbsp;
            <NextLink href={`/login?=${redirect || '/'}`} passHref>
              <Link>Iniciar Sesión</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Register;
