import Image from 'next/image';
import { Grid } from '@mui/material';
import Layout from '../components/Layout';
import images from '../public/images';

const About = () => {
  return (
    <Layout title="Quienes somos">
      <div>
        <h1>Quiénes somos</h1>
        <Grid
          container
          //   direction="column"
          //   alignItems="center"
          //   justifyContent="center"
        >
          <Grid
            item
            md={6}
            xs={12}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={images.whoWeAre} alt="img-quienes-somos" />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            style={{
              backgroundColor: 'rgba(25,20,101,0.1)',
              paddingInline: 15,
              borderRadius: '5px',
            }}
          >
            <p>
              Somos una empresa familiar de Concepción, fundada en el año 1.999,
              Estamos ubicados en calle Chacabuco 249, entre Angol y Salas.
            </p>

            <p>
              Comenzamos fabricando placas fotograbadas en acero inoxidable y
              bronce y con los años nos fuimos extendiendo poco a poco a otros
              rubros publicitarios.
            </p>

            <p>
              Tenemos los mejores precios del mercado ya que somos importadores
              directos de copas, trofeos, medallas, galvanos, lápices metálicos
              y otros.
            </p>

            <p>
              Poseemos máquinas industriales y semi industriales para grabar,
              bordar y estampar.
            </p>

            <p>
              Somos proveedores del estado desde que se inició Chile
              proveedores.
            </p>

            <p>
              Ya que contamos con compradoras en China podemos BUSCAR e importar
              cualquier producto que el cliente necesite con un monto mínimo de
              1 millón de pesos.
            </p>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default About;
