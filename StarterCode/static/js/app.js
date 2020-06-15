d3.json("samples.json").then(function(data) {
    console.log(data);
    var names = data.names;
    // console.log(names);
    
    /////
    // Demographic info 
    /////
    var metaData = data.metadata[0]
    var metaDataDiv = d3.select("#sample-metadata")
    Object.entries(metaData).forEach(([key,value]) => metaDataDiv.append("p").html( `<strong>${key.toUpperCase()}:</strong> ${value}`))
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
    var otuIds = data.samples[0].otu_ids.slice(0,10).reverse();
    // OTU Label
    var otuLabels = data.samples[0].otu_labels.slice(0,10).reverse();
    /////////
    // Need to get OTU labels for y axis //
    /////////
    barData = [{
        x: topSampleValues, 
        y: `OTU ${otuIds}`,
        type: 'bar',
        orientation:'h',
        text: otuLabels,
        label: otuIds
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
            automargin: true
        }
    };

    Plotly.newPlot("bar",barData,layout);


    
});

