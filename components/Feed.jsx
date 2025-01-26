"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Function to handle tag click
  const handleTagClick = (tag) => {
    setSearchText(tag); // Set the tag in the search bar
    filterPosts(tag); // Filter posts based on the tag
  };

  // Function to handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value); // Update the search text
    filterPosts(value); // Filter posts based on the input value
  };

  // Function to filter posts
  const filterPosts = (query) => {
    if (query.trim()) {
      // Filter posts only when there's a search query
      const filtered = posts.filter(
        (post) =>
          post.prompt.toLowerCase().includes(query.toLowerCase()) ||
          post.creator.username.toLowerCase().includes(query.toLowerCase()) ||
          post.tag.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      // Reset to all posts if search bar is cleared
      setFilteredPosts([]);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt/");
        const data = await response.json();
        setPosts(data);
        setFilteredPosts([]); // Show all posts by default
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed w-full">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for prompts, username, or tag"
          value={searchText}
          onChange={handleSearch} // Trigger filtering on input change
        />
      </form>
      <PromptCardList
        data={searchText ? filteredPosts : posts} // Show filteredPosts if searching; otherwise, all posts
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
