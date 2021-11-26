import React from 'react';
import { useNavigate } from "react-router-dom";
import PictureComponent from '../../components/PictureComponent';
import './Home.scss';

function Home() {
  let navigate = useNavigate();

  const onCameraHandler = () => {
    navigate("/camera")
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
            retake={false}

          />
        </div>
      </div>
    </div>
  );
}

export default Home;
