import { IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonButton, 
    IonRow, 
    useIonAlert, 
    useIonViewWillEnter, 
    IonCardTitle, 
    IonCard, 
    IonImg, 
    IonCardContent,
    IonRouterLink,
    IonIcon, 
    IonCardSubtitle} from '@ionic/react';
import { chevronBackOutline} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import axios from 'axios';
import './Styles.css';

const API_URL = 'https://ismai-ticket-system.herokuapp.com/';

export interface OpcaoInfo {
    descricao: string,
    letra: string,
    balcao: string
}


const TirarSenha: React.FC = () =>{

    const [alerta] = useIonAlert();
    const opcaoID = useParams<{id:string}>();
    const [senhaAtendimento, setSenhaAtendimento] = useState<''>();
    const [proximaSenha, setProximaSenha] = useState<''>();
    const [opcao, setOpcao] = useState<OpcaoInfo>();

    useIonViewWillEnter(()=>{ 
        (localStorage.getItem("user-token")==null) ? window.location.href="/login" : console.log("Welcome Sir")
        document.querySelector('#ButtonSenha')?.shadowRoot?.querySelector('.button-native')?.setAttribute('style', 'border-radius:1vh;');
      });

    React.useEffect(()=>{
        axios({
            method:"POST",
            url: API_URL+'/verificar_token',
            headers:{},
            data:{
              token: localStorage.getItem("user-token")
            }
        }).then(res =>{
            if(res.data == null) 
                return alerta('Ups! Alguma coisa correu mal...', [{ text: 'Ok', handler: ()=>{window.location.reload()} }]);
            if(res.data["Code"]!=200) 
                window.location.href="/login";
            setInterval(()=>{
                axios.all([
                    axios.post(API_URL + 'get_senha_em_atendimento',{
                        opcao_id: opcaoID.id
                    }),
                    axios.post(API_URL + 'get_ultima_senha',{
                        opcao_id: opcaoID.id
                    }),
                    axios.post(API_URL + 'get_info_opcao',{
                        id: opcaoID.id
                    })
                ]).then(axios.spread((senhaEmAtendimento, ultimaSenha, infoOpcao)=>{
                    if(senhaEmAtendimento.data==null || ultimaSenha == null) return alerta('Ups! Alguma coisa correu mal...', [{ text: 'Ok', handler: ()=>{window.location.reload()} }]);
                    setOpcao(infoOpcao.data);
                    setSenhaAtendimento(senhaEmAtendimento.data["numsenha:"]);
                    setProximaSenha(ultimaSenha.data["numsenha:"]);
                }))}
            ,1000);
        })
    }, []);

    const tirarSenhaFunc = (opcao_idFunc: string)=>{
        axios({
            method:"POST",
            url: API_URL + 'tirar_senha',
            headers:{},
            data:{
                token: localStorage.getItem("user-token"),
                opcao_id: opcao_idFunc
            }
        }).then(novaSenha=>{
            if(novaSenha.data["Erro"]=="Utilizador já tem senha aberta.")
                return alerta('Utilizador já tem senha aberta.', [{ text: 'Ok'}]);
            if(novaSenha.data["Code"]==200)
                return alerta('Senha tirada com sucesso!', [{ text: 'Ok'}]);
            else
                return alerta('Ups! Alguma coisa correu mal...', [{ text: 'Ok', handler: ()=>{window.location.reload()} }]);
        })
    }

    return(
        <>
        <IonPage>
            <IonHeader>
                <IonToolbar className="toolBar">
                    <IonImg  className="backArrow" src="/back.png" onClick={() => { window.location.href = "/home/" }}/>
                    <IonTitle>Senhas</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className='tirarSenhaWrapper'>
                    <div className='tirarSenhaCard'>
                        <IonTitle className="tituloSenha">Senha em atendimento:</IonTitle>
                        <IonCard>
                            <IonCardContent>{opcao? opcao.letra : ''}{(senhaAtendimento == '' || senhaAtendimento == undefined) ? ((Number(senhaAtendimento) >= 0) ? senhaAtendimento : <div className="lds-ring2"><div></div><div></div><div></div><div></div></div>) : senhaAtendimento}</IonCardContent>
                            {opcao ? <IonCardSubtitle className="filaSenha">Balcão: {opcao?.balcao}</IonCardSubtitle> : ''}
                        </IonCard>
                    </div>
                    <div className='tirarSenhaCard'>
                        <IonTitle className="tituloSenha">Última senha tirada:</IonTitle>
                        <IonCard>
                            <IonCardContent>{opcao? opcao.letra : ''}{(proximaSenha == '' || proximaSenha == undefined) ? ((Number(proximaSenha) >= 0) ? proximaSenha : <div className="lds-ring2"><div></div><div></div><div></div><div></div></div>) : proximaSenha}</IonCardContent>
                            {opcao ? <IonCardSubtitle className="filaSenha">Balcão: {opcao?.balcao}</IonCardSubtitle> : ''}
                        </IonCard>
                    </div>
                    <IonButton className="tirarSenhaButton" id="ButtonSenha" onClick={()=>tirarSenhaFunc(opcaoID.id)}>Tirar Senha</IonButton>
                </div>
            </IonContent>
        </IonPage>
        </>
    );
};

export default TirarSenha;