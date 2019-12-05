import React, { Component } from 'react';
import './list.css' ;



class List extends Component{
    constructor(props){
        super(props);
        this.listItems = props.listItems;
        this.listID = props.listID
        this.handleRemoveListItem = this.handleRemoveListItem.bind(this)
        this.handleUpdateListItem = this.handleUpdateListItem.bind(this)
        this.editResidentsSubmit = this.editResidentsSubmit.bind(this);
        this.state = {
            isEdit: false
        };
    }

    handleRemoveListItem(id){
        this.props.deleteList(id);
    }

    handleUpdateListItem(){
        this.setState({ isEdit: true})
    }

    editResidentsSubmit(event){
        event.preventDefault();
        this.props.updateList(this.listID, this.listItemsInput.value);
        this.setState({ isEdit: false})
    }

    render(props){
        const { listItems } = this.props; 
        return(
            <>
            {
                 this.state.isEdit
                 ? (
                    <div className="list">
                    <form onSubmit={this.editResidentsSubmit}>
                             <input placeholder={listItems} defaultValue={listItems} 
                             ref={listItemsInput => this.listItemsInput = listItemsInput}/>
                             <button>Save</button>
                             <input type="button" value="Cancel" onClick={() => this.setState({ isEdit: false})}/>
                     </form>        
                    <div className="close" onClick={() => this.handleRemoveListItem(this.listID)}> 
                    &#10006;
                    </div> 
                    <div className="update" onClick={() => this.handleUpdateListItem(this.listID)}> 
                    &#9986;
                    </div> 
                    <p className="listItems">{this.listItems}</p>
                    </div>

                    )
                        : (
                           
                    <div className="list">
                    <div className="close" onClick={() => this.handleRemoveListItem(this.listID)}> 
                    &#10006;
                    </div> 
                    <div className="update" onClick={() => this.handleUpdateListItem(this.listID)}> 
                    &#9986;
                    </div> 
                    <p className="listItems">{this.listItems}</p>
                    </div>
         ) }
         </>
         );
    }
}

export default List;