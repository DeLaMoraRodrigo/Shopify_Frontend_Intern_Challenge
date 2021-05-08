import React, { useContext } from "react";

import { NominationsContext } from "../contexts/NominationsContext";
import GenerateKey from "../utils/GenerateKey";
import "./Nominations.css";

function Nominations() {
    const { nominationsList, deleteNomination } = useContext(NominationsContext);

    return (
        <div>
            <h2>Nominations</h2>
            {
                nominationsList.length > 0 ? nominationsList.map(nomination => {
                    return (
                        <div key={GenerateKey(nomination.Title + nomination.Year)} className="nomination-card">
                            <ol >{nomination.Title} ({nomination.Year})</ol>
                            <button onClick={() => {deleteNomination(nomination)}}>Remove</button>                        
                        </div>
                    )
                }) :
                <h3>No Nominations Yet</h3>
            }
        </div>
    )
}

export default Nominations;