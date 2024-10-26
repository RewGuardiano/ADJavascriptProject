import React from 'react';
import './App.css';
import CreateDocument from './CreateDocument';
import ShowDocuments from './showDocuments';


function App() {
  return (
    <div className="App">
      <h1>NBA Players Points All-Time Application</h1>
      <CreateDocument />
      <ShowDocuments />
    </div>
  );
}

export default App;