import { useEffect, useState } from 'react';
import './App.css';
import {firebase} from './firebase';


function App() {

  const [notes, setNotes] = useState([]);
  const [note, setNote] =  useState("");
  const [error, setError] = useState(null);
  
  useEffect (()=>{
    //All this type funcions must be async
    /**
     * Get notes from firebase notes archive and add to notes states to print
     */
    const getData = async () => {
      const db = firebase.firestore() //in firebase.js firestore was imported above
      try{
        //all async functions have await to recive
        const data = await db.collection('notes').get(); //get notes collection
        //MAP ON ARRAY DATA TO USE AGREGATION
        const arrayData = data.docs.map( doc => (
          {id:doc.id, ...doc.data()}
          
        ));
        //Save array of notes at notes state
        setNotes(arrayData);
      }catch(error){
        console.log(error);
      }
    }
    getData()
  }, [])

  /**
   * send and save note into firebase archive
   * @param {event} e: onsubmit event 
   */
  const saveNote = async e => {
    e.preventDefault(); //to dont send form
    if(!note.trim()) {
      setError("Note is empty");
      console.log("note is empty");
      return
    }
    try{
      const db = firebase.firestore();
      //Set new note by new note state and actual date
      const newNote = {
        name:note,
        date:Date.now()
      }
      //save into notes archive
      const data = db.collection('notes').add(newNote);
      //setNotes with data to show on list new Note
      setNotes([
        ...notes,
        {id:data.id, ...newNote}
      ]); 
      //Set values by default
      setNote("")
      setError(null);

    } catch(error) {
      console.log(error);
    }
  }

  /**
   * delete a note by id
   * @param {note.id} id: note id to delete
   * */
  const deleteNote = async (id) => {
    try{
      const db = firebase.firestore()
      const data = await db.collection('notes').doc(id).delete();
      //filter array of notes to reload all data
      const arrayFilter = notes.filter(item => item.id!==id); //delete all null data
      setNotes(arrayFilter);

    }catch(error){
      console.log(error);
    }
  }
  
  return (
      <div className="container mt-4">
        <h2 className="text-center">React Notes App</h2>
          <div className="row mt-2">
            <div className="col-7">
              <h4 className="text-center">Notes list</h4>
              <ul className="list-gorup">
                { //print list of notes
                  notes.map(item =>
                  <li className="list-group-item" key={item.id}>{/*the key is necessary to avoid warnings*/}
                    <span>{item.name}</span>
                    {/*delete and update buttons*/}
                    <button className="btn btn-danger float-end" onClick={() => deleteNote(item.id)}>Delete</button> {/*on click delete a note by id*/}
                    <button className="btn btn-warning float-end">Update</button>
                  </li>  
                  )
                }
              </ul>
            
            
            </div>
            <div className="col-5">
              <h4 className="text-center">New note</h4>
                <form onSubmit={saveNote}>
                  
                  <input type="text" className="form-control mb-2" placeholder="note text" value={note} onChange={e=>setNote(e.target.value)}/> {/*It will be save at note state*/}
                  <input type="submit" className="btn btn-dark w-100" value="submit"/>
                </form>
            </div>
          </div>
      </div>
      
  );
}

export default App;
