import React from 'react'

const NewsItem = (props)=> {
    // desstructuring
    let {title,description,imageUrl,newsUrl,author,date,source}=props; 
    return (
      <div className='my-3'>
        <div className="card" style={{width:"19rem"}}>
            <img src={imageUrl!=null?imageUrl:"https://www.livemint.com/lm-img/img/2023/10/22/1600x900/Q2_results_this_week_23_30_October_1697975899136_1697975899561.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"style={{left:"25%",zIndex:"1"}}>
                  {source}
                </span>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">by {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem
