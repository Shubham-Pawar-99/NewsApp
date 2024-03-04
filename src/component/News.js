import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    console.log('Hello Im from news constructor');
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      searchTerm: '', 
    };
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7b9c331bf0d4b31bb3e15998a9eab58&page=${this.state.page}&pageSize=${this.props.pageSize}&q=${this.state.searchTerm}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    // console.log(data);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    console.log('prev');
    this.setState({ page: this.state.page - 1 }, () => this.updateNews());
  };

  handleNextClick = async () => {
    console.log('next');
    this.setState({ page: this.state.page + 1 }, () => this.updateNews());
  };

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchSubmit = (event) => {
    event.preventDefault();
    this.setState({ page: 1 }, () => this.updateNews());
  };

  render() {
    return (
      <div className="container my-3">


        <form className="d-flex my-2" style={{ float: 'right', width: '300px' }} onSubmit={this.handleSearchSubmit}>
          <input className="form-control me-2" type="search" placeholder="Search News..." aria-label="Search" value={this.state.searchTerm} onChange={this.handleSearchChange} />
          <button className="btn btn-outline-dark" type="submit">
            Search
          </button>
        </form>
        <h1 className="">DailyNews - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => (
              <div className="col-md-4 my-3" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage ? element.urlToImage : 'https://c8.alamy.com/comp/CN6EWM/daily-news-newspaper-roll-with-white-background-CN6EWM.jpg'}
                  url={element.url}
                  date={element.publishedAt}
                  author={element.author}
                  source={element.source.name}
                />

              </div>

            ))}
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
