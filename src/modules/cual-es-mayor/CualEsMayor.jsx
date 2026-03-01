import PageTransition from '../../components/Layout/PageTransition';
import Background from '../../components/UI/Background';
import ReturnIcon from '../../components/UI/ReturnIcon';

function CualEsMayor() {
    return (
        <PageTransition>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Background />
                <ReturnIcon />
                <div style={{ position: 'relative', zIndex: 5, padding: '2rem', paddingTop: '100px', textAlign: 'center' }}>
                    <h1>⚖️ ¿Cuál es mayor?</h1>
                    <p>Pendiente implementación</p>
                </div>
            </div>
        </PageTransition>
    );
}

export default CualEsMayor;
