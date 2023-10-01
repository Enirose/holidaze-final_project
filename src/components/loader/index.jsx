import { Col, Container, Row } from 'react-bootstrap';
import '../../styles/loader.scss';

export default function Loader () {
    return (
        <Container className='styleLoader'>
                    <span className="loader"></span>   
        </Container>
    )
}