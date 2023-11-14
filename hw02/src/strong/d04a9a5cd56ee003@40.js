function _1(md){return(
md`# Strong baseline -1`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _yCounts(){return(
[]
)}

function _Constellation_name(){return(
[" 牡羊座","金牛座","雙子座","巨蟹座","獅子座","處女座","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"]
)}

function _Constellations(data){return(
data.map(item => item.Constellation)
)}

function _6(yCounts,Constellations,data)
{
  yCounts.length = 0; //將yCounts清空
  var minYear = Math.min(...Constellations); //最早出生年
  var maxYear = Math.max(...Constellations); //最晚出生年
  for (var y=minYear; y<=maxYear; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    yCounts.push({Constellation:y, gender:"male", count:0}); 
    //Object包含：1. 出生年，2.男性，3.人數(設為0)
    yCounts.push({Constellation:y, gender:"female", count:0}); 
    //Object包含：1. 出生年，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = (x.Constellation-minYear)*2 + (x.Gender== "男" ? 0 : 1); 
    yCounts[i].count++;
    //讀取data array，加總每個年份出生的人
  })
  return yCounts
}


function _7(Plot,yCounts){return(
Plot.plot({
  
  grid: true,
  y: {label: "count"},

  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "Constellation", y: "count"}),
  ]
})
)}

function _plot2(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _9(Plot,plot2,Constellation_name,yCounts){return(
Plot.plot({
  marginTop: plot2.mt,
  marginRight: plot2.mr,
  marginBottom: plot2.mb,
  marginLeft: plot2.ml,
  
  grid: true,
  y: {label: "count"},
  x: {label: "constellation", ticks: 10, tickFormat: (d) => Constellation_name[d]},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "Constellation", y: "count", tip: true , fill:"gender"}),
  ]
})
)}

function _plot1(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _11(Plot,plot1,Constellation_name,data){return(
Plot.plot({  

	marginTop: plot1.mt, 
	marginRight: plot1.mr, 
	marginBottom: plot1.mb, 
	marginLeft: plot1.ml,   
	y: {grid: true, label: "count"},  
  x: {label: "constellation", ticks: 10, tickFormat: (d) => Constellation_name[d]},
	marks: [    
		Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", tip: true })),    
		Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0.5 })
	 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("Constellation_name")).define("Constellation_name", _Constellation_name);
  main.variable(observer("Constellations")).define("Constellations", ["data"], _Constellations);
  main.variable(observer()).define(["yCounts","Constellations","data"], _6);
  main.variable(observer()).define(["Plot","yCounts"], _7);
  main.variable(observer("viewof plot2")).define("viewof plot2", ["Inputs"], _plot2);
  main.variable(observer("plot2")).define("plot2", ["Generators", "viewof plot2"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot2","Constellation_name","yCounts"], _9);
  main.variable(observer("viewof plot1")).define("viewof plot1", ["Inputs"], _plot1);
  main.variable(observer("plot1")).define("plot1", ["Generators", "viewof plot1"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot1","Constellation_name","data"], _11);
  return main;
}
