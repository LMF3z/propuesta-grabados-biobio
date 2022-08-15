// import { useEffect } from 'react';
import Image from 'next/image';
// import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  // Link,
  Button,
  Grid,
  List,
  ListItem,
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Layout from '../components/Layout';
import images from '../public/images';
import useStyles from '../utils/styles';

const Cotizar = () => {
  const router = useRouter();
  // const { redirect } = router.query;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const classes = useStyles();

  const handleRegister = async () => {
    closeSnackbar();
    enqueueSnackbar('Cotización enviada exitosamente.', { variant: 'success' });
    reset();
  };
  return (
    <Layout title="Cotizar">
      <div>
        <h1>Cotizar tu pedido</h1>
        <Grid
          container
          //   direction="column"
          //   alignItems="center"
          //   justifyContent="center"
        >
          <Grid
            item
            md={6}
            xs={12}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={images.contactOne} alt="img-contact-1" />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            style={{
              backgroundColor: 'rgba(25,20,101,0.1)',
              paddingInline: 15,
              borderRadius: '5px',
            }}
          >
            <form
              onSubmit={handleSubmit(handleRegister)}
              className={classes.form}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  minHeight: '50px',
                  height: isMobile ? 'auto' : '50px',
                  paddingTop: isMobile ? '0' : 10,
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <Typography component="h1" variant="h1">
                  Cotizar tu pedido
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => router.push('/cart-custom')}
                >
                  <Typography>Ver Carrito</Typography>
                </Button>
              </div>
              <p style={{ color: 'red' }}>* requerido.</p>
              <List>
                <ListItem>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="name"
                        label="Nombre completo *"
                        inputProps={{ type: 'text' }}
                        error={Boolean(errors.name)}
                        helperText={
                          errors.name
                            ? errors.name.type === 'minLength'
                              ? 'Nombre invalido, debe tener, al menos, 2 caracteres'
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
                        label="Correo *"
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
                    name="phone"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 5,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="phone"
                        label="Número de teléfono"
                        inputProps={{ type: 'number' }}
                        error={Boolean(errors.phone)}
                        helperText={
                          errors.phone
                            ? errors.phone.type === 'minLength'
                              ? 'Número de teléfono debe tener minimo 5 caracteres.'
                              : 'Número de teléfono es requerido.'
                            : ''
                        }
                        {...field}
                      />
                    )}
                  />
                </ListItem>

                <ListItem>
                  <Controller
                    name="cotizar"
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
                        id="cotizar"
                        label="Cotizar"
                        inputProps={{ type: 'textarea' }}
                        error={Boolean(errors.cotizar)}
                        helperText={
                          errors.cotizar
                            ? errors.cotizar.type === 'minLength'
                              ? 'La cotización debe tener minimo 6 caracteres.'
                              : 'La cotización es requerida.'
                            : ''
                        }
                        multiline
                        rows={4}
                        maxRows={12}
                        {...field}
                      />
                    )}
                  />
                </ListItem>

                <ListItem>
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    color="primary"
                  >
                    Enviar
                  </Button>
                </ListItem>
              </List>
            </form>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Cotizar;
