import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import TirarSenha from './pages/Senha';
import OpcoesPage from './pages/Opcoes';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();
var path ="/home";
if(localStorage.getItem("user-token")==null)
  path = "/login";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/home/:idTipo">
            <OpcoesPage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/forgot_password">
            <Forgot />
          </Route>
          <Route path="/senha/:id">
            <TirarSenha/>
          </Route>
          <Route exact path="/">
            <Redirect to={path} />
          </Route>
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
