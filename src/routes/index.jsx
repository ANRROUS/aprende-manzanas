import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout';
import Inicio from '../pages/Inicio';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Modulos from '../pages/Modulos';
import HistorialSelec from '../pages/HistorialSelec';
import HistorialDetalle from '../pages/HistorialDetalle';

// Game modules
import AprendeAContar from '../modules/aprende-a-contar/AprendeAContar';
import RecogeManzanas from '../modules/recoge-manzanas/RecogeManzanas';
import CuentaAnimales from '../modules/cuenta-animales/CuentaAnimales';
import IdentificaNumero from '../modules/identifica-numero/IdentificaNumero';
import CuantasManzanas from '../modules/cuantas-manzanas/CuantasManzanas';
import SeleccionaManzanas from '../modules/selecciona-manzanas/SeleccionaManzanas';
import CualEsMayor from '../modules/cual-es-mayor/CualEsMayor';
import Sumas from '../modules/sumas/Sumas';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Inicio /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'modulos', element: <Modulos /> },
      { path: 'historial', element: <HistorialSelec /> },
      { path: 'historial/:juego', element: <HistorialDetalle /> },

      // Game routes
      { path: 'juego/aprende-a-contar', element: <AprendeAContar /> },
      { path: 'juego/recoge-manzanas', element: <RecogeManzanas /> },
      { path: 'juego/cuenta-animales', element: <CuentaAnimales /> },
      { path: 'juego/identifica-numero', element: <IdentificaNumero /> },
      { path: 'juego/cuantas-manzanas', element: <CuantasManzanas /> },
      { path: 'juego/selecciona-manzanas', element: <SeleccionaManzanas /> },
      { path: 'juego/cual-es-mayor', element: <CualEsMayor /> },
      { path: 'juego/sumas', element: <Sumas /> },
    ],
  },
]);

export default router;
