import {IonCard, IonRow, IonCol} from '@ionic/react';
import { Opcao } from '../pages/Opcoes';

interface OpcaoProp{
    propOpcao: Opcao;
}

const OpcaoComponent: React.FC<OpcaoProp> = ({ propOpcao }) =>{
    return(
        <IonCard className="opcoesCards" onClick={()=>{window.location.href="/senha/"+propOpcao.id}}>
            <IonRow>
                <IonCol size="2" className="Balcao"><div className='circulo'><h1>{propOpcao.letra}</h1></div></IonCol>
                <IonCol size="10">
                    <IonRow><h1>{propOpcao.descricao}</h1></IonRow>
                    <IonRow><p>Balcão: {propOpcao.balcao}</p></IonRow>
                </IonCol>
            </IonRow>
        </IonCard>
    );
}

export default OpcaoComponent;