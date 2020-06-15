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

    var otuIds = data.samples[0].otu_ids.slice(0,10).reverse();


    var sampleValues = data.samples[0].sample_values;
    var sortSampleValues= sampleValues.sort((a,b) => b - a);
    var topSampleValues = sortSampleValues.slice(0,10).reverse();

    var otuLabels = data.samples[0].otu_lables;
/////////
// Need to get OTU labels for y axis //
/////////
    data = [{
        x: topSampleValues, 
        y: `OTU ${otuIds}`,
        type: 'bar',
        orientation:'h'
    }];

    layout = {
        title: {
            text: `Top ten species in Subject ${dropDownValue}`
        },
        xaxis: {
            title: {
                text: "Sample Values"
            }
        },
        yaxis: {
            title: {
                text: "OTU"
            }
        }
    };

    Plotly.newPlot("bar",data,layout);

});


// function optionChanged();

 // var sortable = [];
    // for (var sample in samples ) {
    //     sortable.push([sample,samples[sample]]);
    // }
    // sortable.sort((a,b) => b-a);
    // console.log(sortable)

    // var topSampleValues = sortable[2][0].slice(0,10).reverse()
    // var otuIds = sortable[3].slice(0,10).reverse()

    // console.log(topSampleValues)
