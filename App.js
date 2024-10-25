import React from 'react';
import './App.css';
import CreateDocument from './CreateDocument';
import ShowDocuments from './showDocuments';

function App() {
  return (
    <div className="App">
      <h1>Basketball Database Application</h1>
      <div className="content">
        <CreateDocument/>
        <ShowDocuments />
      </div>
    </div>
  );
}

export default App;