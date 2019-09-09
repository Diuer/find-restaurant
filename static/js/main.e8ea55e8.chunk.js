(window["webpackJsonpfind-restaurant"]=window["webpackJsonpfind-restaurant"]||[]).push([[0],{13:function(t,e,a){t.exports=a(36)},18:function(t,e,a){},19:function(t,e,a){},20:function(t,e,a){},36:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),s=a(4),r=a.n(s),l=(a(18),a(5)),o=a(6),c=a(8),m=a(7),u=a(1),g=a(9),p=(a(19),a(20),function(t){function e(){return Object(l.a)(this,e),Object(c.a)(this,Object(m.a)(e).call(this))}return Object(g.a)(e,t),Object(o.a)(e,[{key:"render",value:function(){var t=this.props.list,e=t.location,a=t.name,i=t.price_level,s=t.rating,r=t.user_ratings_total,l=t.vicinity,o=(t.photos,t.icon,"https://www.google.com.tw/maps/place/".concat(e.lat,",").concat(e.lng));return n.createElement("div",{className:"list-block"},n.createElement("div",{className:"user-comment"},n.createElement("div",{className:"comment-price"},99!==i&&Array(i).fill().map(function(t,e){return n.createElement("i",{key:"rating"+e,className:"fas fa-dollar-sign"})})),n.createElement("div",{className:"comment-score"},!1!==s&&Array(5).fill().map(function(t,e){return s>=e+1?n.createElement("i",{key:"rating"+e,className:"fas fa-star"}):n.createElement("i",{key:"rating"+e,className:"far fa-star"})})),n.createElement("div",{className:"comment-count"},void 0!==r&&"\u5171".concat(r,"\u4eba\u8a55\u8ad6"))),n.createElement("p",{className:"title"},a),n.createElement("p",{className:"location"},n.createElement("i",{className:"fas fa-map-marker-alt"}),n.createElement("a",{href:o,target:"_blank"},l)))}}]),e}(n.Component)),d=a(10),v=function(t){function e(){var t;return Object(l.a)(this,e),(t=Object(c.a)(this,Object(m.a)(e).call(this))).centerMoved=t.centerMoved.bind(Object(u.a)(t)),t.fetchPlaces=t.fetchPlaces.bind(Object(u.a)(t)),t.sortLists=t.sortLists.bind(Object(u.a)(t)),t.filterLists=t.filterLists.bind(Object(u.a)(t)),t.state={lists:[],mapCenter:{lat:25.048019,lng:121.519087},filteredLists:[],isSorting:!0},t}return Object(g.a)(e,t),Object(o.a)(e,[{key:"centerMoved",value:function(t,e){var a={lat:e.center.lat(),lng:e.center.lng()};this.setState({mapCenter:a}),this.fetchPlaces(t,e,a)}},{key:"fetchPlaces",value:function(t,e){var a=this;this._mapProps=t,this._map=e;var n=t.google,i=this.state.mapCenter;new n.maps.places.PlacesService(e).nearbySearch({location:new n.maps.LatLng(i.lat,i.lng),radius:"1000",rankby:"distance",type:["restaurant"]},function(t,e){if(e==n.maps.places.PlacesServiceStatus.OK){for(var i=[],s=0;s<t.length;s++){var r=t[s];i.push({location:{lat:r.geometry.location.lat(),lng:r.geometry.location.lng()},name:r.name,price_level:void 0!==r.price_level?r.price_level:99,rating:void 0!==r.rating&&r.rating,user_ratings_total:void 0!==r.user_ratings_total?r.user_ratings_total:"",vicinity:r.vicinity,photos:r.photos,icon:r.icon})}a.setState({lists:i,isSorting:!0})}})}},{key:"drawMarkers",value:function(t){var e=this,a=[],n=new this._mapProps.google.maps.LatLngBounds;if(t.map(function(t,s){var r={url:t.icon,size:new e._mapProps.google.maps.Size(70,70),origin:new e._mapProps.google.maps.Point(0,0),anchor:new e._mapProps.google.maps.Point(17,34),scaledSize:new e._mapProps.google.maps.Size(25,25)};a.push(i.a.createElement(d.Marker,{key:"marker"+s,title:t.name,icon:r,position:{lat:t.location.lat,lng:t.location.lng}})),n.extend({lat:t.location.lat,lng:t.location.lng})}),0==t.length){var s=this.state.mapCenter;n.extend({lat:s.lat,lng:s.lng})}return this._map.fitBounds(n),a}},{key:"sortLists",value:function(t){var e="asc"===t.target.getAttribute("data-sort-type")?{start:1,end:-1}:{start:-1,end:1},a=this.state.lists.sortedLists;a=a.sort(function(a,n){return a[t.target.value]>n[t.target.value]?e.start:e.end}),this.setState({lists:a,isSorting:!0})}},{key:"filterLists",value:function(t){var e=parseInt(t.target.getAttribute("data-filter-number")),a=this.state.lists.sortedLists;a=a.filter(function(a,n,i){return"price_level"===t.target.value?a[t.target.value]===e:a[t.target.value]>=e}),this.setState({filteredLists:a,isSorting:!1})}},{key:"render",value:function(){var t=this.state,e=t.lists,a=t.filteredLists,n=t.isSorting,s=t.mapCenter;return i.a.createElement("div",{className:"App"},i.a.createElement(d.Map,{className:"map-block",google:this.props.google,zoom:13,clickableIcons:!0,style:{width:"calc(100% - 350px)",height:"100vh"},onReady:this.fetchPlaces,initialCenter:{lat:s.lat,lng:s.lng},position:{lat:s.lat,lng:s.lng},draggable:!0,onDragend:this.centerMoved,disableDoubleClickZoom:!0,maxZoom:16},e.length>0&&this.drawMarkers(this.state.isSorting?this.state.lists:this.state.filteredLists)),i.a.createElement("div",{className:"lists-block"},i.a.createElement("div",{className:"settings"},i.a.createElement("button",{"data-sort-type":"asc",value:"default",onClick:this.sortLists},"\u81ea\u7136\u6392\u5e8f"),i.a.createElement("button",{"data-sort-type":"asc",value:"price_level",onClick:this.sortLists},"\u50f9\u9322\u7b49\u7d1a\u4f4e\u8005\u512a\u5148"),i.a.createElement("button",{"data-sort-type":"desc",value:"rating",onClick:this.sortLists},"\u8a55\u5206\u9ad8\u8005\u512a\u5148"),i.a.createElement("button",{"data-sort-type":"desc",value:"user_ratings_total",onClick:this.sortLists},"\u591a\u4eba\u8a55\u8ad6\u8005\u512a\u5148"),i.a.createElement("button",{"data-filter-number":3,value:"rating",onClick:this.filterLists},"\u986f\u793a\u4e09\u661f\u4ee5\u4e0a\u8a55\u50f9"),i.a.createElement("button",{"data-filter-number":4,value:"rating",onClick:this.filterLists},"\u986f\u793a\u56db\u661f\u4ee5\u4e0a\u8a55\u50f9"),i.a.createElement("button",{"data-filter-number":5,value:"rating",onClick:this.filterLists},"\u986f\u793a\u4e94\u661f\u8a55\u50f9"),i.a.createElement("button",{"data-filter-number":0,value:"price_level",onClick:this.filterLists},"\u986f\u793a\u6700\u4f4e\u50f9\u4f4d"),i.a.createElement("button",{"data-filter-number":1,value:"price_level",onClick:this.filterLists},"\u986f\u793a\u4e2d\u4f4e\u50f9\u4f4d"),i.a.createElement("button",{"data-filter-number":2,value:"price_level",onClick:this.filterLists},"\u986f\u793a\u4e2d\u50f9\u4f4d"),i.a.createElement("button",{"data-filter-number":3,value:"price_level",onClick:this.filterLists},"\u986f\u793a\u4e2d\u9ad8\u50f9\u4f4d"),i.a.createElement("button",{"data-filter-number":4,value:"price_level",onClick:this.filterLists},"\u986f\u793a\u6700\u9ad8\u50f9\u4f4d")),i.a.createElement("div",{className:"content"},(n?e:a).map(function(t,e){return i.a.createElement(p,{key:"list"+e,list:t})}))))}}]),e}(i.a.Component),f=Object(d.GoogleApiWrapper)({apiKey:"AIzaSyCUxzgZX2YodxqBWnuOOxhz8Y5IfWHYGfw",libraries:["places"]})(v);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[13,1,2]]]);
//# sourceMappingURL=main.e8ea55e8.chunk.js.map