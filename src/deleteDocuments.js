import React, { useState } from 'react';

const DeleteDocument = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
      };

return(
    <div>
        <form onSubmit={handleSubmit}></form>
            <h3>Please Select a team to delete below!</h3>
        <form/>
    </div>
);
}
export default DeleteDocument;