import React, { useState } from 'react';
import localDB from './db';
import './App.css';

const CreateDocument = () => {
    const [rank, setRank] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [position, setPosition] = useState('');
    const [teams, setTeams] = useState('');  // Newline-separated string for teams
    const [totalPoints, setTotalPoints] = useState('');
    const [totalGames, setTotalGames] = useState('');
    const [pointsPerGame, setPointsPerGame] = useState('');
    const [fieldGoals, setFieldGoals] = useState('');
    const [threePointsGoals, setThreePointsGoals] = useState('');
    const [freeShots, setFreeShots] = useState('');
    const [born, setBorn] = useState('');
    const [activePlayer, setActivePlayer] = useState(true);
    const [hallOfFame, setHallOfFame] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        localDB.post({
            rank: parseInt(rank),
            player: playerName,
            position: position,
            teams: teams.split('\n').map(team => team.trim()),  // Split by newline
            total_points: parseInt(totalPoints),
            total_games: parseInt(totalGames),
            points_per_game: parseFloat(pointsPerGame),
            field_goals: parseInt(fieldGoals),
            three_points_goals: parseInt(threePointsGoals),
            free_shots: parseInt(freeShots),
            born: parseInt(born),
            active_player: activePlayer ? 1 : 0,
            hall_of_fame: hallOfFame ? parseInt(hallOfFame) : null,
            country: country
        }).then(function (response) {
            alert('Document Added successfully');
        }).catch(function (err) {
            console.error(err);
        });

        // Resetting form fields
        setRank('');
        setPlayerName('');
        setPosition('');
        setTeams('');
        setTotalPoints('');
        setTotalGames('');
        setPointsPerGame('');
        setFieldGoals('');
        setThreePointsGoals('');
        setFreeShots('');
        setBorn('');
        setActivePlayer(true);
        setHallOfFame('');
        setCountry('');
    };

    return (
        <div className="form-container">
            <h3>Please enter the details of a basketball player below!</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rank">Rank:</label>
                    <input type="number" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="playerName">Player Name:</label>
                    <input type="text" id="playerName" value={playerName} onChange={(e) => setPlayerName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="position">Position:</label>
                    <input type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="teams">Teams (format as a single string with newlines):</label>
                    <input
                        type="text"
                        id="teams"
                        value={teams}
                        onChange={(e) => setTeams(e.target.value)}
                        required
                        placeholder="Cleveland Cavaliers (2003–2010, 2014–2018)\nMiami Heat (2010–2014)\nLos Angeles Lakers (2018–present)"
                    />
                </div>
                <div>
                    <label htmlFor="totalPoints">Total Points:</label>
                    <input type="number" id="totalPoints" value={totalPoints} onChange={(e) => setTotalPoints(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="totalGames">Total Games:</label>
                    <input type="number" id="totalGames" value={totalGames} onChange={(e) => setTotalGames(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="pointsPerGame">Points Per Game:</label>
                    <input type="number" step="0.1" id="pointsPerGame" value={pointsPerGame} onChange={(e) => setPointsPerGame(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="fieldGoals">Field Goals:</label>
                    <input type="number" id="fieldGoals" value={fieldGoals} onChange={(e) => setFieldGoals(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="threePointsGoals">Three Points Goals:</label>
                    <input type="number" id="threePointsGoals" value={threePointsGoals} onChange={(e) => setThreePointsGoals(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="freeShots">Free Shots:</label>
                    <input type="number" id="freeShots" value={freeShots} onChange={(e) => setFreeShots(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="born">Born (Year):</label>
                    <input type="number" id="born" value={born} onChange={(e) => setBorn(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="activePlayer">Active Player:</label>
                    <select id="activePlayer" value={activePlayer} onChange={(e) => setActivePlayer(e.target.value === 'true')} required>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="hallOfFame">Hall of Fame Year (if inducted):</label>
                    <input type="number" id="hallOfFame" value={hallOfFame} onChange={(e) => setHallOfFame(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="country">Country:</label>
                    <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateDocument;
