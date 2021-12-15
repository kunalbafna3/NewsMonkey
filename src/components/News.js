import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
    // constructor inside which we have to use state
    constructor(){
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

    // fetching data from the api
    // async runs the func and waits for the promises to resolve =  that is await
    // this is a lifecycle method which runs after the render method
    async componentDidMount(){
        console.log("Hello I am a comp from News component");
        
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=1c31506a7075446a856cad4cc0edb939&page=1&pageSize=20"

        // fetching api
        let data = await fetch(url);
        let parsedData = await data.json()
        // setting the state
        this.setState({articles: parsedData.articles,
            totalResults: parsedData.articles.totalResults})
    }

    handlePreviousClick = async () =>{

        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=1c31506a7075446a856cad4cc0edb939&page=${this.state.page - 1}&pageSize=20`;

        // fetching api
        let data = await fetch(url);
        let parsedData = await data.json()
        // setting the state
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles})
       

    }
    
    handleNextClick = async () =>{

        // Math.ceil returns the next integer ex- 4.6 is the value then it will return 5
        if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

        }else{   

        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=1c31506a7075446a856cad4cc0edb939&page=${this.state.page + 1}&pageSize=20`;

        // fetching api
        let data = await fetch(url);
        let parsedData = await data.json()
        // setting the state
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles})
        }
    }

    render() {
        console.log("Hello I am a render from News component");
        return (
            <div className="container my-3">
                <h2>NewsMonkey - Top Headlines</h2>
                <div className="row"> 
                {this.state.articles.map((element)=>{
                    return(
                        <div className="col-md-4" key={element.url}>
                        <Newsitem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    )
                })}
                </div> 
                <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
            </div>
        )
    }
}

export default News