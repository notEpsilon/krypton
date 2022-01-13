import React from 'react';

const RenderProfessor: React.FC<{ data: any }> = ({ data }) => {
    return (
        <div>
            {
                Object.entries(data).map(([k, v], idx) => {
                    return (
                        k === 'email' ? (<><div key={idx}>{k}: {v}</div><hr /></>) : (k === 'type' ? null : (<><div key={idx}>
                            {
                                (v as any).map((c: any) => <span>{c}</span>)
                            }
                        </div><hr /></>))
                    );
                })
            }
        </div>
    );
};

export default RenderProfessor;
