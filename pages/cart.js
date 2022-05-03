import { useContext } from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
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
} from '@mui/material';
import Layout from '../components/Layout';
import productTypes from '../store/products.types';

const CardScreen = () => {
  const router = useRouter();

  const { state, dispatch } = useContext(StoreContext);
  const { cartItems } = state.cart;

  const handlerUpdateCart = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return window.alert('No hay suficientes.');
    }

    dispatch({
      type: productTypes.CART_ADD_ITEM,
      payload: { ...item, quantity },
    });
  };

  const handlerRemoveItemCart = (item) => {
    dispatch({ type: productTypes.CART_REMOVE_ITEM, payload: item });
  };

  const HandlerCheckOut = () => router.push('/shipping');

  return (
    <Layout title="Shooping cart">
      <Typography component="h1" variant="h1">
        Shooping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <div className="">
          Cart is empity.
          <NextLink href="/" passHref>
            <Link color={state.darkMode ? 'secondary' : 'primary'}>
              {' '}
              Go back
            </Link>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
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
                    Subtotal (
                    {cartItems.reduce((acc, el) => acc + el.quantity, 0)} items)
                    : ${' '}
                    {cartItems.reduce(
                      (acc, el) => acc + el.quantity * el.price,
                      0
                    )}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={HandlerCheckOut}
                    color="secondary"
                    variant="contained"
                    fullWidth
                  >
                    Ckeck out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CardScreen), { ssr: false });
