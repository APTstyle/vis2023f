function _1(md){return(
md`# Hw6`
)}

function _artistver(FileAttachment){return(
FileAttachment("artistVer.csv").csv()
)}

function _artistpublic(FileAttachment){return(
FileAttachment("artistPublic.csv").csv()
)}

function _dataArtistver(artistver){return(
artistver.map(item=>item["3）從1到5級距，您認為藝術產業的碳排放量在那個相對位置？"])
)}

function _dataArtistpublic(artistpublic){return(
artistpublic.map(item=>item["4）從1到5級距，您認為藝術產業的碳排放量在那個相對位置？"])
)}

function _datalist(){return(
[]
)}

function _7(datalist,artistver,artistpublic)
{
  datalist.length = 0;

  for (var y=1; y<=5; y++) { 
    datalist.push({dataset:"artist", value:y, count:0}); 
    datalist.push({dataset:"artistpublic", value:y, count:0}); 
  }
  artistver.forEach (x=> {
    var i = (x["3）從1到5級距，您認為藝術產業的碳排放量在那個相對位置？"]-1) * 2; 
    datalist[i].count++;
  })
  artistpublic.forEach (x=> {
    var i = (x["4）從1到5級距，您認為藝術產業的碳排放量在那個相對位置？"]) * 2 - 1; 
    datalist[i].count++;
  })
  return datalist
}


function _selectDataSet(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _9(md){return(
md`---
SimpleBaseline
---`
)}

function _10(Plot,datalist,selectDataSet){return(
Plot.plot({  
  grid: true,
  y: {label: "count"},
  // x: {label: "constellation", ticks: 10, tickFormat: (d) => constellationNM[d]},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(datalist.filter(d => selectDataSet.includes(d.dataset)), Plot.stackY({x: "value", y: "count", tip: true , fill:"dataset",title: d => `data set: ${d.dataset}\nvalue: ${d.value}\ncount: ${d.count}`})),
  ],
  color: {
    domain: ['artist', 'artistpublic'],
    range: ['#84C1FF', '#FF95CA'], 
    legend: true
  }
})
)}

function _11(md){return(
md`---
Medium Baseline
---`
)}

