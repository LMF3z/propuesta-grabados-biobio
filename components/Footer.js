import React from 'react';
import NextLink from 'next/link';
import { Typography } from '@mui/material';
import useStyles from '../utils/styles';

const Footer = () => {
  const classes = useStyles();

  const fecha = new Date();

  return (
    <footer className={classes.footer}>
      {/* <Typography>All rights reserved. Grabados Bio Bio</Typography> */}
      <Typography color="primary">Contacto:</Typography>
      <Typography color="primary">Teléfono: 41 225 3564</Typography>
      <Typography color="primary">WhatsApp: +569 93216389 (Pamela)</Typography>
      <Typography color="primary">
        E-mail:{' '}
        <NextLink href="mailto:pamela.carcamo@gmail.com">
          pamela.carcamo@gmail.com
        </NextLink>{' '}
        |{' '}
        <NextLink href="mailto:pamela.carcamo@gmail.com">
          ventas@grabadosbiobio.cl
        </NextLink>
      </Typography>
      <Typography color="primary"></Typography>
      <Typography color="primary">
        Concepción - Chile | Calle Chacabuco entre Angol y Salas
      </Typography>
      <Typography color="primary">
        &copy; {fecha.getFullYear()} | Todos los derechos reservados. Grabados
        Bio Bio
      </Typography>
    </footer>
  );
};

export default Footer;
