import React, { Component } from 'react';
import './styles.css';

class DataCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // name: '',
            // tags: [],
            tagFields: 1
        };
    }

    locationHandleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    tagHandleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        console.log(nextState);
        this.setState(nextState);
    }

    handleClickSave = () => {

        // console.log('inside hcs');
        // const { name, tags, tagFields } = this.state;

        /// Get values from forms
        let tagsElems = document.getElementsByClassName('tags');
        let locationElems = document.getElementsByClassName('name');
        let updatedTags = [];
        for(let i = 0; i < tagsElems.length; i++) {
            updatedTags.push(tagsElems[i].value);
        }
        let data = {};
        console.log('Location elems:', locationElems[0].value);

        //// Create data to send
        data.name = locationElems[0].value;
        data.tags = updatedTags;

        //// Refresh forms
        for (let tag of tagsElems) {
            console.log('Tag elements values:', tag.value);
            tag.value = '';
        };
        locationElems[0].value = '';

        // this.setState({
        //     name: '',
        //         tags: [],
        //         tagFields: 1
        // });
            
        this.props.onClick(data);
        // }
    }

    handleClickPlus = () => {
        let updatedTagFields = this.state.tagFields + 1;
        this.setState({
            tagFields: updatedTagFields
        });
    }
    
    render(){
        const { tagFields } = this.state;
        let tagsDisplay = [];
        for(let i = 0; i < tagFields; i++) {
            tagsDisplay.push(<input className="tags" type="text" name = {"tag"+i+1} placeholder="tag" key={"tag"+i+1} onChange={this.tagHandleChange}/>);
        }
        return (
            <div>
                <input type="text" className ="name" name="name" placeholder="name" onChange={this.locationHandleChange} />
                <br />
                <button onClick={this.handleClickPlus}>+</button>
                {tagsDisplay}
                <br />
                <button onClick={this.handleClickSave}>SAVE</button>
            </div>
        );
    }
}

export default DataCreate;
