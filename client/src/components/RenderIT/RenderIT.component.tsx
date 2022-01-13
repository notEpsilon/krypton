import React from 'react';

const RenderIT: React.FC<{ data: any }> = ({ data }) => {
    return (
        <div>
            {
                Object.entries(data).map(([k, v], idx) => {
                    return (
                        k === 'type' ? null : (<><div key={idx}>{k}: {v}</div><hr /></>)
                    )
                })
            }
        </div>
    );
};

export default RenderIT;
