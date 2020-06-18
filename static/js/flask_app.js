function buildMetaData(sample) {
    var url = `/metadata/${sample}`
    d3.json(url).then(function (sampleData) {

        // Clear existing metadata
        d3.select("#sample-metadata").html("");

        // Add a line for each metadata pair
        Object.entries(sampleData).forEach(([key, value]) => {
            d3.select("#sample-metadata")
                .append("p")
                .html(`<strong>${key.toUpperCase()}:</strong> ${value}`);
        });
    });
}


function buildCharts(sample) {

    // /**
    // /* Builds bubble chart and pie chart for given sample.
    // /* @param {string}    sample    Name of the sample
    // */

    // Construct url for path to data for selected sample
    var url = `/samples/${sample}`;

    // Fetch sample information
    d3.json(url).then(function (sampleData) {

        // Unpack json to lists
        var otu_ids = sampleData.otu_ids;
        var sample_values = sampleData.sample_values;
        var otu_labels = sampleData.otu_labels;

        // Create a list of objects for each otu_id
        otuData = [];
        otuData = otu_ids.map((d, i) => {
            return { otu_id: d, sample_value: sample_values[i], otu_label: otu_labels[i] }
        });

        // Sort data by sample_values and slice top 10 values
        otuData.sort((a, b) => b.sample_value - a.sample_value);
        otuData = otuData.slice(0, 10);

        // BUILD BUBBLE PLOT
        // Build bubble plot variables
        var trace1 = {
            x: otuData.map(d => d.otu_id),
            y: otuData.map(d => d.sample_value),
            text: otuData.map(d => d.otu_label),
            mode: 'markers',
            marker: {
                color: otuData.map(d => d.otu_id),
                size: otuData.map(d => d.sample_value)
            }
        };
        var data1 = [trace1];
        var layout1 = {
            xaxis: {
                title: {
                    text: "OTU ID"
                }
            },
            showlegend: false,
            height: 600,
            width: 1200
        };
        // Generate bubble plot
        Plotly.newPlot("bubble", data1, layout1);

        // BUILD PIE CHART
        // Build pie chart variables
        var trace2 = {
            labels: otuData.map(d => d.otu_id),
            values: otuData.map(d => d.sample_value),
            hovertext: otuData.map(d => d.otu_label),
            type: "pie"
        };
        var data2 = [trace2];
        var layout2 = {
            height: 450,
            width: 450
        };
        // Generate bubble plot
        Plotly.newPlot("pie", data2, layout2);
    });
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
        bonus(firstSample);
    });
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
    bonus(newSample);
}

// Initialize the dashboard
init();



// d3.json("data/samples.json").then(function (data) {
//     const dataSet = data
//     console.log(dataSet)


//     //////
//     // Dropdown menu
//     /////
//     var dropDown = d3.select("#selDataset");

//     // adding each name label to the dropdown menu
//     var names = data.names;
//     names.forEach((name) => dropDown.append("option").text(name).attr('value', name));

//     var dropDownValue = dropDown.node().value;
//     // Dropdown Menu Complete
//     //////

//     //////
//     // Bar Chart 
//     /////
//     // Sample Values
//     var sampleValues = data.samples[0].sample_values;
//     var sortSampleValues = sampleValues.sort((a, b) => b - a);
//     var topSampleValues = sortSampleValues.slice(0, 10).reverse();
//     // OTU ID
//     var otuIds = data.samples[0].otu_ids;
//     var topOtuIds = otuIds.slice(0, 10).reverse();
//     // OTU Label
//     var otuLabels = data.samples[0].otu_labels;
//     var topOtuLabels = otuLabels.slice(0, 10).reverse();

//     barData = [{
//         x: topSampleValues,
//         y: topOtuIds,
//         type: 'bar',
//         orientation: 'h',
//         text: topOtuLabels,
//         marker: {
//             color: '#f5ac7b',
//             line: {
//                 color: '#d96149',
//                 width: 1.5
//             }
//         }
//     }];

//     layout = {
//         title: {
//             text: `Top ten species in Subject ${dropDownValue}`
//         },
//         xaxis: {
//             title: "Sample Values",
//             automargin: true
//         },
//         yaxis: {
//             title: "OTU",
//             type: 'category',
//             automargin: true
//         },

//     };

