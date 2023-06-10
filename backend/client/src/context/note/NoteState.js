import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host="http:/localhost:5000"
  
  const notesInitial=[];
  const [notes, setNotes] = useState(notesInitial);
  
  return (
    <noteContext.Provider value={{ notes,setNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
