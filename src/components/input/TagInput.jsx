import React, { useState } from "react";
import "./tag.css";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    let trimmedValue = inputValue.trim();
    if (trimmedValue !== "") {
      setTags(prev=>[...prev, trimmedValue]);
      setInputValue("");
    }
    // console.log(trimmedValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <div className="tags-list">
        {tags.map((tag, index) => (
          <div className="tag-item" key={index}>
            <span className="tag-text">#{tag}</span>
            <MdClose
              className="remove-tag"
              onClick={() => handleRemoveTag(tag)}
            />
          </div>
        ))}
      </div>

      <div className="tag-container">
        <input
          type="text"
          className="tag-input"
          placeholder="Tag"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <MdAdd className="add-tag" onClick={addNewTag} />
      </div>
    </>
  );
};

export default TagInput;