function _selectedSeries1(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _chart(datalist,selectedSeries1,d3)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // 取得所有的系列名稱（無重複）
  const keys = Array.from(new Set(datalist.map(d => d.dataset)));
  
  // 根據選擇的系列過濾數據
  const filteredData = datalist.filter(d => selectedSeries1.includes(d.dataset));

  // 對過濾後的數據進行分組處理
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.dataset, obj.count]))};
  });

  // 定義堆疊方式並計算
  const stack = d3.stack().keys(keys);
  const dataset = stack(grouped);
  
  // 定義x軸的比例尺
  const xScale = d3.scaleBand()
    .domain(datalist.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  // 定義y軸的比例尺
  const yMax = d3.max(dataset, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  // 定義顏色的比例尺
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#005CAF', '#E03C8A']);

  // 創建SVG元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // 繪製每一個系列的柱子
  dataset.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)

          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  // 繪製x軸
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale))

  // 繪製y軸
  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _chart1(datalist,selectedSeries1,d3)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // 取得所有的系列名稱（無重複）
  const keys = Array.from(new Set(datalist.map(d => d.dataset)));
  
  // 根據選擇的系列過濾數據
  const filteredData = datalist.filter(d => selectedSeries1.includes(d.dataset));

  // 對過濾後的數據進行分組處理
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.dataset, obj.count]))};
  });

  // 定義堆疊方式並計算
  const stack = d3.stack().keys(keys);
  const dataset = stack(grouped);
  
  // 定義x軸的比例尺
  const xScale = d3.scaleBand()
    .domain(datalist.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  // 定義y軸的比例尺
  const yMax = d3.max(dataset, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  // 定義顏色的比例尺
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#005CAF', '#E03C8A']);

  // 創建SVG元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // 繪製每一個系列的柱子
  dataset.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
        //新增以下兩行可新增出過渡效果
          .transition() 
          .duration(1000) //改為0可以呈現無過度效果
        //新增到這兩行可新增出過渡效果
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  // 繪製x軸
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // 繪製y軸
  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _15(md){return(
md`---
Strong Baseline
---`
)}

function _chart2(datalist,selectedSeries1,d3)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // 取得所有的系列名稱（無重複）
  const keys = Array.from(new Set(datalist.map(d => d.dataset)));
  
  // 根據選擇的系列過濾數據
  const filteredData = datalist.filter(d => selectedSeries1.includes(d.dataset));

  // 對過濾後的數據進行分組處理
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.dataset, obj.count]))};
  });

  // 定義堆疊方式並計算
  const stack = d3.stack().keys(keys);
  const dataset = stack(grouped);
  
  // 定義x軸的比例尺
  const xScale = d3.scaleBand()
    .domain(datalist.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  // 定義y軸的比例尺
  const yMax = d3.max(dataset, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  // 定義顏色的比例尺
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#005CAF', '#E03C8A']);
   // .range(['lightblue', 'lightblue']);
     //d3.scaleLinear().domain([舊的範圍]).range([新的範圍]) 
    //就是把舊範圍縮放到新的範圍內 

  // 創建SVG元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  
  // 添加陰影濾鏡效果
  const defs = svg.append("defs");
  const filter = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");
  
  filter.append("feGaussianBlur") //SVG濾鏡效果(高斯模糊) 用於模糊影像
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 4) //模糊的程度
      .attr("result", "blur"); //濾鏡的輸出

  filter.append("feOffset") //濾鏡的輸出(位移)
      .attr("in", "blur") //濾鏡的輸出(為前面定義的blur)
      .attr("dx", 4) //水平位移量
      .attr("dy", 4) //垂直位移量
      .attr("result", "offsetBlur"); //濾鏡的輸出名稱

  const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
               .attr("in", "offsetBlur");
        feMerge.append("feMergeNode")
               .attr("in", "SourceGraphic"); //


  // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  // 繪製每一個系列的柱子
  dataset.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]))
          .attr("filter", "url(#drop-shadow)") // 添加陰影濾鏡效果
          .on("mouseover", function(d) {
              d3.select(this).attr("fill", "#4A225D");
             //d3.select(this).attr("fill", "#B47157pink");
            
              
          
              
            })
        .on("mouseout", function(d) {
            d3.select(this).attr("fill", colorScale(serie.key)); // 恢復原來的顏色
        d3.select(".tooltip").remove();

        });
});

  // 繪製x軸
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // 繪製y軸
  g.append("g")
    .call(d3.axisLeft(yScale));

  

  return svg.node();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artistVer.csv", {url: new URL("../artistVer.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["artistPublic.csv", {url: new URL("../artistPublic.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artistver")).define("artistver", ["FileAttachment"], _artistver);
  main.variable(observer("artistpublic")).define("artistpublic", ["FileAttachment"], _artistpublic);
  main.variable(observer("dataArtistver")).define("dataArtistver", ["artistver"], _dataArtistver);
  main.variable(observer("dataArtistpublic")).define("dataArtistpublic", ["artistpublic"], _dataArtistpublic);
  main.variable(observer("datalist")).define("datalist", _datalist);
  main.variable(observer()).define(["datalist","artistver","artistpublic"], _7);
  main.variable(observer("viewof selectDataSet")).define("viewof selectDataSet", ["Inputs"], _selectDataSet);
  main.variable(observer("selectDataSet")).define("selectDataSet", ["Generators", "viewof selectDataSet"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["Plot","datalist","selectDataSet"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof selectedSeries1")).define("viewof selectedSeries1", ["Inputs"], _selectedSeries1);
  main.variable(observer("selectedSeries1")).define("selectedSeries1", ["Generators", "viewof selectedSeries1"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["datalist","selectedSeries1","d3"], _chart);
  main.variable(observer("chart1")).define("chart1", ["datalist","selectedSeries1","d3"], _chart1);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("chart2")).define("chart2", ["datalist","selectedSeries1","d3"], _chart2);
  return main;
}
