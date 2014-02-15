
//pass in data as normal json
function render(data){
    var chartData = [];

    for (var index in data.items){
        var item = data.items[index];
        var choices = item.choices;
        delete item.choices;
        chartData.push(item);
        for (var choiceIndex in choices){
            chartData.push(choices[choiceIndex]);
        }
    }

    console.log('chart data')
    console.dir(chartData)
    return chartData;
}

exports.render = render;