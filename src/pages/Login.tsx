import { IonPage, IonInput, IonButton, IonContent, IonRouterLink, useIonViewDidEnter, useIonAlert, IonImg } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import './Styles.css';

const Login: React.FC = () => {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const API_URL = 'https://ismai-ticket-system.herokuapp.com/';
    const [alerta] = useIonAlert();

    useIonViewDidEnter(()=>{
        localStorage.clear(); //Se vier a página de Login destroi a sessão
    });

    function splitInsertedUserID( InsertedUserID: string, separator: RegExp){
        var arrayOfStrings = InsertedUserID.split(separator);
        console.log(arrayOfStrings);
        return arrayOfStrings[1]; //Não me pagam que chegue para verificar a letra do ID. Let there be carnage
    }

    const handleLogin2 = (userID: string, userPassword: string) => {
        axios({
            method: "post",
            url: API_URL+'/login',
            headers:{},
            data: {
                id: userID,
                password: userPassword,
              },
          })
            .then(response => {
              if(response.data.Token != undefined){
                localStorage.setItem("user-token", response.data.Token);
                window.location.href="/home";
              } else {
                alerta('Credenciais incorretas. Por favor tente outra vez.', [{ text: 'Ok', handler: ()=>{window.location.reload()} }]);
              }
            })
    };

    const toggleType = () => {
      var pwInput = document.getElementById("pw");
      var eyeIcon = document.getElementById("eye");
      if(pwInput!=null && eyeIcon!=null){
        if (pwInput.getAttribute('type') === "password") {
          pwInput.setAttribute('type', "text");
          eyeIcon.setAttribute('src','hidden.png')
        } else if (pwInput.getAttribute('type') === "text") {
          pwInput.setAttribute('type', "password");
          eyeIcon.setAttribute('src','view.png')
        }
      }
    }

    return (
    <IonPage>
        <IonContent fullscreen>
        <div className="LoginForm">
            <div className='logoWrapper'><img src="ismaiLogo.png"/></div>
            <span className="text-center">Login</span>
            <IonInput className = "inputLogin" placeholder="Username" value={userID} onIonChange={(e)=>setUserID(e.detail.value!)} required/>
            <IonInput id="pw" className = "inputLogin" type="password" placeholder="Password" value={password} onIonChange={(e)=>setPassword(e.detail.value!)} required> <IonImg id="eye" className="frontArrow" src="view.png" onClick={()=>{toggleType()}}></IonImg></IonInput>
            <IonButton className = "loginButton" type="submit" onClick={()=>handleLogin2(splitInsertedUserID(userID.toLowerCase(),/a|d/g), password)}>Login</IonButton>
          <IonRouterLink className = "link" href="./forgot_password">Esqueceu-se da sua password?</IonRouterLink>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;