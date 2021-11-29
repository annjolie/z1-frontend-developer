import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import PictureComponent from '../../components/PictureComponent';
import { Z1Evaluation } from '../../models/Z1EvaluationModel';
import './Home.scss';

function Home() {
  let navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [retake, setRetake] = useState(false);

  useEffect(() => {
    const evaluationString = localStorage.getItem('z1-evaluation');
    if (evaluationString === null) {
      return;
    }
    const evaluation: Z1Evaluation = JSON.parse(evaluationString);
    setIsSuccess(evaluation.outcome === "Approved");
    setErrorMessage(evaluation.outcome !== "Approved" ? evaluation.outcome : "");
    setSuccessMessage(evaluation.outcome === "Approved" ? evaluation.outcome : "");
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
            errorMessage={errorMessage}
            image={imageSrc}
            isSuccess={isSuccess}
            successMessage={successMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
