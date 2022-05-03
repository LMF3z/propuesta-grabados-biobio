import { useEffect, useContext } from 'react';
// import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  // Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { StoreContext } from '../store/store';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import userTypes from '../store/user.types';
import CheckoutWizard from '../components/CheckoutWizard';

const Shipping = () => {
  const router = useRouter();
  // const { redirect } = router.query;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const { state, dispatch } = useContext(StoreContext);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const classes = useStyles();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=shipping');
    }

    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, []);

  const handleSubmitShipping = (data) => {
    dispatch({ type: userTypes.SAVE_SHIPPING_ADDRESS, payload: data });
    router.push('/payment');
  };

  return (
    <Layout title="Comprar">
      <CheckoutWizard activeStep={1} />
      <form
        onSubmit={handleSubmit(handleSubmitShipping)}
        className={classes.form}
      >
        <Typography component="h1" variant="h1">
          Procesar compra.
        </Typography>

        <List>
          <ListItem>
            <Controller
              name="fullName"
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
                  id="fullName"
                  label="Nombre Completo"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'Nombre completo invalido, debe tener, al menos, 6 caracteres'
                        : 'Nombre completo es requerido'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="address"
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
                  id="address"
                  label="Dirección"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === 'minLength'
                        ? 'Dirección invalida, debe tener, al menos, 6 caracteres'
                        : 'Dirección es requerida'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="city"
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
                  id="city"
                  label="Ciudad"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === 'minLength'
                        ? 'Ciudad invalida, debe tener, al menos, 2 caracteres'
                        : 'Ciudad es requerido'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="postalCode"
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
                  id="postalCode"
                  label="Código Postal"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === 'minLength'
                        ? 'Código Postal invalido, debe tener, al menos, 2 caracteres'
                        : 'Código Postal es requerido'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="country"
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
                  id="country"
                  label="Pais"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === 'minLength'
                        ? 'Pais invalido, debe tener, al menos, 2 caracteres'
                        : 'Pais es requerido'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continuar
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Shipping;
