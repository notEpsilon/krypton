import React from 'react';

const RenderStudent: React.FC<{ data: any }> = ({ data }) => {
    return (
        <div>
            {
                Object.entries(data).map(([k, v], idx) => {
                    return (
                        k === 'type' ? null : (<><div key={idx}>{k}: {v === true ? 'true' : (v === false ? 'false' : v)}</div><hr /><hr /></>)
                    );
                })
            }
        </div>
    );
};

export default RenderStudent;
