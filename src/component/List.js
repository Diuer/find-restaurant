import * as React from 'react'
import './List.scss';

class List extends React.Component{
    constructor(){
        super()

    }

    render(){
        const {location, name, price_level, rating, user_ratings_total, vicinity, photos, icon} = this.props.list
        const hrefLink = `https://www.google.com.tw/maps/place/${location.lat},${location.lng}`

        return (
            <div className='list-block'>
                {/* <img className='type-icon' src={icon}/> */}
                <div className='user-comment'>
                    <div className='comment-price'>
                    {
                        price_level !== 99 &&
                        Array(price_level).fill().map((item, index)=>{
                            return <i key={'rating'+index} className="fas fa-dollar-sign"></i>
                        })
                    }
                    </div>
                    <div className='comment-score'>
                    {
                        rating !== false &&
                        Array(5).fill().map((item, index)=>{
                            return (rating >= index + 1) ? <i key={'rating'+index} className="fas fa-star"></i> : <i key={'rating'+index} className="far fa-star"></i>
                        })
                    }
                    </div>
                    <div className='comment-count'>
                    {
                        user_ratings_total !== undefined &&
                        `共${user_ratings_total}人評論`
                    }
                    </div>
                </div>
                <p className='title'>{name}</p>
                <p className='location'>
                    <i className="fas fa-map-marker-alt"></i>
                    <a href={hrefLink} target='_blank'>
                        {vicinity}
                    </a>
                </p>
            </div>
        )
    }
}

export default List