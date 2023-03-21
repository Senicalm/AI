import { useRef, useState } from 'react';
import { conversacion } from '../hooks/useAI';
import {AIControls, AIConversacion} from '../components';

export const Ai = () => {
  
  const [state,setState] = useState<conversacion[]>([]);

   const onChange = (news:conversacion[]) =>{
    
      setState(news);
    
   }

  return (
    <>
      <div className="container-fluid pt-3">

       
        <AIControls onChange={onChange}/>
        <AIConversacion conversacion={state}/>
      </div>
    </>
  );
};

export  default Ai;



