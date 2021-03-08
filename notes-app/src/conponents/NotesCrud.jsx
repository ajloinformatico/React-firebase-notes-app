import { useEffect, useState } from 'react';
import '../App.css';
import {firebase} from '../firebase';
import moment from 'moment';

const NotesCrud = (props) => {

    const [notes, setNotes] = useState([]);
    const [note, setNote] =  useState("");
    const [editMode,setEditMode] = useState(false);
    const [id, setId] = useState("");
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
    }, [props])



    

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
        db.collection('notes').add(newNote);
        //setNotes with data to show on list new Not
        //Set values by default
        const data = await db.collection('notes').get(); //get notes collection
                //MAP ON ARRAY DATA TO USE AGREGATION
                const arrayData = data.docs.map( doc => (
                {id:doc.id, ...doc.data()}
        ));
        setNotes(arrayData);
        setNote("")
        setError(null);

        } catch(error) {
            console.log(error);
        }
    }

    /**
     * set edit mode
     * @param {event} item 
     */
    const activateEditMode = (item) => {
      setEditMode(true);
      setNote(item.name);
      setId(item.id);
    }

    /**
     * update a note
     * @param {event} e 
     */
    const updateNote = async (e) => {
      e.preventDefault();
      if(!note.trim()){
        setError("Note is empty");
        return
      }
      try{
        const db = firebase.firestore();
        db.collection('notes').doc(id).update({
          name: note,
          date: Date.now()
        });
        
        const arrayUpdated = notes.map(
          item => item.id === id?{id:id,name:note}:item
        )
        setNotes(arrayUpdated);
        setEditMode(false);
        setNote("");
        setId("");
        setError(null);
      }catch(error){
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
            
            const arrayFiltrado = notes.filter(item => item.id !== id);
            setNotes(arrayFiltrado);

        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="container mt-4">
        <p>Welcome <b>{props.user}</b></p>
        <h2 className="text-center">React Notes App</h2>
          <div className="row mt-2">
            <div className="col-7">
              <h4 className="text-center">Notes list</h4>
              <ul className="list-gorup">
                { //print list of notes
                  notes.map(item =>
                  <li className="list-group-item" key={item.id}>{/*the key is necessary to avoid warnings*/}
                    <span>{item.name + " - " + moment(item.date).format("DD/MM/YYYY")}</span>
                    {/*delete and update buttons*/}
                    <button className="btn btn-danger float-end mx-2" onClick={() => deleteNote(item.id)}>Delete</button> {/*on click delete a note by id*/}
                    <button className="btn btn-warning float-end" onClick={() => activateEditMode(item)}>Update</button>
                  </li>  
                  )
                }
                
                 
                
              </ul>
            
            
            </div>
            <div className="col-5">
              <h4 className="text-center">{editMode?"Update note":"New note"}</h4>
                <form onSubmit={editMode?updateNote:saveNote}>
                  
                  <input type="text" className="form-control mb-2" placeholder="note text" value={note} onChange={e=>setNote(e.target.value)}/> {/*It will be save at note state*/}
                  { //Check edit mode to set update or submit button
                    editMode?(
                      <button type="submit" className="btn btn-warning w-100">
                        update
                      </button>
                    ):(
                      <input type="submit" className="btn btn-dark w-100" value="submit"/>
                    )
                  }
                  <span className="align-center text-danger mx-2"><b>{error}</b></span>
                </form>
            </div>
          </div>
        </div>
    )
}

export default NotesCrud;
