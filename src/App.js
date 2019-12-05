import React , { Component }from 'react';
import './App.css';
import List from './components/list'
import NewList from './components/newList'
import { DBfirebaseConfig } from './Config/config'
import firebase from 'firebase/app'
import 'firebase/database'

class App extends Component{

  constructor(props){
    super(props);
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.updateList = this.updateList.bind(this);

    //firebase config 
  if (!firebase.apps.length) {
     firebase.initializeApp(DBfirebaseConfig);
   }
   this.db = firebase.database().ref().child("list");
    this.state = {
      list: [
      ],
    }

    const oldList = this.state.list;
    //DataSnapshot , get key and content
    this.db.on("child_added", snap =>{
      oldList.push({
        id: snap.key,
        listItem: snap.val().listItem,
      })
      console.log("childadded");

      //update state with new array
      this.setState({
        list: oldList
      })
    })

    this.db.on("child_removed", snap => {
      for (let i = 0; i < oldList.length; i++) {
        if(oldList[i].id === snap.key){
          oldList.splice(i, 1);
          console.log("childremovec")
        };      
      }
      this.setState({
        list: oldList
      })
    })
  }

  addList(item){
    this.db.push().set({ listItem: item})
  }

  deleteList(listID){
    this.db.child(listID).remove();
  }

  updateList(listID , listItem){
    this.db.child(listID).remove();
    this.db.push().update({ listID: listID, listItem: listItem})
  }



  render() {
    return (
      <div className="listWrapper">
        <div className="listHeader">
          <h1>Things I've Hit with My Car</h1>
        </div>
          <div className="listForm">
          <NewList addList={this.addList}/>
          </div>
            <div className="listBody">
            {
              this.state.list.map((item) => {
                return(
                  <List listItems={item.listItem} listID={item.id} key={item.id} deleteList={this.deleteList}  updateList={this.updateList}/>
                )

              })
            }
            </div>
      </div>
    );
  }
}


export default App;
