import {IonCard, IonRow, IonCol, IonImg, useIonAlert} from '@ionic/react';
import { TiposOpcao } from '../pages/Home';
import { Opcao } from '../pages/Opcoes';
import axios from 'axios';
import {useState, useEffect} from 'react';

interface TipoProp{
    propTipo: TiposOpcao;
}

const TiposComponent: React.FC<TipoProp> = ({ propTipo }) =>{
    const [numOpcoes, setNumOpcoes] = useState(0)
    const API_URL = 'https://ismai-ticket-system.herokuapp.com/';
    const [alerta] = useIonAlert();
    const [opcaoHREF, setOpcaoHREF] = useState(0);
    useEffect(()=>{
        axios({
            method: 'POST',
            url: API_URL + 'get_numero_por_tipo',
            data: {
                id: propTipo.id
            }
        }).then(rowCount=>{
            if(rowCount.data == null) return alerta('Ups! Alguma coisa correu mal...', [{ text: 'Ok', handler: ()=>{window.location.reload()} }]);
            setNumOpcoes(Number(rowCount.data["numOpcoes"]));
        })
    },[])

    const fetchOpcaoUnicaId = (typeID: number) => {
        axios({ 
            method: "POST",
            url: API_URL+'/get_opcoes_id',
            data:{
                tipo_opcao_id: typeID,
            }
        }).then(opcoes =>{
            if(opcoes.data == null){ 
                return alerta('Ups! Alguma coisa correu mal...', [{ text: 'Ok', handler: ()=>{window.location.reload()} }]);
            }
            if(opcoes.data["Code"] == 404){
                return alerta(opcoes.data["Erro"], [{ text: 'Ok' }]);
            } 
            setOpcaoHREF(Number(opcoes.data["id"]));
            console.log(opcoes.data[0]["id"])
        })
    }

    return(
        <IonCard className="tiposCards" onClick={()=>{
                if(numOpcoes > 1)
                    window.location.href="/home/"+propTipo.id;
                else if (numOpcoes === 1){
                    fetchOpcaoUnicaId(Number(propTipo.id))
                    window.location.href="/senha/"+opcaoHREF;
                }
            }}>
            <IonRow>
                <IonCol size="10">
                    <IonRow><h1>{propTipo.nome}</h1></IonRow>
                </IonCol>
                <IonCol size="2" className="Balcao"><IonImg src = "front2.png" className ="frontArrowCard"/></IonCol>
            </IonRow>
        </IonCard>
    );
}

export default TiposComponent;