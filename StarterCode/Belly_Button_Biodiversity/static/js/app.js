function buildMetadata(sample) {
  
  // Create URL path based on sample chose
  var metaDataURL = "/metadata/"+ sample;
  
  // Var for ID
  var panelBody = d3.select("#sample-metadata");
  
  // clear out any existing data
  panelBody.html("");

  d3.json(metaDataURL).then(function(metaData){
    Object.entries(metaData).forEach(([key,value]) => {
      panelBody.append("h5").text(`${key}: ${value}`);
    });
  });

}

// @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
// Use `.html("") to clear any existing metadata
// Use `Object.entries` to add each key and value pair to the panel
// Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ)

function buildCharts(_sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    var trace1 = [{
      label : ["red","yellow","green"],
      value:[10,3,1],
      "type" :  "pie"
    }];
    var data = [trace1];
    var layout= {
      width: 400,
      length:500,
    }
    console.log(data);
    Plotly.newPlot("pie",data,layout);
    
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};

init();

