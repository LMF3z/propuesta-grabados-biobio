import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  TextField,
  Box,
  // Button,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
// import axios from 'axios';
// import productTypes from '../store/products.types';
// import db from '../config/connectiondb';
// import ProductModel from '../models/Product';
import Layout from '../components/Layout';
// import { StoreContext } from '../store/store';
import data from '../utils/data';

const Home = ({ products }) => {
  // const { state, dispatch } = useContext(StoreContext);
  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    setDataProduct(products);
  }, []);

  // const addToCartHandler = async (product) => {
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
  // };

  // FaPhoneAlt

  const handleSearchIndex = ({ target }) => {
    const { value } = target;
    const fintered = products.filter((pro) =>
      pro.name.toLowerCase().includes(value.toLowerCase())
    );

    setDataProduct(fintered);
  };

  return (
    <Layout>
      <div>
        {/* <h1>Lista de productos.</h1> */}
        <Box style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            variant="outlined"
            fullWidth
            id="query"
            label=""
            InputProps={{
              type: 'text',
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              placeholder: 'Buscar productos',
            }}
            onChange={handleSearchIndex}
            error={Boolean(false)}
            // helperText={'Buscar productos'}
          />
        </Box>
        {dataProduct.length <= 0 ? (
          <div>No se encontraron sugerencias...</div>
        ) : (
          <Grid container spacing={3} columns={{ xs: 1, sm: 4, md: 12 }}>
            {dataProduct.map((product) => (
              <Grid item xs={12} md={3} key={product.name}>
                <Card>
                  <NextLink href={`/product/${product.slug}`} passHref>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        title={product.name}
                        height="194"
                      />
                      <CardContent>
                        <Typography>{product.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </NextLink>
                  <CardActions>
                    <Typography style={{ fontWeight: 'bold' }}>
                      Precio:{' '}
                      <span style={{ color: '#9cc426' }}>${product.price}</span>
                    </Typography>
                    {/* <Button
                    style={{
                      marginLeft: 10,
                    }}
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async () => {
  // await db.connect();
  // const products = await ProductModel.find({}).lean();
  // await db.disconnect();

  // return {
  //   props: { products: products.map((doc) => db.convertDocToObject(doc)) },
  // };

  return {
    props: { products: data.products },
  };
};
