import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
    constructor(){
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false
        }
    }

    // async runs the func and waits for the promises to resolve =  that is await
    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=1c31506a7075446a856cad4cc0edb939"

        // fetching api
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles})
    }

    render() {
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
            </div>
        )
    }
}

export default News