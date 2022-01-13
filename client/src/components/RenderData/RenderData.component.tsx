import React from 'react';
import { Card } from 'react-bootstrap';
import RenderStudent from '../RenderStudent/RenderStudent.component';
import RenderProfessor from '../RenderProfessor/RenderProfessor.component';
import RenderIT from '../RenderIT/RenderIT.component';

const RenderData: React.FC<{ data: any }> = ({ data }) => {
    return (
        <Card style={{ width: '15rem', marginLeft: 'auto', marginRight: 'auto', marginTop: '1rem', marginBottom: '1rem' }}>
            <Card.Body>
                {
                    data.type === 0 ? (<RenderStudent data={data} />) : null
                }
                {
                    data.type === 1 ? (<RenderProfessor data={data} />) : null
                }
                {
                    data.type === 2 ? (<RenderIT data={data} />) : null
                }
            </Card.Body>
        </Card>
    );
};

export default RenderData;
