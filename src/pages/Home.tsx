import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAlert, useIonAlert, IonImg, IonRow, useIonViewWillEnter  } from '@ionic/react';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import TiposComponent from '../components/tiposComponent';
import './Styles.css';
export interface TiposOpcao {
    id: string;
    nome: string;
  }
const HomePage: React.FC = () => {
  
  const [listaTipos, setListaTipos] = useState<TiposOpcao[]>([])
  const API_URL = 'https://ismai-ticket-system.herokuapp.com/';
  const [alerta] = useIonAlert();
  const [showAlert3, setShowAlert3] = useState(false);

  useIonViewWillEnter(()=>{ //Sistema de verificação muito fácil de enganar mas serve para enganar 99% das pessoas
    (localStorage.getItem("user-token")==null) ? window.location.href="/login" : console.log("Welcome Sir")//Se não tiver cookie ele nem tentar fazer mais nada
  });

  React.useEffect(()=>{
    axios({       //Primeiro pedido verifica o token na API
      method:"POST",
      url: API_URL+'/verificar_token',
      headers:{},
      data:{
        token: localStorage.getItem("user-token")
      }
    }).then(res =>{
      //Se der null alguma coisa ta mt mal. Por norma uso para identificar pedidos mal estruturados
      if(res.data == null) 
        return alerta('Ups! Alguma coisa correu mal...', [{ text: 'Ok', handler: ()=>{window.location.reload()} }]);
      //Se der qlq coisa diferente de 200 as credenciais não estão direitas.
      if(res.data["Code"]!=200)  
        window.location.href="/login";
      // Vai buscar as opções todas
      axios({ 
        method: "get",
        url: API_URL+'/get_tipos_opcao',
        headers:{},
      }).then(opcoes =>{
        if(opcoes.data == null || opcoes.data["Code"] == 404) return alerta('Ups! Alguma coisa correu mal...', [{ text: 'Ok', handler: ()=>{window.location.reload()} }]);
        setListaTipos(opcoes.data);
      })
    })
  },[])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolBar">
          <IonImg  className="frontArrow" src="/logout.png" onClick={() => { setShowAlert3(true) }} />
          <IonTitle>Página Inicial</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="homePageBackground">
        <IonImg className="bgLogo" src="ismaiLogo.png"></IonImg>
        <IonAlert
          isOpen={showAlert3}
          onDidDismiss={() => setShowAlert3(false)}
          message={'Tem a certeza que pretende sair?'}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              id:'cancelButton',
            },
            {
              text: 'Sim!',
              id:'okayButton',
              handler: () => {
                window.location.href="/login"
              }
            }
          ]}
        />
        <IonRow>
          {listaTipos.length>0 ? listaTipos.map(m=> <TiposComponent key={m.id} propTipo={m}/>) : (<div className="lds-ring2"><div></div><div></div><div></div><div></div></div>)}
          {/* {listaOpcoes2.map(m=> <OpcaoComponent key={m.id} propOpcao={m}/>)} */}
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;