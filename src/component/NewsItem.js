import React from 'react'

export default function NewsItem(props) {

  let { title, description, imageUrl, url, author, date, source } = props;
  const card = {
    img: { height: '200px', overflow: 'hidden' },
    title: { height: '100px', overflow: 'hidden' },
    desc: { height: '100px', overflow: 'hidden' },
    date: { height: '50px', overflow: 'hidden' }
  }

  return (

    <div className="card ">

      <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0 }}>
        <span className="badge rounded-pill bg-danger">
          {source}
        </span>
      </div>

      <img src={imageUrl} className="card-img-top" alt="..." style={card.img} />

      <div className="card-body">
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
