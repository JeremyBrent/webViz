d3.json("samples.json").then(function(data) {
    console.log(data);
    var names = data.names;
    // console.log(names);
    
    console.log(sampleValues);

    // Selecting dropdown menu
    var dropDown = d3.select("#selDataset");
    
    // adding each name label to the dropdown menu
    names.forEach((name) => dropDown.append("option").text(name).attr('value',name));

    var dropDownValue = dropDown.node().value;

    var otuIds = data.samples[0].otu_ids;

    var sampleValues = data.samples[0].sample_values;
    var sortSampleValues= sampleValues.sort((a,b) => b - a);
    var topSampleValues = sortSampleValues.slice(0,10).reverse();

    var otuLabels = data.samples[0].otu_lables;
    console.log(topSampleValues)

    data = [{
        x: topSampleValues, 
        y: `OTU ${otuIds}`,
        type: 'bar',
        orientation:'h'
    }];

    Plotly.newPlot("bar",data);

});


// function optionChanged();