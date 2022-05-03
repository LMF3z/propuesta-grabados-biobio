import { useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import useStyles from '../utils/styles';

const FloatBottons = () => {
  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={classes.floatButtons}>
      <NextLink passHref href="https://wa.me/+56993216389">
        <a target="_blank">
          <Image
            src="/images/whatsapp.png"
            width={isMobile ? 40 : 60}
            height={isMobile ? 40 : 60}
          />
        </a>
      </NextLink>
      <NextLink passHref href="https://www.facebook.com/grabados.biobio">
        <a target="_blank">
          <Image
            src="/images/facebook.png"
            width={isMobile ? 40 : 60}
            height={isMobile ? 40 : 60}
          />
        </a>
      </NextLink>
    </div>
  );
};

export default FloatBottons;
