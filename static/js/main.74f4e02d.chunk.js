(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{34:function(e,t,a){e.exports=a(64)},39:function(e,t,a){},40:function(e,t,a){},64:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(30),r=a.n(l),s=(a(39),a(9)),i=a(7),o=a(11),m=a(10),u=a(12),h=(a(40),a(14)),d=a(6),p=function(e){var t=e.songs;return console.log(t),t=t.map((function(e){var t=e.result,a=t.id,n=t.full_title,l=t.header_image_thumbnail_url,r=t.url;return console.log(a),c.a.createElement("li",{key:a,className:"song container"},c.a.createElement("h1",{className:"song-title"},n),c.a.createElement("img",{className:"song-img text-center",alt:"",src:l}),c.a.createElement(h.b,{className:"song-btn btn btn-primary btn-large",to:{pathname:"analysis/".concat(a),state:{url:r}}},"View Analyis of this Song"))})),c.a.createElement("div",{id:"song-list",className:"text-left"},c.a.createElement("ul",null,t))},y=a(15),b=a.n(y),v=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e){a.setState({query:e.target.value})},a.handleSubmit=function(e){e.preventDefault();var t=a.state.query;b.a.get("songs/".concat(t)).then((function(e){var t=e.data.hits;a.setState({songs:t})})).catch((function(e){console.log(e)}))},a.state={query:"",songs:null},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.state.songs;return c.a.createElement("div",{id:"home",className:"text-center"},c.a.createElement("div",{id:"header",className:"mt-5"},c.a.createElement("h1",{className:"mb-3"},"Welcome to my Lyric Sentiment Application!"),c.a.createElement("h4",{className:"mb-5"},"To get started, type in an artist or a song in the search bar")),c.a.createElement("form",{id:"form",onSubmit:this.handleSubmit},c.a.createElement("input",{id:"search-bar",type:"text",placeholder:"Please enter a song or an artist",onChange:this.handleChange,value:this.state.query}),c.a.createElement("input",{id:"submit-button",className:"ml-4 btn btn-primary btn-large",type:"submit",value:"Find songs!"})),e&&c.a.createElement(p,{songs:e}))}}]),t}(n.Component),E=a(19),g=a.n(E),f=a(33),O=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).state={lyrics:"",analysis:null,dataRecieved:!1},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=Object(f.a)(g.a.mark((function e(){var t,a,n;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("hi"),t=this.props.location.state.url,e.next=4,b.a.post("/",{url:t});case 4:a=e.sent,n=a.data,console.log(n),this.setState({lyrics:n.lyrics,analysis:JSON.parse(n.analysis),dataRecieved:!0}),console.log(this.state.analysis);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),Object(i.a)(t,[{key:"render",value:function(){if(this.state.dataRecieved){var e=this.state,t=e.lyrics,a=e.analysis,n=a.sentiment.document,l=n.label,r=n.score,s=a.concepts;s=s.map((function(e,t){var a=e.text,n=e.relevance;return c.a.createElement("li",{key:t},c.a.createElement("span",null,"".concat(a," ")),c.a.createElement("span",null,"Relevancy : ".concat(n)))}));var i=c.a.createElement("h2",null,"Emotional Analysis Not Available!");return a.emotion&&(i=Object.keys(a.emotion.document.emotion).map((function(e,t){return c.a.createElement("li",{key:t},"".concat(e,": ").concat(a.emotion.document.emotion[e]))}))),c.a.createElement("div",{id:"analysis-page"},c.a.createElement("div",{id:"lyrics"},c.a.createElement("h1",null,"Song Lyrics"),c.a.createElement("p",{style:{whiteSpace:"pre-wrap"}},t)),c.a.createElement("div",{id:"analysis"},c.a.createElement("h1",null,"Analysis"),c.a.createElement("div",{className:"text-left"},c.a.createElement("div",{id:"sentiment"},c.a.createElement("h2",null,"Sentiment"),c.a.createElement("p",null,"Label: ".concat(l)),c.a.createElement("p",null,"Score: ".concat(r))),c.a.createElement("div",{id:"concepts"},c.a.createElement("h2",null,"Concepts"),c.a.createElement("ul",null,s)),c.a.createElement("ul",{id:"emotion"},i))))}return c.a.createElement("div",{id:"loading"},"Loading...")}}]),t}(n.Component),j=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).state={},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return c.a.createElement(h.a,{basename:"/Lyric-Analysis"},c.a.createElement(d.c,null,c.a.createElement(d.a,{exact:!0,path:"/",component:v}),c.a.createElement(d.a,{exact:!0,path:"/analysis/:songID",component:O})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[34,1,2]]]);
//# sourceMappingURL=main.74f4e02d.chunk.js.map