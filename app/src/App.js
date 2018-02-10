import React from 'react';
import Notes from './components/Notes';
import Input from './components/Input';
import noteService from './services/notes'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            newNote: '',
            shown: true,
            countId: "0"
        }
      this.handleChange = this.handleChange.bind(this)
      this.handleCross = this.handleCross.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
    }

    componentWillMount() {
      noteService
          .getAll()
          .then(response => {
              this.setState({notes: response})
          })
    }

    handleChange(event) {
        this.setState({ newNote: event.target.value })
    }

    handleCross(event) {
      let lid = event.target.getAttribute('id')
      const index = this.state.notes.findIndex(item => item.id == lid);

      let noteObject = {
          content: this.state.notes[index].content,
          noteState: true,
          id: lid
      }
      
      if (this.state.notes[index].noteState === false) {
        noteObject.noteState = true
        this.setState({
          notes: this.state.notes.map(n => n.id !== lid ? n : noteObject)
        })
        this.state.notes[index].noteState = true;

      } else if (this.state.notes[index].noteState === true) {
        noteObject.noteState = false;
        this.state.notes[index].noteState = false;
      }

      noteService
          .update(lid, noteObject)
          .then(response => {
              this.setState({
                  notes: this.state.notes.map(n => n.id !== lid ? n : noteObject)
              })
          })
    } 

    
    handleDelete = (event) => { 
      let lid = event.target.getAttribute('id')

      noteService
          .remove(lid)
          .then(() => {
              this.setState({
                notes: this.state.notes.filter(n => n.id !== lid)
              })
              this.componentWillMount();
          }) 
    }

    submit = (event) => { 
      event.preventDefault()
      const noteObject = {
        content: this.state.newNote,
        noteState: false,
        id: this.state.countId
      }

      noteService
          .create(noteObject)
          .then(response => {
              this.setState({
                  notes: this.state.notes.concat(response),
                  newNote: ''
              })
          })  
    }

    show = () => { 
      this.state.shown ? this.setState({shown: false}) : this.setState({shown: true});
    }

    setCountId = () => {
      if (this.state.notes.length > 0) {
        const x = parseInt(this.state.notes.slice(-1)[0].id, 10) + 1;
        this.state.countId = x.toString()
      }
    }

    render() {
      this.setCountId()
        return (
          <div className="App" id="container">
            <h1>TO-DO LIST 
              <i id="mark" className={this.state.shown ? "fa fa-minus" : "fa fa-plus"} onClick={this.show}></i>
            </h1>
            <Input 
              shown={this.state.shown} 
              submit={this.submit} 
              handleChange={this.handleChange}
              valueField={this.state.newNote}
            />

            <Notes 
              notes={this.state.notes} 
              handleCross={this.handleCross} 
              handleDelete={this.handleDelete}
            />
          </div>
        );
    }
}

export default App;