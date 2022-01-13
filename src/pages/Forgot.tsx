import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonIcon, IonRow, IonCol, IonRouterLink } from '@ionic/react';
import { chevronBackOutline} from 'ionicons/icons';
import './Styles.css';

const Forgot: React.FC = () => {

  useIonViewDidEnter(()=>{
    localStorage.clear(); //Se vier a página de Login destroi a sessão
  });
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow>
            <IonCol><IonRouterLink className = "backButtonHeaderLink" href="/login"><IonIcon  className = "backButtonHeader" icon ={chevronBackOutline}/></IonRouterLink></IonCol>
            <IonCol><IonTitle className = "BreakHeaderText" >Esqueceu-se da sua password?</IonTitle></IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="forgotWrapper">
          <IonRow>
            <img className="" src="ismaiFullLogo.png"/>
          </IonRow>
          <IonRow>
            <h1 className="forgotTitle">Esqueceu-se da sua password?</h1>
          </IonRow>
          <IonRow>
            <p className="textForgotPW">Se se esqueceu da sua password infelizmente não o podemos ajudar.</p>
            <p className="textForgotPW">Para fazer reset à sua password por favor contacte o Gabinete de Informática do ISMAI.</p>
          </IonRow>
          <IonRow>
            <h1 className="forgotTitle">Contactos</h1>
          </IonRow>
          <IonRow>
            <h4 className="forgotSubTitle">GISI - Gabinete de Informática e Sistemas de Informação</h4>
          </IonRow>
          <IonRow>
            <p>Email:</p><a className="emailForgotPage" href="">gisi@ismai.pt</a>
          </IonRow>
          <IonRow>
            <p>Telefone:</p><a className="emailForgotPage" href="">22 986 60 44</a>
          </IonRow>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Forgot;