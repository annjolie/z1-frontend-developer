import React from 'react';
import './PictureComponent.scss';
import IDBackground from '../images/id_bg.svg';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PictureProps {
    image: string | null;
    retake: boolean;
    isSuccess: boolean | null;
    onCameraButton(): any
}

function PictureComponent(pictureProps : PictureProps) {
    const { image, retake, isSuccess, onCameraButton } = pictureProps;
    let imageSource = null;
    if (image === null || image === "") {
        // no tenemos la imagen, así que mostraremos la imagen por defecto
        imageSource = (<img className="shadow" src={IDBackground} alt="ID Background" />);
    }
    else {
        // tenemos la imagen, así que la mostramos, se colocará el borde verde en caso de éxito
        // y en rojo en caso de error
        imageSource = (<img src={image} className={isSuccess === true ? "success" : "error"} alt="User ID" />);
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
            {(image !== null && image !== "" && isSuccess !== null && isSuccess === false) && (
                <label className="error">
                    <FontAwesomeIcon icon={faTimes} />
                    REJECTED
                </label>
            )}
        </div>
    );
}

export default PictureComponent;