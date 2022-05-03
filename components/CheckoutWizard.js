import dynamic from 'next/dynamic';
import { Step, Stepper, StepLabel } from '@mui/material';
import useStyles from '../utils/styles';

const CheckoutWizard = ({ activeStep = 0 }) => {
  const classes = useStyles();
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      className={classes.CheckoutWizard}
    >
      {[
        'Ingreso',
        'Direeción de compra',
        'Método de pago',
        'Lugar de la orden',
      ].map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default dynamic(() => Promise.resolve(CheckoutWizard), { ssr: false });
