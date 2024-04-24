
import React, { useState } from "react";
import openai from "../utils/openai";

const GptSearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        // Perform search using GPT API
        const gptQuery = "Act as a Food Restaurants recommendation system and suggest some restaurants in Bengaluru query :" + searchQuery + ". only give me names of five restaurants, comma separated like the example result given ahead. Example Result: KFC, Dominos, Pizzahut, McDonalds, Nandhana Deluxe"
        const getGptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });
        setSearchResults(getGptResults?.choices[0]?.message.content.split(", "))

    };

    return (
        <div className="mx-auto flex items-center justify-center flex-col mt-5">
            <h1 className="text-3xl font-bold mb-4">GPT Search Page</h1>
            <div className="flex items-center">
                <input
                    className="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow w-96"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter search query..."
                />
            </div>
            <button className="bg-blue-500 text-white py-2 rounded-md mt-2 w-32" onClick={handleSearch}>Search</button>

            {/* Display search results */}
            <div className="mt-4">
                {searchResults.map((name, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex items-center">
                            <div className="rounded-full bg-blue-500 text-white flex items-center justify-center w-10 h-10 mr-3">
                                {index + 1} {/* Display the index of the restaurant */}
                            </div>
                            <p className="text-lg font-semibold">{name.trim()}</p>
                        </div>
                        <hr className="my-2 border-gray-300" /> {/* Divider line */}
                    </div>
                ))}

                {searchResults.length === 0 && (
                    <p>No restaurants found</p>
                )}
            </div>
        </div>
    );
};

export default GptSearchPage;
