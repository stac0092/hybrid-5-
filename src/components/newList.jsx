import React , { Component }from 'react';


class NewList extends Component{
    constructor(props){
        super(props);
        this.state = {
            newListItem: "",
        };

        this.handleListItem = this.handleListItem.bind(this);
        this.makeList = this.makeList.bind(this);

    }

    handleListItem(event){
        this.setState({
            newListItem: event.target.value,
        })
    }

    makeList(){

        this.props.addList(this.state.newListItem)

        // Empty input box
        this.setState({
            newListItem: "",
        })

    }

    render(){
        return(
            <div className="addWrapper">
                <input className="addList" value={this.state.newListItem}
                onChange={this.handleListItem}/>
                <button className="listButton" onClick={this.makeList}>Add Damaged Item</button>
            </div>
        )
    }
}

export default NewList;