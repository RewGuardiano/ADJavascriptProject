import React, { useState, useEffect } from 'react';

const UpdateDocument = async () => {
    const updatedDoc = {
    };

    /*try {
      const response = await localDB.put(updatedDoc);
      console.log('Document updated successfully:', response);
      alert('Document updated');
      setDocToEdit(null);  // Close the form after updating

      const allDocs = await localDB.allDocs({ include_docs: true });
      setDocs(allDocs.rows.map(row => row.doc));
    } catch (err) {
      console.error('Error updating document:', err);
    }
  };*/

return(
    <div>
        <form>
            <h3>Please Select a team to Update below!</h3>
            <input></input>
            <input></input>
            <input></input>
            <input></input>
            <input></input>
        </form>
    </div>
);
}
export default UpdateDocument;