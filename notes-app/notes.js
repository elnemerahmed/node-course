const fs = require('fs');

const fileName = 'notes.json';

const getNotes = () => {
    console.log( 'All Notes' );
};

const addNote = ( title, body ) => {
    const notes = loadNotes();
    const duplicate = notes.find( ( note ) => note.title === title );
    
    if ( duplicate === undefined )
        return;

    notes.push( {
        title,
        body
    } );

    saveNotes( notes );
};

const saveNotes = ( notes ) => {
    const notesJSON = JSON.stringify( notes );
    fs.writeFileSync( fileName, notesJSON );
};

const loadNotes = () => {
    if ( !fs.existsSync( fileName ) )
        return [];
    
    const dataBuffer = fs.readFileSync( fileName );
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse( dataJSON );
    return data;
};

const removeNote = ( title ) => {
    const notes = loadNotes().filter( ( note ) => note.title !== title );
    saveNotes( notes );
};

const listNotes = () => {
    const notes = loadNotes();
    notes.forEach( ( note ) => console.log( note.title ) );
};

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find( ( note ) => note.title === title );
    if ( note !== undefined ) {
        console.log( `Title: ${ note.title }\nBody: ${ note.body }` );
    }
};

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};