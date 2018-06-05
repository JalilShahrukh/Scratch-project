import React, { Component } from 'react';
import DataCreate from './DataCreate';
import DataDisplay from './DataDisplay';
import fetch from 'isomorphic-fetch';
import './styles.css';

class Tagger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas : [{
              name: '',
							tags: [],
							googleInfo: []
						}],
						displayDatas : [{
							name: '',
							tags: [],
							googleInfo: []
						}]
        };
		}
		
		handleChange = (e) => {
			this.handleDisplay(e.target.value);
		}

		handleDisplay = (value) => { ///// This will become a new post request to the server
			let selectedDatas = this.state.datas.filter( (data) => {
				for(let i = 0; i < data.tags.length; i++) {
					if(data.tags[i] === value) {
						return true;
					}
				}
				return false;
			});
			this.setState({
				displayDatas : selectedDatas
			});
		}

    handleClickSave = (data) => {
        const { datas } = this.state; 
        let addData = {
            name: data.name,
						tags: data.tags,
						googleInfo: []
        };
				console.log('before fetch - add data: ', addData);
				let that = this;
        fetch('/addLocation', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(addData), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => {
              return res.json()
            })
          .catch(error => {
						console.error('Error:', error)
						that.setState({
							datas : datas.concat(response)
						});
					})
					.then(response => {
						console.log('after google response: ', response);
						that.setState({
							datas : datas.concat(response)
						});
					});
		}

		componentWillMount = () => {
			
		}

    render(){
				const { datas, displayDatas } = this.state;
        return (
            <div>
              <DataCreate onClick={this.handleClickSave}/>
              <DataDisplay datas={datas} displayDatas={displayDatas} onChange={this.handleChange}/>
            </div>
        );
    }
}

export default Tagger;
