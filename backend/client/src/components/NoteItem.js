import React,{useContext} from 'react'
import noteContext from '../context/note/noteContext'

export const NoteItem = (props) => {
    const context = useContext(noteContext)
    const {notes, setNotes} = context;
    const host ="http://localhost:5000"
    const {note,updateNote}=props;
    // Delete a note
const deleteNote =async (id) => {
    
    console.log("deleting the node with id :" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem('token')
      },
    });
    
    const json=response.json()
    console.log(json);
    props.showAlert('Note deleted','success')
  };


  return (
  <>
 <div className="col-md-3" > 
            <div className="card my-3"> 
                <div className ="card-body">
                    <div className="d-flex align-items-center">

                <h5 className ="card-title">{note.title}</h5>
                <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id)}}></i>
                <i className="fa-solid fa-pen-to-square " onClick={()=>{updateNote(note)}}></i>
                    </div>
                <p className ="card-text">{note.description} </p> 
                {/* <p className ="card-text">{note.tag} </p>  */}
                </div>
            </div>
        </div>

  </>
  )
}
