import React,{useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




const News = (props)=> {

  const [articles, setArticles] = useState([]);
   // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${this.captilize(props.category)} - NewsMonkey`;
  const capitilize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
}

useEffect(() => {
  document.title = `${capitilize(props.category)} - NewsMonkey`;
  updateNews(); 
  // eslint-disable-next-line
}, [])
  
  // const handlePrevClick = async () => {
  //   setPage(page-1);
  //   this.updateNews();
  // };
  // const handleNextClick = async () => {
  //   setPage(page+1);
  //   this.updateNews();
  // };

  const fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };


    return (
      <>
        <h2 className="text-center" style={{ margin: "20px 0" }}>NewsMonkey - Top {capitilize(props.category)} Headlines</h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={element.description ? element.description : ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
}
News.propstype = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;
