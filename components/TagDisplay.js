import React, { Component } from 'react';
import TagItemList from './TagItemList';
import './styles.css';

class TagDisplay extends Component {
    render(){
        const { datas, displayDatas, onChange } = this.props;
        let options=[];
        let tags=[];
        for(let i = 0; i < datas.length; i++) {
            if(datas[i].tags) {
                for(let j = 0; j < datas[i].tags.length; j++) {
                    tags.push(datas[i].tags[j]);
                    // options.push(<option key={i+j} value={datas[i].tags[j]}> {datas[i].tags[j]} </option>);
                }
            }
        }
        tags = tags.filter(function (value, index, self) { 
            return self.indexOf(value) === index;
        });
        for(let i = 0; i < tags.length; i++) {
            options.push(<option key={i} value={tags[i]}> {tags[i]} </option>)
        }
        
        return (
            <div>
                <select onChange={onChange}>
                    <option value="" >-- select a tag --</option>
                    {options}
                </select>
                <TagItemList displayDatas={displayDatas} />
            </div>
        );
    }
}

export default TagDisplay;
