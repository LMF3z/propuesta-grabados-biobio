import { useState } from 'react';
import NextLink from 'next/link';
import {
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const DrawerComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <NextLink passHref href="/">
                <Link>Inicio</Link>
              </NextLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <NextLink href="/cotizar" passHref>
                <Link>Cotizar</Link>
              </NextLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <NextLink href="/about" passHref>
                <Link>Quienes somos</Link>
              </NextLink>
            </ListItemText>
          </ListItem>
          {/* <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <NextLink href="/about" passHref>
                <Link>Faq</Link>
              </NextLink>
            </ListItemText>
          </ListItem> */}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon color="menucolor" />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
