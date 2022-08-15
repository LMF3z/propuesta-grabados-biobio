import { useContext } from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
// import axios from 'axios';
import { StoreContext } from '../store/store';
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Select,
  MenuItem,
  Button,
  Link,
  Card,
  List,
  ListItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Layout from '../components/Layout';
import productTypes from '../store/products.types';
import images from '../public/images';

const CardScreen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const router = useRouter();

  const { state, dispatch } = useContext(StoreContext);
  const { cartItems } = state.cart;

  const handlerUpdateCart = async (item, quantity) => {
    const data = state.cart.cartItems.find((p) => p.slug === item.slug);

    dispatch({
      type: productTypes.CART_ADD_ITEM,
      payload: { ...item, quantity },
    });
  };

  const handlerRemoveItemCart = (item) => {
    dispatch({ type: productTypes.CART_REMOVE_ITEM, payload: item });
  };

  //const HandlerCheckOut = () => router.push('/shipping');

  return (
    <Layout title="Shooping cart">
      <Typography component="h1" variant="h1">
        Carrito
      </Typography>
      <Button onClick={() => router.back()} variant="contained">
        Regresar
      </Button>
      {/* <NextLink href="/cotizar" passHref>
        <Link color={state.darkMode ? 'secondary' : 'primary'}> Regresar</Link>
      </NextLink> */}
      {cartItems.length === 0 ? (
        <>
          <div style={{ marginTop: 10 }}>Carrito vacío.</div>
          <Grid container>
            <Grid
              item
              md={12}
              xs={12}
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={images.emptyCart}
                alt="img-empty-cart"
                width={300}
                height={300}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Imagen</TableCell>
                    <TableCell>Artículo</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="right">Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Typography
                              color={state.darkMode ? 'secondary' : 'primary'}
                            >
                              {item.name}
                            </Typography>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell align="right">
                        <Typography>
                          {
                            <Select
                              value={item.quantity}
                              onChange={({ target }) =>
                                handlerUpdateCart(item, target.value)
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          }
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography>${item.price}</Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handlerRemoveItemCart(item)}
                        >
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Total ({cartItems.reduce((acc, el) => acc + el.quantity, 0)}{' '}
                    artículos) : ${' '}
                    {cartItems.reduce(
                      (acc, el) => acc + el.quantity * el.price,
                      0
                    )}
                  </Typography>
                </ListItem>
                {/* <ListItem>
                  <Button
                    onClick={HandlerCheckOut}
                    color="secondary"
                    variant="contained"
                    fullWidth
                  >
                    Ckeck out
                  </Button>
                </ListItem> */}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default dynamic(() => new Promise((resolve) => resolve(CardScreen)), {
  ssr: false,
});
