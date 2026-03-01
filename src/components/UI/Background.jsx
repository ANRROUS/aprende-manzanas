import fondoGeneral from '../../assets/images/Fondo-game.png';
import './Background.css';

function Background() {
    return (
        <div className="page-background">
            <img src={fondoGeneral} alt="Fondo" draggable="false" />
        </div>
    );
}

export default Background;
