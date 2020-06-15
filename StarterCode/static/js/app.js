d3.json("samples.json").then(function(data) {
    console.log(data);
    var names = data.names;
    // console.log(names);
    var otuIds = data.samples.otu_ids;
    var sampleValues = data.samples.sample_values;
    var otuLabels = data.samples.otu_lables;
    console.log(sampleValues)

    // Selecting dropdown menu
    var dropDown = d3.select("#selDataset")
    
    // adding each name label to the dropdown menu
    names.forEach((name) => dropDown.append("option").text(name))
    
    // trace1 = {
    //     x: , 
    //     y: ,
    //     type: 'bar',

    // }

});


// function optionChanged();