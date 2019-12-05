import React, { Component } from 'react';
import './list.css' ;
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";




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
                    <div className="listItems">
                        <p>{this.listItems}</p>  
                    </div> 
                    <div className="close" onClick={() => this.handleRemoveListItem(this.listID)}> 
                   <FaRegTrashAlt/>
                    </div> 
                    <div className="update" onClick={() => this.handleUpdateListItem(this.listID)}> 
                    <FaRegEdit/>
                    </div> 
                    
                    </div>

                    )
                        : (
                    <div className="list">
                        <div className="listItems">
                            <p>{this.listItems}</p>  
                        </div>
                        <div>
                            <div className="close" onClick={() => this.handleRemoveListItem(this.listID)}> 
                                <FaRegTrashAlt/>
                            </div> 
                            <div className="update" onClick={() => this.handleUpdateListItem(this.listID)}> 
                                <FaRegEdit/>
                            </div> 
                        </div>
                        
                    </div>
         ) }
         </>
         );
    }
}

export default List;