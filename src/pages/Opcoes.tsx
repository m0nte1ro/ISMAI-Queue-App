import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAlert, useIonAlert, IonImg, IonRow, useIonViewWillEnter  } from '@ionic/react';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import OpcaoComponent from '../components/opcoesComponent';
import './Styles.css';

export interface Opcao {
  balcao: string;
  descricao: string;
  id: string;
  letra: string;
  tipo_opcao_id: string;
}
export interface Nome {
  nome: string;
}



const OpcoesPage: React.FC = () => {
  
  const [listaOpcoes2, setListOpcoes2] = useState<Opcao[]>([])
  const [nomeOpcao, setNomeOpcao] = useState<Nome>();
  const API_URL = 'https://ismai-ticket-system.herokuapp.com/';
  const [alerta] = useIonAlert();
  const [empty, setEmpty] = useState(false);
  const tipoID = useParams<{idTipo:string}>();

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
        method: "POST",
        url: API_URL+'/get_nome_tipo_opcao',
        data:{
          id: tipoID.idTipo
        }
      }).then(nomeR =>{
        if(nomeR.data == null) return alerta('Ups! Alguma coisa correu mal...', [{ text: 'Ok', handler: ()=>{window.location.reload()} }]);
        setNomeOpcao(nomeR.data);
      })
      axios({ 
        method: "POST",
        url: API_URL+'/get_opcoes_id',
        data:{
          tipo_opcao_id: tipoID.idTipo
        }
      }).then(opcoes =>{
        if(opcoes.data == null) return alerta('Ups! Alguma coisa correu mal...', [{ text: 'Ok', handler: ()=>{window.location.reload()} }]);
        if(opcoes.data["Code"] == 404){
          setEmpty(true);
          return alerta(opcoes.data["Erro"], [{ text: 'Ok' }]);
        } 
        setListOpcoes2(opcoes.data);
      })
    })
  },[])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolBar">
        <IonImg  className="backArrow" src="/back.png" onClick={() => { window.location.href = "/home/" }}/>
          <IonTitle>{nomeOpcao ? nomeOpcao.nome : "Carregando..."}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="homePageBackground">
        <IonImg className="bgLogo" src="ismaiLogo.png"></IonImg>
        <IonRow>
          {listaOpcoes2.length> 0 ? listaOpcoes2.map(m=> <OpcaoComponent key={m.id} propOpcao={m}/>) : empty ? (<div className='notFound'><h1 className='grande404'>404</h1><h1 className='erro404'>Ainda não adicionamos opções nesta categoria! 😭</h1></div>) : (<div className="lds-ring2"><div></div><div></div><div></div><div></div></div>)}
          
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default OpcoesPage;