//     Plotly.newPlot("bar", barData, layout);
//     // Bar Chart Complete 
//     /////

//     //////
//     // Bubble Chart 
//     /////
//     var bubbleData = [{
//         x: otuIds,
//         y: sampleValues,
//         mode: 'markers',
//         marker: {
//             size: sampleValues,
//             color: otuIds,
//         },
//         text: otuLabels
//     }];

//     var layout = {
//         title: `All Bacterial Samples in Subject ${dropDownValue}`,
//         xaxis: {
//             title: "OTU Ids"
//         },
//         yaxis: {
//             title: "Sample Values"
//         }
//     }

//     Plotly.newPlot("bubble", bubbleData, layout)
//     // Bubble Chart Complete 
//     /////

//     //////
//     // Guage Chart 
//     /////
//     var data = [
//         {
//             domain: { x: [0, 1], y: [0, 1] },
//             value: data.metadata[0].wfreq,
//             title: { text: "Belly Button Washes Per Week" },
//             type: "indicator",
//             mode: "gauge+number",
//             gauge: {
//                 axis: { range: [0, 9] },
//                 steps: [
//                     { range: [0, 2], color: '#d96149' },
//                     { range: [2, 4], color: "#F1FAEE" },
//                     { range: [4, 6], color: "#A8DADC" },
//                     { range: [6, 8], color: "#457B9D" },
//                     { range: [8, 10], color: "#1D3557" }
//                 ],
//                 bar: { color: '#f5ac7b' }
//             }
//         }
//     ];

//     var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
//     Plotly.newPlot('gauge', data, layout);
//     // Gauge Chart Complete 
//     /////
// });


// function optionChanged() {
//     d3.json("data/samples.json").then(function (data) {
//         var dropDown = d3.select("#selDataset");
//         var dropDownValue = dropDown.node().value;

//         /////
//         // Demographic info 
//         /////
//         var metaData = data.metadata.filter(d => d.id == dropDownValue)[0];
//         console.log(metaData)
//         var metaDataDiv = d3.select("#sample-metadata").text("")
//         Object.entries(metaData)
//             .forEach(([key, value]) => metaDataDiv.append("p").html(`<strong>${key.toUpperCase()}:</strong> ${value}`))
//         // Demographic info complete
//         /////


//         //////
//         // Bar Chart 
//         /////
//         var sample = data.samples.filter(d => d.id == dropDownValue)[0];
//         // Sample Values
//         var sampleValues = sample.sample_values;
//         var topSampleValues = sampleValues.slice(0, 10).reverse();
//         // // OTU ID
//         var otuIds = sample.otu_ids;
//         var topOtuIds = otuIds.slice(0, 10).reverse();
//         // // OTU Label
//         var otuLabels = sample.otu_labels;
//         var topOtuLabels = otuLabels.slice(0, 10).reverse();

//         var update = {
//             x: [topSampleValues],
//             y: [topOtuIds],
//             text: [topOtuLabels]
//         };

//         Plotly.restyle("bar", update);

//         var update = {
//             title: `Top ten species in Subject ${dropDownValue}`,
//             yaxis: {
//                 type: 'category',
//                 title: "OTU",
//                 automargin: true
//             },
//             xaxis: {
//                 automargin: true,
//                 title: "Sample Values"
//             }
//         }
//         Plotly.relayout("bar", update)
//         // Bar Chart Complete 
//         //////


//         //////
//         // Guage Chart 
//         /////
//         var update = {
//             value: data.metadata.filter(d => d.id == dropDownValue)[0].wfreq
//         };

//         Plotly.restyle('gauge', update);
//         // Gauge Chart Complete 
//         /////


//         //////
//         // Bubble Chart 
//         /////
//         var update = {
//             x: [otuIds],
//             y: [sampleValues],
//             marker: {
//                 size: sampleValues,
//                 color: otuIds,
//             },
//             text: otuLabels
//         };

//         Plotly.restyle("bubble", update);

//         var update = {
//             title: `All Bacterial Samples in Subject ${dropDownValue}`,
//             yaxis: {
//                 automargin: true,
//                 title: "Sample Values"
//             },
//             xaxis: {
//                 automargin: true,
//                 title: "OTU Ids"
//             }
//         };

//         Plotly.relayout("bubble", update);
//         // Bubble Chart Complete 
//         /////
//     })
// }