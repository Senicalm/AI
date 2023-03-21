import { useEffect, useRef } from "react";
import { conversacion } from "../hooks/useAI";

type Props = {
conversacion?:conversacion[]
}

export const AIConversacion = ({conversacion}:Props) => {

    const conversacionContainer = useRef<HTMLDivElement>(null);   

    useEffect(() => {
        setTimeout(() => {
        const maxScroll =  conversacionContainer.current?.scrollHeight!;
        
        conversacionContainer.current!.scroll({
          top: maxScroll,
          behavior: "smooth"
        })

      }, 500);
    }, [conversacion])
    
  return (
    <div className="row ps-3 pb-3 pe-3 pt-3 rowMi" ref={conversacionContainer}>
          <div className="col">
            <ul style={{ listStyle: "none", margin: "0px", padding: "0px" }}>
              {conversacion!.reverse().map((est, index) => {
                return (
                  <li
                    key={index}
                    style={{
                      backgroundColor:
                        est.role === "assistant" ? "grey" : "",
                      paddingBottom: "5px",
                      paddingLeft: "4px",
                      paddingRight: "2px",
                      borderRadius: "5px",
                      marginTop: "10px"
                    }}
                  >
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        color: est.role === "assistant" ? "yellow" : "#ADD8E6",
                        paddingLeft: "2px",
                        paddingRight: "2px",
                        paddingTop:'5px',
                        paddingBottom:'5px'
                      }}
                    >
                      {
                        (est.role)=='assistant'?
                        <img src="ChatGPT_logo.svg.png" alt="chat" className="img-fluid" style={{ maxHeight:'30px',maxWidth:'30px',marginRight:'4px'}} />:
                        <img src="tire-marks.png" alt="chat" className="img-fluid" style={{ maxHeight:'30px',maxWidth:'30px',marginRight:'4px'}} />
                      }
                      
                      {est.role}
                    </div>
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {est.content}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
  )
}

export default AIConversacion;
