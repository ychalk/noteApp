import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { v4 as uuidv4 } from 'uuid';
import "../App.css";

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}

function Form(props) {
  const {
    noteInput,
    setNoteInput,
    setNoteArray,
    titleInput,
    setTitleInput,
    formData,
    setFormData,
    isFormComplete,
    parent,
  } = props;

  var moment = require('moment');

  const handleChangeNote = (e) => {

    setNoteInput(e.target.value);
  };

  const handleChangeTitle = (e) => {
    
    setTitleInput(e.target.value);
  };

  const handleSubmit = () => {

    const finalData = formData;
    finalData["dateCreated"] = moment().format('MMM Do YY, h:mm a');

    if (parent === "App") {
      finalData["id"] = uuidv4();
    }

    if (parent === "List") {
      finalData["id"] = formData["id"];
    }

    setNoteArray((prevState) => {
      return [finalData, ...prevState];
    });
    setNoteInput("");
    setTitleInput("");
    setFormData({});
  };


  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="note-wrapper">
      {/* Form */}
      <input
        className="title"
        onChange={handleChangeTitle}
        type="text"
        placeholder="Title..."
        value={titleInput}
      />
      <textarea 
       className="yourNote" 
       type="text" 
       cols="40" rows="5" 
       placeholder= "Your note..." 
       value={noteInput}
       onChange={handleChangeNote}
      />
      
      <button 
      disabled={!isFormComplete}
      className={`submit-button-${!isFormComplete}`} 
      onClick={handleSubmit}>
        ADD
      </button>
    </div>
  );
}

export default Form;