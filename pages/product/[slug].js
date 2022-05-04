// import { useContext, useState, useEffect } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
// import axios from 'axios';
import {
  Link,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from '@mui/material';
import data from '../../utils/data';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';
// import db from '../../config/connectiondb';
// import ProductModel from '../../models/Product';
// import productTypes from '../../store/products.types';
// import { StoreContext } from '../../store/store';
import { useRouter } from 'next/router';

const ProductScreen = () => {
  // const { state, dispatch } = useContext(StoreContext);
  const router = useRouter();
  const classes = useStyles();
  // const [product, setProduct] = useState({});

  const { slug } = router.query;
  const product = data.products.find((p) => p.slug === slug);
  // setProduct(actualProduct);

  if (!product) {
    return <div className="">Product not found</div>;
  }

  // const addToCartHandler = async () => {
  //   const existItem = state.cart.cartItems.find(
  //     (prod) => prod._id === product._id
  //   );

  //   const quantity = existItem ? existItem.quantity + 1 : 1;

  //   const { data } = await axios.get(`/api/products/${product._id}`);

  //   if (data.countInStock < quantity) {
  //     return window.alert('No hay suficientes.');
  //   }

  //   dispatch({
  //     type: productTypes.CART_ADD_ITEM,
  //     payload: { ...data, quantity },
  //   });

  //   router.push('/cart');
  // };

  return (
    <Layout title={product.name} description={product.tags}>
      <div className={classes.section}>
        <NextLink passHref href="/">
          <Link color="primary">
            <Button variant="contained" color="primary">
              {/* <Typography>Back to products list</Typography> */}
              <Typography>Inicio</Typography>
            </Button>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              {/* <Typography>Category: {product.category}</Typography> */}
              <Typography>Categoria: {product.category}</Typography>
            </ListItem>
            {/* <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem> */}
            {/* <ListItem>
              <Typography>
                Rating: stars ({product.numReviews}) reviews{' '}
              </Typography>
            </ListItem> */}
            <ListItem>
              <Typography>Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    {/* <Typography>Price:</Typography> */}
                    <Typography>Precio:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    {/* <Typography>Status:</Typography> */}
                    <Typography>Estado:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {/* {product.countInStock > 0 ? 'In stock' : 'Unavailable'} */}
                      {product.countInStock > 0
                        ? 'Disponible'
                        : 'No disponible'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={() => {}}
                  fullWidth
                  variant="contained"
                  color="secondary"
                >
                  {/* Add to cart */}
                  Agregar al carrito
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProductScreen;

// export const getServerSideProps = async ({ params }) => {
//   const { slug } = params;
//   await db.connect();
//   const product = await ProductModel.findOne({ slug }).lean();
//   await db.disconnect();

//   return {
//     props: { product: db.convertDocToObject(product) },
//   };
// };
