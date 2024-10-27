import React, { useState, useEffect } from 'react';
import localDB from './db'; // Import your localDB setup correctly

const ShowDocuments = () => {
  const [docs, setDocs] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState(null);

  useEffect(() => {
      const fetchDocs = async () => {
          try {
              const allDocs = await localDB.allDocs({ include_docs: true });
              // Filter out design documents
              const filteredDocs = allDocs.rows
                  .map(row => row.doc)
                  .filter(doc => !doc._id.startsWith('_design')); // Exclude design documents
              setDocs(filteredDocs);
          } catch (err) {
              console.error('Error fetching documents:', err);
          }
      };
      fetchDocs();
  }, []);

    const handleInputChange = (e, docId, field, isArray = false) => {
        const updatedDocs = docs.map(doc => {
            if (doc._id === docId) {
                let newValue;
                switch (field) {
                    case 'rank':
                    case 'total_points':
                    case 'total_games':
                    case 'points_per_game':
                    case 'field_goals':
                    case 'three_points_goals':
                    case 'free_shots':
                    case 'born':
                        newValue = Number(e.target.value); // Convert to Number
                        break;
                    case 'active_player':
                        newValue = e.target.value === 'true' ? 1 : 0; // Convert to 1 or 0
                        break;
                    case 'teams':
                        newValue = e.target.value; // Keep as string for multiple teams
                        break;
                    default:
                        newValue = e.target.value; // Default to string
                        break;
                }
                return {
                    ...doc,
                    [field]: isArray ? newValue.split('\n').map(team => team.trim()) : newValue,
                };
            }
            return doc;
        });
        setDocs(updatedDocs);
    };

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
            // Format the document structure to match the desired output
        const updatedDoc = {
            ...docToUpdate,
            // Ensure the types are correct
            rank: Number(docToUpdate.rank),
            player: docToUpdate.player,
            position: docToUpdate.position,
            teams: docToUpdate.teams,
            total_points: Number(docToUpdate.total_points),
            total_games: Number(docToUpdate.total_games),
            points_per_game: Number(docToUpdate.points_per_game),
            field_goals: Number(docToUpdate.field_goals),
            three_points_goals: Number(docToUpdate.three_points_goals),
            free_shots: Number(docToUpdate.free_shots),
            born: Number(docToUpdate.born),
            active_player: docToUpdate.active_player, // This will be 1 or 0
            hall_of_fame: docToUpdate.hall_of_fame || "", // Ensure it's a string
            country: docToUpdate.country,
        };
        
        try {
            await localDB.put(updatedDoc);
            alert('Document updated successfully!');
        } catch (err) {
            console.error('Error updating document:', err);
            alert('Failed to update document');
        }
    };

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
            setDocs(docs.filter(doc => doc._id !== selectedDocId));
        } catch (err) {
            console.error('Error deleting document:', err);
            alert('Failed to delete document');
        }
    };


    return (
        <div className="table-wrapper">
          <form>
            <h2>Below is a list of Basketball Players!</h2>
            <h3>Select a player to Update or Delete</h3>
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
                    <td data-label="Select">
                      <input type="radio" name="id_buttons" id={doc._id} onChange={() => setSelectedDocId(doc._id)} />
                    </td>
                    <td data-label="Rank">
                      <input type="number" value={doc.rank || ''} onChange={(e) => handleInputChange(e, doc._id, 'rank')} />
                    </td>
                    <td data-label="Player Name">
                      <input type="text" value={doc.player || ''} onChange={(e) => handleInputChange(e, doc._id, 'player')} />
                    </td>
                    <td data-label="Position">
                      <input type="text" value={doc.position || ''} onChange={(e) => handleInputChange(e, doc._id, 'position')} />
                    </td>
                    <td data-label="Teams">
                      <input type="text" value={Array.isArray(doc.teams) ? doc.teams.join(', ') : doc.teams || ''} onChange={(e) => handleInputChange(e, doc._id, 'teams', true)} />
                    </td>
                    <td data-label="Total Points">
                      <input type="number" value={doc.total_points || ''} onChange={(e) => handleInputChange(e, doc._id, 'total_points')} />
                    </td>
                    <td data-label="Total Games">
                      <input type="number" value={doc.total_games || ''} onChange={(e) => handleInputChange(e, doc._id, 'total_games')} />
                    </td>
                    <td data-label="Points Per Game">
                      <input type="number" value={doc.points_per_game || ''} onChange={(e) => handleInputChange(e, doc._id, 'points_per_game')} />
                    </td>
                    <td data-label="Field Goals">
                      <input type="number" value={doc.field_goals || ''} onChange={(e) => handleInputChange(e, doc._id, 'field_goals')} />
                    </td>
                    <td data-label="Three Points Goals">
                      <input type="number" value={doc.three_points_goals || ''} onChange={(e) => handleInputChange(e, doc._id, 'three_points_goals')} />
                    </td>
                    <td data-label="Free Shots">
                      <input type="number" value={doc.free_shots || ''} onChange={(e) => handleInputChange(e, doc._id, 'free_shots')} />
                    </td>
                    <td data-label="Born (Year)">
                      <input type="number" value={doc.born || ''} onChange={(e) => handleInputChange(e, doc._id, 'born')} />
                    </td>
                    <td data-label="Active Player">
                      <select value={doc.active_player ? 'true' : 'false'} onChange={(e) => handleInputChange(e, doc._id, 'active_player')}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </td>
                    <td data-label="Hall of Fame Year">
                      <input type="number" value={doc.hall_of_fame || ''} onChange={(e) => handleInputChange(e, doc._id, 'hall_of_fame')} />
                    </td>
                    <td data-label="Country">
                      <input type="text" value={doc.country || ''} onChange={(e) => handleInputChange(e, doc._id, 'country')} />
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