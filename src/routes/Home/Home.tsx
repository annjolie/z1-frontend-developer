import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import PictureComponent from '../../components/PictureComponent';
import { Z1Evaluation } from '../../models/Z1EvaluationModel';
import './Home.scss';

function Home() {
  let navigate = useNavigate();

  /**
   * Verifica si fue exitoso o no la captura de imagen al servidor, y en la primera carga es null
   */
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [retake, setRetake] = useState(false);

  useEffect(() => {
    // En localStorage se encuentra almacenado la información
    // de la captura de imagen y el resultado de la llamada
    // POST de la evaluación de Z1
    const evaluationString = localStorage.getItem('z1-evaluation');
    if (evaluationString === null) {
      return;
    }
    const evaluation: Z1Evaluation = JSON.parse(evaluationString);
    setIsSuccess(evaluation.outcome === "Approved");
    setRetake(evaluation.outcome !== "Approved");
    setImageSrc(evaluation.imageSrc);
  }, [])

  const onCameraHandler = () => {
    navigate("/camera");
  };

  return (
    <div className="Home">
      <header>
        BankClient
      </header>
      <div className="line"></div>
      <div className="body">
        <h1>
          Scan your ID
        </h1>
        <p>
          Take a picture. It may take time to validate your personal information.
        </p>
        <div className="photo-container">
          <PictureComponent
            onCameraButton={onCameraHandler}
            retake={retake}
            image={imageSrc}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
