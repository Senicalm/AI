
import { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const useRecognition = () => {
    
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable
      } = useSpeechRecognition();
    
      useEffect(() => {
        // console.log('Listening:' + listening);
        if(!listening){
            console.log(transcript);
        }
      },[listening]);

      const record = async() =>{
        // if (!isMicrophoneAvailable) {
        //   console.log('Microfono no habilitado');
        // }
        
        await SpeechRecognition.startListening({ language: 'es-ES' });
      }

      const stop = () =>{
        
        SpeechRecognition.stopListening();
      }

      return{
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        record,
        stop
      }
}



export {
        useRecognition
      }
