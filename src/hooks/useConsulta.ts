
import { useState } from 'react';
import consultasApi from '../apis/consultasApi';
import Swal from "sweetalert2";

export const useConsulta = () => {
    
    const [adjuntando, setAdjuntando] = useState<boolean>(false);
    const [consultaState, setConsultaState] = useState<string>('');

    const vars = '[{"nombre":"procedure","valor":"nsDemoAI"}]';

    const adjuntar = async(texto:string,esAX:boolean = false)=>{
        setConsultaState('');
        setAdjuntando(true);

        const arrParametros = JSON.parse(texto);

        try {
        let post:string = "/sqlAI";
        if(esAX){
          post +="/AX";
        }
        const resp = await consultasApi.post(post, arrParametros);
        console.log(resp);
        console.log(resp.data.datos);
       
        if(resp.data.resp.ok){
            setConsultaState(JSON.stringify(resp.data.datos));
        }
        
        } catch (error) {
            console.log(error);
        }

        setAdjuntando(false);

    }

    const preguntarConsulta = async() =>{
      const { value: formValues } = await Swal.fire({
        title: 'Consulta',
        html:
        '<div className="row" style="width:100%">'+
        '<div className="col"><input type="checkbox" id="esax"><label for="esax" className="form-label">AX</label></div>'+
        '</div>'+
        '<div className="row" style="width:100%">'+
        '<div className="col" style="width:100%">'+
        '<textarea style="width:100%" id="consulta" value="'+ vars +'">[{"nombre":"procedure","valor":"nsDemoAI"}]</textarea>' +
        '</div>'+
        '</div>'+
        '</div>',
        focusConfirm: false,
        preConfirm: () => {
          var consulta:any = document.getElementById('consulta')!;
          var esAX:any = document.getElementById('esax')!;
          return [
            consulta.value,
            esAX.checked
          ]
        }
      })
      
      if (formValues) {
        adjuntar(formValues[0],formValues[1]);
      }
    }

  return {
    //Properties
    adjuntando,
    consultaState,
    //Methods
    adjuntar,
    setConsultaState,
    preguntarConsulta
  }
   
}

