import React, { Component } from 'react';
import axios from 'axios';
import "./App.css";
import Movies from './Movies.js';

class App extends Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      loading: false,
      value: '',
      addedMovies : [],
      exeedValues : false,
    };
  }
  

  search = async val => {
    this.setState({
      loading: true
    });
    const res = await axios(
      `https://omdbapi.com/?i=tt3896198&apikey=db7942f8&t=${this.state.value}`
    );
    // console.log(res);
    
    if(res.data.Response == 'False'){
      var movies = await res.data.Error;
    }

    else {
    var movies = await res.data.Title;
    }
    this.setState({
      movies,
      loading: false
    });
  
  };

  onChangeHandler = (e) => {
    let val = e.target.value
    this.setState({ value:  val}, () => {
      this.search(val);
    });
}

  get renderMovies() {
    let movies = "";
    if (this.state.movies) {
      movies = <Movies list={this.state.movies} />;
    }

    return movies;
  }

  getValue = e => {
    var addedvalue = e.currentTarget.dataset.value
    // console.log(this.state.addedMovies)
    if(this.state.addedMovies.length > 4){
      alert("Sorry, you can't add more than five movies");
    }else{
    this.setState(prevState => ({
      addedMovies : [...prevState.addedMovies, addedvalue],
  }));
}}

  render() {
    return (
      <div style={{textAlign:"center"}}>
        <input style={{borderRadius: 25, width:300, height:30, textAlign:"center", marginTop:200}}
          value={this.state.value}
          onChange ={e => this.onChangeHandler(e)}
          placeholder="Type Movie"
        /><br></br>
          <ul>
            <li data-value={this.state.movies} onClick={e => this.getValue(e)} style={{listStyleType:"none"}}>{this.state.movies}</li>
          </ul>
          <ul style={{listStyleType:"none",color:"blue"}}>
          <b>Added Movies</b>  : { (this.state.addedMovies.length > 0)? 
          this.state.addedMovies.map((val,i)=> {return <li key={i}>{`${i+1} - ${val}`}</li>}): 'No Movies added yet !'}</ul>
      </div>
    );
  }
}

export default App;