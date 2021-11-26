import React from 'react';
import './PictureComponent.scss';
import IDBackground from '../images/id_bg.svg';

interface PictureProps {
    image?: string;
    retake: boolean;
    isSuccess?: boolean;
    successMessage?: string;
    errorMessage?: string;
    onCameraButton(): any
}

function PictureComponent({ image, retake, isSuccess, successMessage, errorMessage, onCameraButton }: PictureProps) {
    let imageSource = null;
    if (image == null || image == "") {
        imageSource = (<img src={IDBackground} alt="ID Background" />);
    }

    return (
        <div className="PictureComponent">
            {imageSource != null && imageSource}
            <button>{retake == false ? "TAKE PICTURE" : "RETAKE PICTURE"}</button>
            <div className="wrapper" onClick={onCameraButton}></div>
        </div>
    );
}

export default PictureComponent;