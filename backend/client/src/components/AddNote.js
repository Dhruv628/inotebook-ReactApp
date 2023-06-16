import React,{useState,useContext} from 'react'
import noteContext from '../context/note/noteContext'

export const AddNote = (props) => {
    const context = useContext(noteContext)
    const {notes,setNotes}=context
    const host=''
  //Function to Add note
  const addNote =async (title, description, tag ) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    let note= await response.json()
    props.showAlert('Note added','success')
    setNotes(notes.concat(note));
  };

    const [note, setNote] = useState({title:'',description:'',tag:''})
    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:'',description:'',tag:''})
}

const onChange=(e)=>{
setNote({
    ...note,[e.target.name] : e.target.value
})
}
  return (
    <div className=' ' style={{margin:'1vh'}}>    
        <h1>Add a Note</h1>
    <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label" >Title</label>
    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title}  onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label" name='description'>Description</label>
    <input type="text" className="form-control" id="description" name='description'  value={note.description}  onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label" name='tag'>Tag</label>
    <input type="text" className="form-control" id="tag" name='tag'  value={note.tag}  onChange={onChange}/>
  </div>
  <button disabled={note.title.length<3 && note.description.length<5} type="submit" className="btn btn-success" onClick={handleClick}>Add Note</button>
</form>
</div>
  )
}
