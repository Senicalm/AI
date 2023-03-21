import { useState } from "react";
import consultasApi from "../apis/consultasApi";
import Swal from 'sweetalert2';


export interface conversacion{
    role:string,
    content:string
}

export interface settingsAI{
  model:string,
  temperature:number,
  max_tokens:number,
  top_p:number,
  frequency_penalty:number,
  presence_penalty:number,
  stop:string[]
}

const INITIAL_STATE:settingsAI = {
  model: "text-davinci-003",
  temperature: 0,//0.9,
  max_tokens: 150,
  top_p: 1,
  frequency_penalty: 0.0,
  presence_penalty: 0.6,
  stop: [" Human:", " AI:"]
}

  
export const useAI = () => {

  const [consultando, setConsultando] = useState<boolean>(false);
  const [vozState, setVozState] = useState<boolean>(false);
  const [state, setState] = useState<conversacion[]>([]);
  const [stateSettingsAI,setStateSettingsAI] = useState<settingsAI>(INITIAL_STATE);


  const callate = () => {
    window.speechSynthesis.cancel();
  }

  const preguntar = async (miPregunta: string) => {

    setConsultando(true);

    const newPregunta: any = { role: "user", content: miPregunta };

    const newState = [...state, newPregunta];

    const resp = await consultasApi.post("/AI/ChatCompletion", newState);

    if (resp.data.resp.ok) {
      const newRespuesta = { role: "assistant", content: resp.data.content };
      const newStateResp = [...newState, newRespuesta];
      if (vozState) {
        const msg = new SpeechSynthesisUtterance();
        msg.text = resp.data.content;
        window.speechSynthesis.speak(msg);
      }
      setState(newStateResp);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo ha ido mal!",
        footer: "Intentalo de nuevo",
      });
    }

    console.log(resp);

    setConsultando(false);
  };

  const limpiar = () => {
    setState([]);
  };

  const darVoz = (dar:boolean) =>{
    setVozState(dar);
  }

  const preguntarSettings = async() =>{
    const { value: formValues } = await Swal.fire({
      title: 'Settings AI',
      html:
      '<div className="row">'+
      '<div className="col-6"><label for="temperature" className="form-label">Temperature</label></div>'+
      `<div className="col-6"><input type="range" className="form-range" min="0" max="1" step="0.1" value="${stateSettingsAI.temperature}" id="temperature"></div>`+
      '</div>'+
      '<div className="row">'+
      '<div className="col-6"><label for="max_tokens" className="form-label">Max Tokens</label></div>'+
      `<div className="col-6"><input type="range" className="form-range" min="0" max="250" step="25" value="${stateSettingsAI.max_tokens}" id="max_tokens"></div>`+
      '</div>'+
      '<div className="row">'+
      '<div className="col-6"><label for="top_p" className="form-label">Top_p</label></div>'+
      `<div className="col-6"><input type="range" className="form-range" min="0" max="1" step="0.1" value="${stateSettingsAI.top_p}" id="top_p"></div>`+
      '</div>'+
      '<div className="row">'+
      '<div className="col-6"><label for="frequency_penalty" className="form-label">Frequency_penalty</label></div>'+
      `<div className="col-6"><input type="range" className="form-range" min="0" max="1" step="0.1" value="${stateSettingsAI.frequency_penalty}" id="frequency_penalty"></div>`+
      '</div>'+
      '<div className="row">'+
      '<div className="col-6"><label for="presence_penalty" className="form-label">Presence_penalty</label></div>'+
      `<div className="col-6"><input type="range" className="form-range" min="0" max="1" step="0.1" value="${stateSettingsAI.presence_penalty}" id="presence_penalty"></div>`+
      '</div>',

      focusConfirm: false,
      preConfirm: () => {
        var temp:any = document.getElementById('temperature')!;
        var maxtokens:any = document.getElementById('max_tokens')!;
        var top_p:any = document.getElementById('top_p')!;
        var frequency_penalty:any = document.getElementById('frequency_penalty')!;
        var presence_penalty:any = document.getElementById('presence_penalty')!;
        return [
          temp.value,
          maxtokens.value,
          top_p.value,
          frequency_penalty.value,
          presence_penalty.value
        ]
      }
    })

    if (formValues) {
      const valores:settingsAI = {
        ...stateSettingsAI,
        temperature:Number(formValues[0]),
        max_tokens:Number(formValues[1]),
        top_p:Number(formValues[2]),
        frequency_penalty:Number(formValues[3]),
        presence_penalty:Number(formValues[4]),
      }

      setStateSettingsAI({
        ...valores
      })
      //Swal.fire(JSON.stringify(formValues))
    }
  }

  return {
    //Properties
    stateSettingsAI,
    state,
    consultando,
    vozState,

    

    //Methods
    setStateSettingsAI,
    setState,
    setConsultando,
    preguntar,
    limpiar,
    darVoz,
    callate
    
  };
};

