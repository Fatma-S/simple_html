// src/components/CSVUpload.js

import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';

const CSVUpload = ({ handleParsedData }) => {
  const [data, setData] = useState([]);

  const handleFileUpload = (data) => {
    setData(data);
    handleParsedData(data); // Pass parsed data to the parent
  };

  return (
    <div>
      <CSVReader
        onFileLoaded={handleFileUpload}
        inputId="csvInput"
        inputStyle={{ display: 'none' }}
      />
      <div>
        <h3>CSV Roster:</h3>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row['First Name']}</td>
                <td>{row['Last Name']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CSVUpload;
