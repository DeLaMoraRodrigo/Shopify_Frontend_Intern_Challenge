import React, { useContext } from "react";

import { NominationsContext } from "../contexts/NominationsContext";
import "./MovieCard.css";

function MovieCard(props) {
    const { movie } = props;
    const { addNomination, nominationsList } = useContext(NominationsContext);

    return (
        <div key={movie.Poster} className="movie-card">
            <ol key={movie.imdbID}>
                {movie.Title} ({movie.Year})
            </ol>
            <button key={movie.title} disabled={nominationsList.filter(nominee => {return nominee.imdbID === movie.imdbID}).length > 0} onClick={() => {addNomination(movie)}}>Nominate</button>
        </div>
    )
}

export default MovieCard;