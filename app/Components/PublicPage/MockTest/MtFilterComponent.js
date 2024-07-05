import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { useState } from 'react';

const MtFilterComponent = () => {
  const [filterData, setFilterData] = useState([
    {
      title: "Class",
      tags: [
        { label: "Class 4", id: "class4" },
        { label: "Class 5", id: "class5" },
        { label: "Class 6", id: "class6" },
      ]
    },
    {
      title: "Type",
      tags: [
        { label: "Crash Course", id: "crashCourse" },
        { label: "Full Course", id: "fullCourse" },
      ]
    },
    {
      title: "Duration",
      tags: [
        { label: "3 Months", id: "3months" },
        { label: "1 Years", id: "1years" },
      ]
    },
  ]);

  return (
    <>
      {filterData && filterData.map((e, j) => (
        <div key={j}>
          <h4 style={{ color: "#082952", fontFamily: "Adequate, Helvetica Neue, Helvetica, sans-serif" }}><strong>{e.title}</strong></h4>
          <FormGroup>
            {e?.tags?.map((i, k) => (
              <FormControlLabel
                key={k}
                control={<Checkbox name={i.id} style={{ color: '#333' }} />}
                label={<span style={{ color: "#082952", margin: "0 5px" }}>{i.label}</span>} // Reduced space between labels
              />
            ))}
          </FormGroup>
        </div>
      ))}
    </>
  );
};

export default MtFilterComponent;
