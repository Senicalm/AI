import React, { useRef ,KeyboardEvent} from 'react';
import { useAI, useConsulta, useRecognition } from '../hooks';
import { useEffect } from 'react';
import { conversacion } from '../hooks/useAI';

type Props = {
    onChange:(news: conversacion[]) => void
}

export const AIControls = ({ onChange }: Props) => {
  const {
    state,
    consultando,
    vozState,
    stateSettingsAI,
    preguntar,
    limpiar,
    darVoz,
    callate,
  } = useAI();
  const { consultaState, adjuntando, adjuntar, preguntarConsulta } =
    useConsulta();
  const { transcript, listening, record, stop } = useRecognition();

  const texto = useRef<HTMLTextAreaElement>(null);
  const adjuntarText = useRef<HTMLTextAreaElement>(null);

  const onClick = async (event: any) => {
    preguntar(texto.current?.value!).then(() => {
      texto.current!.value = "";
    });
  };

  const onLimpiar = () => {
    limpiar();
  };

  const onBorrar = () => {
    texto.current!.value = "";
  };

  useEffect(() => {
    if (texto.current!.value == "") {
      texto.current!.value = consultaState;
    } else {
      texto.current!.value += "\n" + consultaState;
    }
  }, [consultaState]);

  useEffect(() => {
    if (transcript) {
      if (texto.current!.value == "") {
        texto.current!.value = transcript;
      } else {
        texto.current!.value += "\n" + transcript;
      }
    }
  }, [listening]);

  useEffect(() => {
    onChange(state);
  }, [state]);

  // const onAdjuntar = async () => {
  //     adjuntar(adjuntarText.current?.value!);
  // };

  // const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
  //    event.key==='Enter' && preguntar(texto.current?.value!);
  // };

  const onChangeVoz = () => {
    if (vozState) {
      darVoz(false);
    } else {
      darVoz(true);
    }
  };

  // const slideChange = (e:any) =>{
  //   console.log(e)
  // }

  return (
    <div className="row chatControls">
      <div className="row">
        <div className="col">
          <textarea
            placeholder='Escribe aqui tu pregunta...'
            rows={3}
            ref={texto}
            style={{ width: "100%", borderRadius: "5px",resize:'none' }}
          />
        </div>
      </div>
      <div className="row pb-3 d-flex" style={{ height: "50px" }}>
        <div className="col-auto">
          {consultando ? (
            "Consultando IA..."
          ) : (
            <>
              <button onClick={onClick} className="btn btn-outline-secondary btn-sm">
                Preguntar a la IA
              </button>
            </>
          )}
        </div>
        <div className="col-auto">
          <button onClick={onBorrar} className="btn btn-outline-secondary btn-sm">
            Borrar texto
          </button>
        </div>
        <div className="col-auto">
          <div className="row d-flex ps-4">
            <div className="col-auto ps-1 pe-1">
              <button onClick={record} className="btn btn-outline-secondary btn-sm">
                Rec
              </button>
            </div>
          </div>
        </div>

        <div className="col" style={{ maxWidth: "65px" }}>
          <div className="d-flex align-content-center flex-wrap h-100">
            <input type="checkbox" name="voz" id="voz" onChange={onChangeVoz} />
            <label htmlFor={`voz`}>Voz</label>
          </div>
        </div>
        <div className="col">
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={callate}
          >
            Callate
          </button>
        </div>
        <div className="col text-end">
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={preguntarConsulta}
          >
            Consulta SQL
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={onLimpiar}
          >
            Limpiar conversacion
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIControls
