import React from 'react';
import './PictureComponent.scss';
import IDBackground from '../images/id_bg.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

interface PictureProps {
    image: string | null;
    retake: boolean;
    isSuccess: boolean | null;
    successMessage: string | null;
    errorMessage: string | null;
    onCameraButton(): any
}

function PictureComponent(pictureProps : PictureProps) {
    const { image, retake, isSuccess, successMessage, errorMessage, onCameraButton } = pictureProps;
    let imageSource = null;
    console.log(pictureProps)
    if (image === null || image === "") {
        imageSource = (<img className="shadow" src={IDBackground} alt="ID Background" />);
    }
    else {
        imageSource = (<img src={image} className={isSuccess === true ? "success" : "error"} alt="User ID" />)
    }

    return (
        <div className="PictureComponent">
            {imageSource}
            {image === null && 
                <button>TAKE PICTURE</button>
            }
            {(image !== null && isSuccess === false && retake) &&
                <button>RETAKE PICTURE</button>
            }
            <div className="wrapper" onClick={onCameraButton}></div>
            {(image !== null && image !== "" && isSuccess === true) && (
                <label className="success">
                    <FontAwesomeIcon icon={faCheck} />
                    ACCEPTED
                </label>
            )}
            {(isSuccess !== null && isSuccess === false) && (
                <label className="error">
                    <FontAwesomeIcon icon={faTimes} />
                    REJECTED
                </label>
            )}
        </div>
    );
}

export default PictureComponent;