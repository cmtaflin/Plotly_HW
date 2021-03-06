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

function buildCharts(sample) {
  
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then(function(response){
    console.log(response);

    // @TODO: Build a Bubble Chart using the sample data
    var bubbleTrace = {
      x: response.out_ids,
      y: response.sample_values,
      mode: "markers",
      text: response.otu_labels,
      marker: {
        color: response.out_ids,
        size: response.sample_values,
        colorscale: "Earth"
      }

    };  
    var bubbleData= [bubbleTrace];
    var bubbleLayout = {
      showlegend:false
    };

    Plotly.newPlot("bubble",bubbleData,bubbleLayout);
    
    // @TODO: Build a Pie Chart
    var pieTrace = {
      values: response.sample_values.slice(0,10),
      labels: response.otu_ids.slice(0,10),
      hovertext:response.otu_labels.slice(0,10),
      type: "pie"
    };

    var pieData = [pieTrace];
    var pieLayout= {
      showlegend:false
    };
    
    Plotly.newPlot("pie",pieData,pieLayout);
    
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  })  
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

