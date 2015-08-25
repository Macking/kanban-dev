import AltContainer from 'alt/AltContainer';
import React from 'react';
// import uuid from 'node-uuid';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
// import connect from '../decorators/connect';

// @connect(NoteStore)
export default class App extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     notes: [
        //         {
        //             id: uuid.v4(),
        //             task: 'Learn Webpack'
        //         },
        //         {
        //             id: uuid.v4(),
        //             task: 'Learn React'
        //         },
        //         {
        //             id: uuid.v4(),
        //             task: 'Do laundry'
        //         }
        //     ]
        // };
        // this.findNote = this.findNote.bind(this);
        // this.addNote = this.addNote.bind(this);
        // this.editNote = this.editNote.bind(this);
        // this.deleteNote = this.deleteNote.bind(this);

        this.storeChanged = this.storeChanged.bind(this);
        this.state = NoteStore.getState();
    }

    componentDidMount() {
        NoteStore.listen(this.storeChanged);
    }

    componentWillUnmount() {
        NoteStore.unlisten(this.storeChanged);
    }

    storeChanged(state) {
        this.setState(state);
    }

    render() {
        const notes = this.state.notes;

        // return (
        //     <div>
        //         <button onClick={this.addNote}>+</button>
        //         <Notes items={notes}
        //                onEdit={this.editNote}
        //                onDelete={this.deleteNote}/>
        //     </div>
        // );
        return (
            <div>
                <button onClick={this.addNote}>+</button>
                <AltContainer
                    stores={[NoteStore]}
                    inject={{
					items: () => NoteStore.getState().notes
				}}
                    >
                    <Notes items={notes}
                           onEdit={this.editNote}
                           onDelete={this.deleteNote}/>
                </AltContainer>
            </div>
        )
    }

    addNote() {
        // console.log('add note');
        // this.setState({
        //     notes: this.state.notes.concat([{
        //         id: uuid.v4(),
        //         task: 'New task'
        //     }])
        // });
        NoteActions.create({task: 'New task'});
    }

    editNote(id, task) {
        // let notes = this.state.notes;
        // const noteIndex = this.findNote(id);

        // if (noteIndex < 0) {
        //     return;
        // }

        // notes[noteIndex].task = task;

        // this.setState({notes});
        NoteActions.update({id, task});
    }

    deleteNote(id) {
        // const notes = this.state.notes;
        // const noteIndex = this.findNote(id);

        // if (noteIndex < 0) {
        //     return;
        // }

        // this.setState({
        //     notes: notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1))
        // });
        NoteActions.delete(id);
    }

    // findNote(id) {
    //     let notes = this.state.notes;
    //     const noteIndex = notes.findIndex((note) => note.id === id);

    //     if (noteIndex < 0) {
    //         console.warn('Failed to find note', notes, id);
    //     }

    //     return noteIndex;
    // }
}
