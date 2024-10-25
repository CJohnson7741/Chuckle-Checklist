import React, { useState, useEffect } from "react";
import "./App.css";
import {
  getAllJokes,
  addJoke,
  toggleJoke,
  deleteJoke,
} from "./services/JokeServices.js";
import stevePic from "./assets/steve.png";

export const App = () => {
  const [allJokes, setAllJokes] = useState([]);
  const [newJoke, setNewJoke] = useState("");
  const [toldJokes, setToldJokes] = useState([]);
  const [unToldJokes, setUntoldJokes] = useState([]);

  useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
      console.log("Jokes set!");

      const told = jokesArray.filter((joke) => joke.told);
      const untold = jokesArray.filter((joke) => !joke.told);

      setToldJokes(told);
      setUntoldJokes(untold);
    });
  }, []);

  const handleAddJoke = () => {
    if (newJoke) {
      const jokeToAdd = { text: newJoke, told: false };

      addJoke(jokeToAdd)
        .then((addedJoke) => {
          setAllJokes((prevJokes) => [...prevJokes, addedJoke]);
          setNewJoke("");
          //update the told and untold jokes list to include the added joke
          setUntoldJokes((prevUntold) => [...prevUntold, addedJoke]);
        })
        .catch((error) => {
          console.error("Error adding joke:", error);
        });
    }
  };

  const handleJokeToldChange = async (joke) => {
    const updatedJoke = { ...joke, told: !joke.told };

    try {
      await toggleJoke(updatedJoke); // Call the toggle function

      // Update local state
      setToldJokes((prevTold) =>
        updatedJoke.told
          ? [...prevTold, updatedJoke]
          : prevTold.filter((editedJoke) => editedJoke.id !== joke.id)
      );

      setUntoldJokes((prevUntold) =>
        updatedJoke.told
          ? prevUntold.filter((editedJoke) => editedJoke.id !== joke.id)
          : [...prevUntold, updatedJoke]
      );
    } catch (error) {
      console.error("Error updating joke:", error);
    }
  };

  const handleDeleteJoke = async (jokeId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this joke?"
    );
    if (confirmation) {
      await deleteJoke(jokeId);
      // Update your state to remove the deleted joke
      setAllJokes((prevJokes) =>
        prevJokes.filter((joke) => joke.id !== jokeId)
      );
      setToldJokes((prevTold) => prevTold.filter((joke) => joke.id !== jokeId));
      setUntoldJokes((prevUntold) =>
        prevUntold.filter((joke) => joke.id !== jokeId)
      );
    }
  };

  return (
    <div className="app-container">
      <header className="app-heading">
        <h1 className="app-heading-text">Chuckle Checklist</h1>
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
      </header>
      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={newJoke}
          onChange={(event) => setNewJoke(event.target.value)}
        />
        <button
          className="joke-input-submit"
          onClick={() => handleAddJoke(joke)}
        >
          Add
        </button>
      </div>

      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            Untold<span className="untold-count">{unToldJokes.length}</span>
          </h2>
          {unToldJokes.map((joke, index) => (
            <li key={index} className="joke-list-item">
              <p className="joke-list-item-text">{joke.text}</p>
              <button
                className="joke-list-action-toggle"
                onClick={() => handleJokeToldChange(joke)}
              >
                tell
              </button>

              <button
                className="joke-list-action-delete"
                onClick={() => handleDeleteJoke(joke.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </div>
        <div className="joke-list-container">
          <h2>
            Told<span className="told-count">{toldJokes.length}</span>
          </h2>
          {toldJokes.map((joke, index) => (
            <li key={index} className="joke-list-item">
              <p className="joke-list-item-text">{joke.text}</p>
              <button
                className="joke-list-action-toggle"
                onClick={() => handleJokeToldChange(joke)}
              >
                untell
              </button>

              <button
                className="joke-list-action-delete"
                onClick={() => handleDeleteJoke(joke.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};
