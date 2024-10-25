import React, { useState, useEffect } from 'react';
import localDB  from './db'; // Make sure to import localDB correctly

const ShowDocuments = () => {
    const [docs, setDocs] = useState([]);
    const [selectedDocId, setSelectedDocId] = useState(null); // Track selected document

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const allDocs = await localDB.allDocs({ include_docs: true });
                setDocs(allDocs.rows.map(row => row.doc));
            } catch (err) {
                console.error('Error fetching documents:', err);
            }
        };
        fetchDocs();
    }, []);

    // Handle input change for editable fields
    const handleInputChange = (e, docId, field) => {
        const updatedDocs = docs.map(doc => {
            if (doc._id === docId) {
                return { ...doc, [field]: e.target.value }; // Update the specific field
            }
            return doc;
        });
        setDocs(updatedDocs); // Update state with new values
    };

    // Handle document update
    const handleUpdate = async () => {
        if (!selectedDocId) {
            alert('Please select a document to update!');
            return;
        }

        const docToUpdate = docs.find(doc => doc._id === selectedDocId);
        if (!docToUpdate) {
            alert('Document could not be found!');
            return;
        }

        try {
            await localDB.put(docToUpdate); // Save updated document to CouchDB
            alert('Document updated successfully!');
        } catch (err) {
            console.error('Error updating document:', err);
            alert('Failed to update document');
        }
    };

    // Handle document delete
    const handleDelete = async () => {
        if (!selectedDocId) {
            alert('Please select a document to delete!');
            return;
        }

        const docToDelete = docs.find(doc => doc._id === selectedDocId);
        if (!docToDelete) {
            alert('Document could not be found!');
            return;
        }

        try {
            await localDB.remove(docToDelete._id, docToDelete._rev);
            alert('Document deleted successfully!');

            // Update the document list in state
            setDocs(docs.filter(doc => doc._id !== selectedDocId));
        } catch (err) {
            console.error('Error deleting document:', err);
            alert('Failed to delete document');
        }
    };

    return (
        <div>
            <form>
                <h3>Below is a list of Basketball Players!</h3>
                <h4>Select a player to Update or Delete</h4>
                <button type="button" onClick={handleDelete}>Delete</button>
                <button type="button" onClick={handleUpdate}>Update</button>
                <table className="dataTable">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Rank</th>
                            <th>Player Name</th>
                            <th>Position</th>
                            <th>Teams</th>
                            <th>Total Points</th>
                            <th>Total Games</th>
                            <th>Points Per Game</th>
                            <th>Field Goals</th>
                            <th>Three Points Goals</th>
                            <th>Free Shots</th>
                            <th>Born (Year)</th>
                            <th>Active Player</th>
                            <th>Hall of Fame Year</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {docs.map(doc => (
                            <tr key={doc._id}>
                                <td>
                                    <input
                                        type="radio"
                                        name="id_buttons"
                                        id={doc._id}
                                        onChange={() => setSelectedDocId(doc._id)} // Track selected doc
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={doc.rank}
                                        onChange={(e) => handleInputChange(e, doc._id, 'rank')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={doc.player}
                                        onChange={(e) => handleInputChange(e, doc._id, 'player')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={doc.position}
                                        onChange={(e) => handleInputChange(e, doc._id, 'position')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={doc.teams.join(', ')} // Join array for display
                                        onChange={(e) => handleInputChange(e, doc._id, 'teams', e.target.value.split(',').map(team => team.trim()))} // Update array directly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={doc.total_points}
                                        onChange={(e) => handleInputChange(e, doc._id, 'total_points')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={doc.total_games}
                                        onChange={(e) => handleInputChange(e, doc._id, 'total_games')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={doc.points_per_game}
                                        onChange={(e) => handleInputChange(e, doc._id, 'points_per_game')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={doc.field_goals}
                                        onChange={(e) => handleInputChange(e, doc._id, 'field_goals')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={doc.three_points_goals}
                                        onChange={(e) => handleInputChange(e, doc._id, 'three_points_goals')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={doc.free_shots}
                                        onChange={(e) => handleInputChange(e, doc._id, 'free_shots')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={doc.born}
                                        onChange={(e) => handleInputChange(e, doc._id, 'born')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={doc.active_player ? 'Yes' : 'No'}
                                        onChange={(e) => handleInputChange(e, doc._id, 'active_player', e.target.value === 'Yes')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={doc.hall_of_fame ? doc.hall_of_fame : ''}
                                        onChange={(e) => handleInputChange(e, doc._id, 'hall_of_fame')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={doc.country}
                                        onChange={(e) => handleInputChange(e, doc._id, 'country')}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default ShowDocuments;