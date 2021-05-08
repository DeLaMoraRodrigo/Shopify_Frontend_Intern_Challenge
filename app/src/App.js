import React, { useState, useEffect } from "react";

import './App.css';
import { NominationsContext } from "./contexts/NominationsContext";
import SearchBar from "./components/SearchBar";

function App() {
  const [nominationsList, setNominationsList] = useState(JSON.parse(localStorage.getItem("nominations")) || []);

  const addNomination = movie => {
    setNominationsList([
      ...nominationsList,
      movie
    ])
  }

  const deleteNomination = movie => {
    setNominationsList(nominationsList.filter(nomination => nomination.imdbID !== movie.imdbID))
  }

  useEffect(() => {
    localStorage.setItem("nominations", JSON.stringify(nominationsList))
  }, [nominationsList])

  return (
    <div className="App">
      <h1 className="title">The Shoppies</h1>
      <NominationsContext.Provider value={{nominationsList, addNomination, deleteNomination}}>
        <div className="content-container">
          <SearchBar />
        </div>
        {nominationsList.length > 4 && <p>You have nominated {nominationsList.length} movies!!!</p>}
      </NominationsContext.Provider>

    </div>
  );
}

export default App;
