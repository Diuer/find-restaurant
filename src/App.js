import React from 'react';
import './App.scss';
import List from './component/List';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';

class App extends React.Component {
  constructor(){
    super()

    this.centerMoved = this.centerMoved.bind(this)
    this.fetchPlaces = this.fetchPlaces.bind(this)
    this.sortLists = this.sortLists.bind(this)
    this.filterLists = this.filterLists.bind(this)

    this.state = {
      lists: [],
      mapCenter: {
          lat: 25.048019,
          lng: 121.519087
      },
      filteredLists: [],
      isSorting: true //如果為篩選則為false
    }
  }


  centerMoved(mapProps, map){
    // 取地圖當前中心座標
    let mapCenter = {
      lat: map.center.lat(),
      lng: map.center.lng()
    }
    
    this.setState({
      mapCenter
    })

    this.fetchPlaces(mapProps, map, mapCenter)
  }

  fetchPlaces(mapProps, map){

    this._mapProps = mapProps
    this._map = map

    const {google} = mapProps
    const {mapCenter} = this.state

    let mapPlacesService = new google.maps.places.PlacesService(map)
    mapPlacesService.nearbySearch({
      location: new google.maps.LatLng(mapCenter.lat, mapCenter.lng),
      radius: '1000', // 1公里
      rankby : 'distance',
      type: ['restaurant']
    },(results, status)=>{
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        let lists=[]
        for (let index = 0; index < results.length; index++) {
          let place = results[index];
          lists.push({ 
            location: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            },
            name: place.name,
            price_level: (place.price_level !== undefined) ? place.price_level : 99,
            rating: (place.rating !== undefined) ? place.rating : false,
            user_ratings_total: (place.user_ratings_total !== undefined) ? place.user_ratings_total : '',
            vicinity: place.vicinity,
            photos: place.photos,
            icon: place.icon
          })
        }
        this.setState({
            lists,
            isSorting: true
        })
      }
    })
  }

  drawMarkers(sourceLists){
    let markerLists = []
    let mapContainer = new this._mapProps.google.maps.LatLngBounds();
    sourceLists.map((item, index)=>{
      const iconInfo = {
        url: item.icon,
        size: new this._mapProps.google.maps.Size(70, 70),
        origin: new this._mapProps.google.maps.Point(0, 0),
        anchor: new this._mapProps.google.maps.Point(17, 34),
        scaledSize: new this._mapProps.google.maps.Size(25, 25)
      }
      markerLists.push(<Marker key={'marker'+index} title={item.name} icon={iconInfo} position = {{lat: item.location.lat, lng: item.location.lng }}/>)
      mapContainer.extend({lat: item.location.lat, lng: item.location.lng })
    })
    
    if(sourceLists.length == 0){ // 避免篩選到沒資料時地圖中心亂跑
      const {mapCenter} = this.state
      mapContainer.extend({lat: mapCenter.lat, lng: mapCenter.lng})
    }

    this._map.fitBounds(mapContainer)

    return markerLists
  }

  sortLists(e){
    const sortType = (e.target.getAttribute('data-sort-type') === 'asc')? {start: 1, end: -1} : {start: -1, end: 1}
    let sortedLists = this.state.lists

    sortedLists = sortedLists.sort(function (a, b) {
      return a[e.target.value] > b[e.target.value] ? sortType.start : sortType.end
    })

    this.setState({
      lists: sortedLists,
      isSorting: true
    })
  }

  filterLists(e){
    const filterType = parseInt(e.target.getAttribute('data-filter-number'))
    let sortedLists = this.state.lists
    sortedLists = sortedLists.filter((item, index, array)=>{
      return (e.target.value === 'price_level') ? item[e.target.value] === filterType : item[e.target.value] >= filterType
    })

    this.setState({
      filteredLists: sortedLists,
      isSorting: false
    })
  }

  render(){

    const {lists, filteredLists, isSorting, mapCenter} = this.state
    const mapStyles = {
      width: 'calc(100% - 350px)',
      height: '100vh'
    }

    return (
      <div className='App'>
        <Map
          className = 'map-block'
          google = {this.props.google}
          zoom = {13}
          clickableIcons = {true}
          style = {mapStyles}
          onReady={this.fetchPlaces}
          initialCenter = {{ lat: mapCenter.lat, lng: mapCenter.lng }}
          position = {{ lat: mapCenter.lat, lng: mapCenter.lng }}
          draggable = {true}
          onDragend = {this.centerMoved}
          disableDoubleClickZoom = {true}
          maxZoom = {16}
        >
        {
          (lists.length > 0) && this.drawMarkers((this.state.isSorting ? this.state.lists : this.state.filteredLists))
        }
        </Map>
        <div className='lists-block'>
          <div className='settings'>
            <button data-sort-type='asc' value='default' onClick={this.sortLists}>自然排序</button>
            <button data-sort-type='asc' value='price_level' onClick={this.sortLists}>價錢等級低者優先</button>
            <button data-sort-type='desc' value='rating' onClick={this.sortLists}>評分高者優先</button>
            <button data-sort-type='desc' value='user_ratings_total' onClick={this.sortLists}>多人評論者優先</button>
            <button data-filter-number={3} value='rating' onClick={this.filterLists}>顯示三星以上評價</button>
            <button data-filter-number={4} value='rating' onClick={this.filterLists}>顯示四星以上評價</button>
            <button data-filter-number={5} value='rating' onClick={this.filterLists}>顯示五星評價</button>
            <button data-filter-number={0} value='price_level' onClick={this.filterLists}>顯示最低價位</button>
            <button data-filter-number={1} value='price_level' onClick={this.filterLists}>顯示中低價位</button>
            <button data-filter-number={2} value='price_level' onClick={this.filterLists}>顯示中價位</button>
            <button data-filter-number={3} value='price_level' onClick={this.filterLists}>顯示中高價位</button>
            <button data-filter-number={4} value='price_level' onClick={this.filterLists}>顯示最高價位</button>
          </div>
          <div className='content'>
          {
            (isSorting ? lists : filteredLists).map((list, index)=>{
              return <List key={'list'+index} list={list}/>
            })
          }
          </div>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  // apiKey: '',
  apiKey: 'AIzaSyCUxzgZX2YodxqBWnuOOxhz8Y5IfWHYGfw',
  libraries: ['places']
})(App)