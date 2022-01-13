import React from 'react';

const RenderStudent: React.FC<{ data: any }> = ({ data }) => {
    return (
        <div>
            {
                Object.entries(data).map(([k, v], idx) => {
                    return (
                        k === 'type' ? null : (k === 'courses' ? (<>
                            <div key={idx}>{k}: {(v as any).map((crs: any, nidx: number) => (<div key={nidx}>{crs.name} | {crs.grade} | {crs.absenceCount}</div>))}</div><hr />
                        </>) : (<><div key={idx}>{k}: {v === true ? 'true' : (v === false ? 'false' : v)}</div><hr /></>))
                    );
                })
            }
        </div>
    );
};

export default RenderStudent;
