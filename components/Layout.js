// import { useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';
import {
  CssBaseline,
  ThemeProvider,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  // Switch,
  // Badge,
  // Button,
  // Menu,
  // MenuItem,
  // responsive appbar
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../lib/createEmotionCache';
import DrawerComponent from '../components/Drawer';
import useBaseTheme from '../lib/baseTheme';
import useStyles from '../utils/styles';
// import { StoreContext } from '../store/store';
// import userTypes from '../store/user.types';
import Footer from './Footer';

const clientSideEmotionCache = createEmotionCache();

const Layout = ({
  title,
  description,
  emotionCache = clientSideEmotionCache,
  children,
}) => {
  const classes = useStyles();
  const { baseTheme } = useBaseTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // const router = useRouter();

  // const { state, dispatch } = useContext(StoreContext);
  // const { darkMode, cart, userInfo } = state;

  // const [anchorEl, setAnchorEl] = useState(null);

  // const handlerClickMenuBar = (e) => setAnchorEl(e.currentTarget);

  // const handlerCloseMenuBar = () => setAnchorEl(null);

  // const handlerLogOut = () => {
  //   setAnchorEl(null);
  //   dispatch({ type: userTypes.USER_LOGOUT });
  //   router.push('/');
  // };

  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - Grabados Bio Bio` : 'Grabados Bio Bio'}
        </title>
        {description && <meta name="description" content={description} />}
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={baseTheme}>
          <CssBaseline />
          <AppBar position="static" className={classes.navbar}>
            <Toolbar>
              {isMobile ? (
                <DrawerComponent />
              ) : (
                <>
                  <NextLink passHref href={'/'}>
                    <Link>
                      <Typography className={classes.brand}>
                        Grabados Bio Bio
                      </Typography>
                    </Link>
                  </NextLink>
                  <div className={classes.grow}></div>
                  <div className="">
                    <NextLink href="/cotizar" passHref>
                      <Link>
                        Cotizar
                        {/* <Button
                      variant="outlined"
                      color="secondary"
                      // startIcon={<FaShoppingCart />}
                    >
                      Cotizar
                    </Button> */}
                      </Link>
                    </NextLink>
                    {/*
                    <NextLink href="/cart" passHref>
                      <Link>
                        {cart.cartItems.length > 0 ? (
                          <Badge
                            color="secondary"
                            badgeContent={cart.cartItems.length}
                          >
                            Cart
                            {/* <Button
                          variant="outlined"
                          color="secondary"
                          startIcon={<FaShoppingCart />}
                        >
                          Cart
                        </Button> 
                          </Badge>
                        ) : (
                          <span>Cart</span>
                          // <Button
                          //   variant="outlined"
                          //   color="secondary"
                          //   startIcon={<FaShoppingCart />}
                          // >
                          //   Cart
                          // </Button>
                          )}
                          </Link>
                          </NextLink>
                      */}
                    <NextLink href="/about" passHref>
                      <Link>Quienes somos</Link>
                    </NextLink>
                  </div>
                  {/* 
                  <div className={classes.grow_spacing_left}></div>
                  <div className="">
                    {userInfo ? (
                      <>
                        <Button
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={handlerClickMenuBar}
                          className={classes.navbarButton}
                        >
                          {userInfo.name}
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handlerCloseMenuBar}
                        >
                          <MenuItem onClick={handlerCloseMenuBar}>
                            Profile
                          </MenuItem>
                          <MenuItem onClick={handlerCloseMenuBar}>
                            My account
                          </MenuItem>
                          <MenuItem onClick={handlerLogOut}>Logout</MenuItem>
                        </Menu>
                      </>
                    ) : (
                      <NextLink href="/login" passHref>
                        <Link>
                          <span>Ingresar</span>
                          <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<FaSignInAlt />}
                          >
                            Ingresar
                          </Button>
                        </Link>
                      </NextLink>
                    )}
                  </div>
                  */}
                  {/* <Switch
                checked={darkMode}
                color={darkMode ? 'secondary' : 'default'}
                onChange={() =>
                  dispatch({ type: themeTypes.DARK_MODE, payload: darkMode })
                }
              /> */}
                </>
              )}
            </Toolbar>
          </AppBar>

          <Container className={classes.main}>{children}</Container>

          <Footer />
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
};

export default dynamic(() => new Promise((resolve) => resolve(Layout)), {
  ssr: false,
});
