import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#181565',
    '& a': {
      color: '#fff',
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.7rem',
  },
  grow: {
    flexGrow: 1,
  },
  grow_spacing_left: {
    marginLeft: 10,
  },
  grow_spacing: {
    marginLeft: 10,
    marginRight: 10,
  },
  navbarButton: {
    color: '#fff',
    textTransform: 'initial',
  },
  loginStyleIcon: {
    display: 'flex',
    justifyContent: 'between',
  },
  main: {
    minHeight: '50vh',
    // backgroundColor: '#181565',
    // height: '80vh',
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  CheckoutWizard: {
    background: 'transparent',
    marginTop: 10,
  },
  floatButtons: {
    position: 'fixed',
    bottom: 40,
    right: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  title_box: {
    display: 'flex',
    height: '50px',
    justifyContent: 'space-between',
    // border: 'solid red 1px',
    // font: '1.5rem',
  },
});

export default useStyles;
