d3.json("samples.json").then(function(data) {
    console.log(data);
    var names = data.names;
    // console.log(names);
    
    /////
    // Demographic info 
    /////
    var metaData = data.metadata[0]
    var metaDataDiv = d3.select("#sample-metadata")
    Object.entries(metaData)
        .forEach(([key,value]) => metaDataDiv.append("p").html( `<strong>${key.toUpperCase()}:</strong> ${value}`))
    // Demographic info complete
    /////

    //////
    // Dropdown menu
    /////
    var dropDown = d3.select("#selDataset");
    
    // adding each name label to the dropdown menu
    names.forEach((name) => dropDown.append("option").text(name).attr('value',name));

    var dropDownValue = dropDown.node().value;
    // Dropdown Menu Complete
    //////

    //////
    // Bar Chart 
    /////
    // Sample Values
    var sampleValues = data.samples[0].sample_values;
    var sortSampleValues= sampleValues.sort((a,b) => b - a);
    var topSampleValues = sortSampleValues.slice(0,10).reverse();
    // OTU ID
    var otuIds = data.samples[0].otu_ids;
    var topOtuIds = otuIds.slice(0,10).reverse();
    // OTU Label
    var otuLabels = data.samples[0].otu_labels;
    var topOtuLabels = otuLabels.slice(0,10).reverse();

    barData = [{
        x: topSampleValues, 
        y: topOtuIds,
        type: 'bar',
        orientation:'h',
        text: topOtuLabels,
        marker: {
            color: '#f5ac7b',
            line: {
                color: '#d96149',
                width: 1.5 
            }
        }
    }];

    layout = {
        title: {
            text: `Top ten species in Subject ${dropDownValue}`
        },
        xaxis: {
            title: "Sample Values",
            automargin: true
        },
        yaxis: {
            title: "OTU",
            type:'category',
            automargin: true
        },
        
    };

    Plotly.newPlot("bar",barData,layout);
    // Bar Chart Complete 
    /////

    //////
    // Bubble Chart 
    /////
    bubbleData = [{
        x: otuIds,
        y: sampleValues,
        mode: 'markers',
        marker: {
            size: sampleValues,
            color: otuIds,
        },
        text: otuLabels
    }];

    layout = {
        title: `All Bacterial Samples in Subject ${dropDownValue}`,
        xaxis: {
            title: "OTU Ids"
        },
        yaxis: {
            title: "Sample Values"
        }
    }

    Plotly.newPlot("bubble",bubbleData,layout)
    // Bubble Chart Complete 
    /////

    //////
    // Guage Chart 
    /////
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: data.metadata[0].wfreq,
            title: { text: "Belly Button Washes Per Week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,9]},
                steps: [
                    { range: [0, 2], color: '#d96149' },
                    { range: [2, 4], color: "#F1FAEE" },
                    { range: [4, 6], color: "#A8DADC" },
                    { range: [6, 8], color: "#457B9D" },
                    { range: [8, 10], color: "#1D3557" }
                  ],
                bar: { color: '#f5ac7b'}
            }
        }
    ];
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);
    // Gauge Chart Complete 
    /////
});

