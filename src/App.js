import { useEffect, useState } from "react";
import List from "./Components/List.js";
import Form from "./Components/Form.js";
import { v4 as uuidv4 } from 'uuid';


import "./App.css";

function App() {
  const [noteInput, setNoteInput] = useState();
  const [titleInput, setTitleInput] = useState();
  const [formData, setFormData] = useState();
  const [noteArray, setNoteArray] = useState([]);
  const [editArray, setEditArray] = useState([]);

  const [isFormComplete, setIsFormComplete] = useState(false);


  const [show, setShow] = useState(null);

  var moment = require('moment');


  useEffect(() => {
    if (
      formData &&
      formData ["noteInput"]
    ) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [formData]);


  useEffect(() => {
    const newFormData = {

      noteInput: noteInput,
      titleInput: titleInput,
      dateCreated: moment().format('MMM Do YY, h:mm a'),
      id: uuidv4(),  
    };
    console.log(newFormData)

    setFormData(newFormData);
  }, [noteInput, titleInput]);

  return (
    <div>
      <Form
        noteInput={noteInput}
        setNoteInput={setNoteInput}
        setNoteArray={setNoteArray}
        titleInput={titleInput}
        setTitleInput={setTitleInput}
        formData={formData}
        setFormData={setFormData}
        isFormComplete={isFormComplete}
        setEditArray={setEditArray}
      />
      <List noteArray={noteArray} setNoteArray={setNoteArray} editArray={editArray} setEditArray={setEditArray} />
    </div>
  );
}

export default App;