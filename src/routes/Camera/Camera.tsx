import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import './Camera.scss';
import ID_BG from '../../images/id_bg.svg';
import { EvaluationSummary } from '../../models/EvaluationsModel';

function Camera() {
  let navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/");
  };

  const videoConstraints = {
    facingMode: { exact: "user" }
  };

  const [postCall, setPostCall] = useState(0);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    // Se captura la imagen y se simlua el envio por POST
    const handleNewPostCall = () => {
      const interval = setTimeout(() => {
        setPostCall(value => value += 1);
      }, 3000);
      return () => clearTimeout(interval);
    };

    if (webcamRef === null || webcamRef.current === null) {
      return handleNewPostCall();
    }
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc === null) {
      return handleNewPostCall();
    }
    const requestOptions = {
      method: 'POST',
    };

    fetch('https://front-exercise.z1.digital/evaluations', requestOptions)
      .then(response => response.json())
      .then((data: EvaluationSummary) => {
        //{"summary":{"outcome":"Approved"}}
        //{"summary":{"outcome":"Too Much Glare"}}
        localStorage.setItem('z1-evaluation', JSON.stringify({ imageSrc: imageSrc, outcome: data.summary.outcome }));
        setIsSuccess(data.summary.outcome === "Approved");
        if (data.summary.outcome === "Approved") {
          const interval = setTimeout(() => {
            goBackHandler();
          }, 3000);
          return () => clearTimeout(interval);
        }
        return handleNewPostCall();
      });

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [postCall]);

  return (
    <div className="Camera">
      <div className="content">
        <div className="wrapper">
          <h1>
            Take picture
          </h1>
          <p>
            Fit your ID card inside the frame.
          </p>
          <p>
            The picture will be taken automatically.
          </p>
          <div className="webcam">
            <Webcam
              videoConstraints={videoConstraints}
              className={isSuccess !== null ? isSuccess === true ? "success" : "error" : ""}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          </div>
          <div className="alert" id="alert-message"></div>
          <div className="cancel" onClick={goBackHandler}>CANCEL</div>
        </div>
      </div>
    </div>
  );
}

export default Camera;
