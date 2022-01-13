import "../App.css";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}

function List(props) {

  const [isEditing, setIsEditing] = useState(null);
  const { 
    noteArray,
    setNoteArray,    
  } = props;

  var moment = require('moment');

  const [show, setShow] = useState(null); 
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [oldTitle, setOldTitle] = useState();
  const [oldNote, setOldNote] = useState();
  const [newTitle, setNewTitle] = useState();
  const [newNote, setNewNote] = useState();

  const handleDelete = (d) => {
    console.log(d)
    const newArray = noteArray.filter((item) => {
      return item.id !== d.id;
    });
    setNoteArray(newArray);
  };

  const handleModalEdit = (h) => {
    console.log(h);
    handleShow();
    setIsEditing(h.id);
    setOldNote(h.noteInput);
    setOldTitle(h.titleInput);
    setNewNote(newNote);
    setNewTitle(newTitle);
  
  };

  const updateEdit = (h)=>{

    console.log("yes")

    let updatedNote = {
      id: h.id,
      titleInput: newTitle,
      noteInput: newNote,
      dateCreated: moment().format('MMM Do YY, h:mm a'),
    }

      const indexObject = noteArray.findIndex(item => item.id === h.id),
      updatedNoteArray = [...noteArray]
      updatedNoteArray[indexObject] = updatedNote;
      setNoteArray(updatedNoteArray);
      handleClose();
      setNewNote("");
      setNewTitle("");
  }  
  
  useEffect(() => {
    console.log(newNote);
  }, [newNote]);

  if (handleShow===true) {
    console.log("yay")
    handleModalEdit=false
  }  

  return (
    <div className="grid-container">
      {/* List */}
      {noteArray.map((item, index) => {
        return (
          <div className="grid-item" key={item.noteInput + index}>
            <a 
            href="#" 
            className='delete-button'
            value={item.id}
            onClick={() => { if (window.confirm('Are you sure you wish to delete this note?') ) handleDelete(item) } } >
              <img alt="svgImg" className="deleteImage" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAzMCAzMCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij4gICAgPHBhdGggZD0iTSA3IDQgQyA2Ljc0NDEyNSA0IDYuNDg3OTY4NyA0LjA5NzQ2ODcgNi4yOTI5Njg4IDQuMjkyOTY4OCBMIDQuMjkyOTY4OCA2LjI5Mjk2ODggQyAzLjkwMTk2ODcgNi42ODM5Njg4IDMuOTAxOTY4NyA3LjMxNzAzMTMgNC4yOTI5Njg4IDcuNzA3MDMxMiBMIDExLjU4NTkzOCAxNSBMIDQuMjkyOTY4OCAyMi4yOTI5NjkgQyAzLjkwMTk2ODcgMjIuNjgzOTY5IDMuOTAxOTY4NyAyMy4zMTcwMzEgNC4yOTI5Njg4IDIzLjcwNzAzMSBMIDYuMjkyOTY4OCAyNS43MDcwMzEgQyA2LjY4Mzk2ODggMjYuMDk4MDMxIDcuMzE3MDMxMyAyNi4wOTgwMzEgNy43MDcwMzEyIDI1LjcwNzAzMSBMIDE1IDE4LjQxNDA2MiBMIDIyLjI5Mjk2OSAyNS43MDcwMzEgQyAyMi42ODI5NjkgMjYuMDk4MDMxIDIzLjMxNzAzMSAyNi4wOTgwMzEgMjMuNzA3MDMxIDI1LjcwNzAzMSBMIDI1LjcwNzAzMSAyMy43MDcwMzEgQyAyNi4wOTgwMzEgMjMuMzE2MDMxIDI2LjA5ODAzMSAyMi42ODI5NjkgMjUuNzA3MDMxIDIyLjI5Mjk2OSBMIDE4LjQxNDA2MiAxNSBMIDI1LjcwNzAzMSA3LjcwNzAzMTIgQyAyNi4wOTgwMzEgNy4zMTcwMzEyIDI2LjA5ODAzMSA2LjY4Mjk2ODggMjUuNzA3MDMxIDYuMjkyOTY4OCBMIDIzLjcwNzAzMSA0LjI5Mjk2ODggQyAyMy4zMTYwMzEgMy45MDE5Njg3IDIyLjY4Mjk2OSAzLjkwMTk2ODcgMjIuMjkyOTY5IDQuMjkyOTY4OCBMIDE1IDExLjU4NTkzOCBMIDcuNzA3MDMxMiA0LjI5Mjk2ODggQyA3LjUxMTUzMTIgNC4wOTc0Njg3IDcuMjU1ODc1IDQgNyA0IHoiPjwvcGF0aD48L3N2Zz4="/>
            </a>
            <div>{item.titleInput}</div>
            <div> <br></br>  </div>
            <div>{item.noteInput}</div>
            <div> <br></br>  </div>
            <div>{item.dateCreated}</div>
            
            <Button variant="primary" value={item.id} onClick={() => {handleModalEdit(item)} } >
            Edit
            </Button>
          <Modal show={show} onHide={handleClose} value={item.id}>
      
           {isEditing === item.id && (
      

             <div className="yourNote">
               {/* Form */}
               <textarea
                 className="title"
                 name="newTitle"
                 value={newTitle}
                 onChange={(e) => setNewTitle(e.target.value)}
                 placeholder="title..."
               >
                 {oldTitle}
               </textarea>
     
               <textarea 
                 value={newNote}
                 name="newNote"
                 onChange={(e) => setNewNote(e.target.value)}
                 className="yourNote" 
                 cols="40" rows="5" 
                 placeholder= "Your note..." 
               >
                 {oldNote}
               </textarea>
               
               <button
                 className="modal__ok-button"
                 onClick={() => updateEdit(item)}
               >
                  Ok
               </button>
               <button className="modal__cancel-button" onClick={handleClose}>Cancel</button>
             </div>
      
           )}
 
      </Modal>
      
          </div>
        );
      })}
    </div>
  );
}

export default List;