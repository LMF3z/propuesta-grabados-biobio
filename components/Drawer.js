import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Badge,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const DrawerComponent = () => {
  const router = useRouter();
  const { pathname } = router;

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItemButton
            selected={pathname === '/' ? true : false}
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemIcon>
              <ListItemText>
                <NextLink passHref href="/">
                  <Link>Inicio</Link>
                </NextLink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton
            selected={pathname === '/cotizar' ? true : false}
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemIcon>
              <ListItemText>
                <NextLink href="/cotizar" passHref>
                  <Link>Cotizar</Link>
                </NextLink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton
            selected={pathname === '/about' ? true : false}
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemIcon>
              <ListItemText>
                <NextLink href="/about" passHref>
                  <Link>Quienes somos</Link>
                </NextLink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton
            selected={pathname === '/cart-custom' ? true : false}
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemIcon>
              <ListItemText>
                <NextLink href="/cart-custom" passHref>
                  <Link>Carrito</Link>
                </NextLink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon color="menucolor" />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
