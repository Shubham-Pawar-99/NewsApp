import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, url, author, date, source } = this.props;
    const card = {
      img: { height: '250px', overflow: 'hidden' },
      title: { height: '100px', overflow: 'hidden' },
      desc: { height: '100px', overflow: 'hidden' },
      date: { height: '50px', overflow: 'hidden' }
    }


    return (

      <div className="card">
        <img src={imageUrl} className="card-img-top" alt="..." style={card.img} />
        <div className="card-body">
          <small>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1'}}>
              {source}
            </span>
          </small>

          <h5 className="card-title" style={card.title}>{title}</h5>
          <p className="card-text" style={card.desc}>{description}</p>
          <p className="card-text" style={card.date}> <small className=" text-body-secondary">
            By {!author ? "unknown" : author} On {new Date(date).toUTCString()}
          </small>
          </p>

          <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
        </div>
      </div>


    )
  }
}
