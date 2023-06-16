import React, {useContext,useState, useEffect, useRef} from 'react'
import noteContext from '../context/note/noteContext'
import { NoteItem } from './NoteItem'
import { AddNote } from './AddNote'
import { useNavigate } from 'react-router-dom'

export const Notes = (props) => {
    const context = useContext(noteContext)
    const {notes, setNotes} = context;
    const host='';
    const {showAlert} = props;
    let navigate=useNavigate();
    
    //Fetch all notes from the API
    useEffect(() => {
      if(localStorage.getItem('token')){
        const fetchData = async () => {
          try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
              method: "GET", 
            headers: {
                'Content-Type': 'application/json',
                "authToken":localStorage.getItem('token')
      
              },
            });
            if (response.ok) {
              const jsonData = await response.json();
              setNotes(jsonData);
            } else {
              console.error('Failed to fetch data:', response.status);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }
      else{
       navigate('/login')  
      }
    }, []);


    let newNotess=JSON.parse(JSON.stringify(notes))
    // Edit a note
       const editNote =async ( id, title, description, tag) => {
       // API CALL
       const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
       method: "PUT", 
       headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem('token')
       },
       body: JSON.stringify({title,description,tag}),
       });

      // Logic to edit in client
      for (let index = 0; index < newNotess.length; index++) {
      const element = newNotess[index];
      if(element._id === id){
        newNotess[index].title=title;
        newNotess[index].description=description;
        newNotess[index].tag=tag;
        break;
    }  
  }
  props.showAlert('Note updated','success')
  setNotes(newNotess);
};
    
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id:'',etitle:'',edescription:'',etag:''})
    
    const updateNote=(currentNote)=>{
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    }

const handleClick =(e)=>{
  editNote(note.id,note.etitle,note.edescription,note.etag);
  e.preventDefault();
  refClose.current.click();

}

const onChange=(e)=>{
setNote({
...note,[e.target.name] : e.target.value
})
}

return (
  <>
      <AddNote showAlert={showAlert}/>
      
<button type="button"  ref={ref}  className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" value={note.etitle} id="etitle" name='etitle' aria-describedby="emailHelp"  onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label" name='edescription'>Description</label>
    <input type="text" className="form-control" value={note.edescription} id="edescription" name='edescription' onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label" name='etag'>Tag</label>
    <input type="text" className="form-control" value={note.etag} id="etag" name='etag' onChange={onChange}/>
  </div>
  </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>

  <div className="row my-3">
            <h2>Your Notes</h2> 
            <div className="container mx-1">
            {notes.length===0 && 'No notes to display'}
            </div>
            {notes.map((note,index)=>{
                    return <NoteItem note={note} key={index} updateNote={updateNote} showAlert={showAlert}/>  
            })}
            </div>
  </>
  )
}
