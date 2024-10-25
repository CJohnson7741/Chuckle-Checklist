export const getAllJokes = () => {
  return fetch("http://localhost:8088/jokes").then((res) => res.json());
};

export const addJoke = async (joke) => {
  const response = await fetch("http://localhost:8088/jokes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joke),
  });

  if (!response.ok) {
    throw new Error("Failed to add joke");
  }

  return await response.json();
};

export const toggleJoke = async (joke) => {
  const response = await fetch(`http://localhost:8088/jokes/${joke.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joke),
  });

  if (!response.ok) {
    throw new Error("Failed to update joke");
  }

  return await response.json();
};

export const deleteJoke = async (jokeId) => {
  try {
    const response = await fetch(`http://localhost:8088/jokes/${jokeId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting joke:", error);
  }
};
