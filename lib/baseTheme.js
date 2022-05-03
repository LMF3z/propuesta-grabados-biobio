import { createTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { StoreContext } from '../store/store';

const useTheme = (props) => {
  const { state } = useContext(StoreContext);
  const { darkMode } = state;

  const baseTheme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },

    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#181565',
        contrastText: '#fff',
      },
      secondary: {
        main: '#9cc426',
        contrastText: '#fff',
      },
      menucolor: {
        main: '#fff',
      },
      shadowBackground: {
        backgroundColor: 'rgba(25,20,101,255)',
      },
    },
  });

  return { baseTheme };
};

export default useTheme;
