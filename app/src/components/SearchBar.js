import React, { useState } from "react";
import axios from "axios";

import MovieCard from "./MovieCard";
import Nominations from "./Nominations";
import GenerateKey from "../utils/GenerateKey";
import "./SearchBar.css";

function SearchBar(props){
    const [search, setSearch] = useState({ title: "" });
    const [latestSearch, setLatestSearch] = useState("");
    const [movieList, setMovieList] = useState([]);

    const handleChange = e => {
        e.persist();
        setSearch({ ...search, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        setLatestSearch(search.title);
        let parsedSearch = search.title.split(" ").join("+");
        axios.get(`http://www.omdbapi.com/?s=${parsedSearch}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(res => {
                if (res.data.Search) {
                    setMovieList([])
                    setMovieList(res.data.Search);
                }else {
                    setMovieList([]);
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Movie Title

                    <input 
                        name="title"
                        value={search.title}
                        onChange={handleChange}
                    />
                </label>
            </form>
            {latestSearch ? 
            <div className="list-container">
                <div className="movie-container">
                    <h2>Results for "{latestSearch}"</h2>
                    {
                        movieList.length ? movieList.map(movie => {
                            return(
                                <MovieCard key={GenerateKey(movie.imdbID)} movie={movie} />
                            )
                        }) : <h3>No Movies Found!</h3>
                    }
                </div>
                <div className="nomination-container">
                    <Nominations />
                </div>
            </div> : 
            <div className="nomination-container empty">
                <Nominations />
            </div>
            }
        </div>
    )
}

export default SearchBar;