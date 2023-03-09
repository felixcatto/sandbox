console.log('ggwp lanaya');

$(window).on('load', () => {
    // var svg = d3.select("svg"),
    //     margin = {top: 20, right: 20, bottom: 30, left: 40},
    //     width = +svg.attr("width") - margin.left - margin.right,
    //     height = +svg.attr("height") - margin.top - margin.bottom;

    // var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    //     y = d3.scaleLinear().rangeRound([height, 0]);

    // var g = svg.append("g")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // d3.tsv("letters.tsv", function(d) {
    //     d.frequency = +d.frequency;
    //     return d;
    // }, function(error, data) {
    //     if (error) throw error;

    //     x.domain(data.map(function(d) { return d.letter; }));
    //     y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

    //     g.append("g")
    //         .attr("class", "axis axis--x")
    //         .attr("transform", "translate(0," + height + ")")
    //         .call(d3.axisBottom(x));

    //     g.append("g")
    //         .attr("class", "axis axis--y")
    //         .call(d3.axisLeft(y).ticks(10, "%"));

    //     g.selectAll(".bar")
    //       .data(data)
    //       .enter().append("rect")
    //         .attr("class", "bar")
    //         .attr("x", function(d) { return x(d.letter); })
    //         .attr("y", function(d) { return y(d.frequency); })
    //         .attr("width", x.bandwidth())
    //         .attr("height", function(d) { return height - y(d.frequency); });
    // });
























    // Playing with time
    window.data = JSON.parse('[{"_id":"a6LdK6CfR69HKCg9Z","name":"SLDGS Developers - MyTestCampaign2 - 2017_02_20 - 2017_02_28","budget":1000,"managementFee":0,"agencyDiscount":0,"type":"First","campaignId":"KXayy9ZzySZMLetjh","startDate":"2017-02-19T20:00:00.000Z","endDate":"2017-02-27T20:00:00.000Z","createdBy":"eLFS6HF5bGQFC2niY","createdAt":"2017-02-20T07:09:21.537Z"},{"_id":"tE47RxApagskpCw4j","name":"SLDGS Developers - MyTestCampaign2 - 2017_03_01 - 2017_03_02","type":"Renewal","budget":100000,"managementFee":0,"agencyDiscount":0,"campaignId":"KXayy9ZzySZMLetjh","startDate":"2017-02-28T20:00:00.000Z","endDate":"2017-03-01T20:00:00.000Z","createdBy":"eLFS6HF5bGQFC2niY","createdAt":"2017-02-20T07:21:52.046Z"},{"_id":"pTFSNaLJ9YRPxDEFC","name":"SLDGS Developers - MyTestCampaign2 - 2017_02_20 - 2017_02_20","type":"Uplift","baseIO":"a6LdK6CfR69HKCg9Z","budget":100,"managementFee":0,"agencyDiscount":0,"campaignId":"KXayy9ZzySZMLetjh","startDate":"2017-02-19T20:00:00.000Z","endDate":"2017-02-19T20:00:00.000Z","createdBy":"eLFS6HF5bGQFC2niY","createdAt":"2017-02-20T07:24:51.290Z"},{"_id":"rdNx47fP83BrNnNw9","name":"SLDGS Developers - MyTestCampaign2 - 2017_07_01 - 2017_07_31","type":"Renewal","budget":200,"managementFee":0,"agencyDiscount":0,"campaignId":"KXayy9ZzySZMLetjh","startDate":"2017-06-30T20:00:00.000Z","endDate":"2017-07-30T20:00:00.000Z","createdBy":"eLFS6HF5bGQFC2niY","createdAt":"2017-02-20T07:26:35.169Z"},{"_id":"HEQ7YHfwLDS8NRRwn","name":"SLDGS Developers - MyTestCampaign2 - 2017_08_01 - 2017_08_02","type":"Renewal","budget":1,"managementFee":0,"agencyDiscount":0,"campaignId":"KXayy9ZzySZMLetjh","startDate":"2017-07-31T20:00:00.000Z","endDate":"2017-08-01T20:00:00.000Z","createdBy":"eLFS6HF5bGQFC2niY","createdAt":"2017-02-20T07:42:55.491Z"},{"_id":"iW7HMjK3v9K2mohe9","name":"SLDGS Developers - MyTestCampaign2 - 2017_08_10 - 2017_08_24","type":"Renewal","budget":1,"managementFee":0,"agencyDiscount":0,"campaignId":"KXayy9ZzySZMLetjh","startDate":"2017-08-09T20:00:00.000Z","endDate":"2017-08-23T20:00:00.000Z","createdBy":"eLFS6HF5bGQFC2niY","createdAt":"2017-02-20T07:44:01.703Z"},{"_id":"uQhcymLvDFYqGKT3c","name":"SLDGS Developers - MyTestCampaign2 - 2017_08_25 - 2017_08_31","type":"Renewal","budget":1,"managementFee":0,"agencyDiscount":0,"campaignId":"KXayy9ZzySZMLetjh","startDate":"2017-08-24T20:00:00.000Z","endDate":"2017-08-30T20:00:00.000Z","createdBy":"eLFS6HF5bGQFC2niY","createdAt":"2017-02-20T07:44:18.305Z"},{"_id":"PjcR2mwn58vzBEiYi","name":"SLDGS Developers - MyTestCampaign2 - 2017_09_01 - 2017_09_30","type":"Renewal","budget":1,"managementFee":0,"agencyDiscount":0,"campaignId":"KXayy9ZzySZMLetjh","startDate":"2017-08-31T20:00:00.000Z","endDate":"2017-09-29T20:00:00.000Z","createdBy":"eLFS6HF5bGQFC2niY","createdAt":"2017-02-20T08:01:38.882Z"},{"_id":"Tt3sCSsfNPAYB4PuF","name":"SLDGS Developers - MyTestCampaign2 - 2017_10_01 - 2017_10_20","type":"Renewal","budget":1,"managementFee":0,"agencyDiscount":0,"campaignId":"KXayy9ZzySZMLetjh","startDate":"2017-09-30T20:00:00.000Z","endDate":"2017-10-19T20:00:00.000Z","createdBy":"eLFS6HF5bGQFC2niY","createdAt":"2017-02-20T08:24:25.691Z"},{"_id":"6a6tx5bFtMacnXmLZ","name":"SLDGS Developers - MyTestCampaign2 - 2018_01_01 - 2018_01_31","type":"Renewal","budget":300,"managementFee":0,"agencyDiscount":0,"campaignId":"KXayy9ZzySZMLetjh","startDate":"2017-12-31T20:00:00.000Z","endDate":"2018-01-30T20:00:00.000Z","createdBy":"eLFS6HF5bGQFC2niY","createdAt":"2017-02-20T10:23:45.348Z"}]');
    data.forEach(el => {
        el.startDate = new Date(el.startDate);
        el.endDate = new Date(el.endDate);
    });
    data = data.filter(el => el.type != "Uplift");

    var svg = d3.select("svg"),
        margin = {top: 30, right: 30, bottom: 40, left: 30},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    window.g = svg
        // .call(d3.zoom().on("zoom", function () {
        //     g.attr("transform", d3.event.transform);
        // }))
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    window.timeBarWidth = 70;
    var timeBarHeight = 34;
    var yLinesCount = 4;
    var heightLineSize = 34;
    var barHeight = 28;
    window.minDate = d3.min(data, d => d.startDate);
    window.maxDate = d3.max(data, d => d.endDate);

    var x = d3.scaleTime().range([0, d3.timeDay.count(minDate, maxDate) * timeBarWidth]).domain([minDate, maxDate]),
        y = d3.scaleLinear().range([yLinesCount * heightLineSize, 0]).domain([0, yLinesCount]);

    // Y AXIS
    var yAxis = d3.axisLeft(y).ticks(yLinesCount).tickSizeInner(-width).tickSizeOuter(0).tickPadding(10);
    var gY = g.append('g')
        .attr('transform', `translate(0, ${height - yLinesCount * heightLineSize})`)
        .call(yAxis);

    // X AXIS
    var xAxis = d3.axisBottom(x)
        .ticks(d3.timeDay.every(1))
        .tickFormat(d3.timeFormat("%d %b"))
        .tickSizeInner(-height)
        .tickSizeOuter(0)
        .tickPadding(10);
    var gX = g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)
        .selectAll(".tick").each(function(d, i) {        
            var el = d3.select(this);
            // console.log('i am here ');
            el.select('text')
                .attr('y', 0)
                .attr('dy', '0.5em')
                .attr('transform', `translate(${timeBarWidth/2}, ${timeBarHeight/2})`);
            el.insert('rect', ':first-child')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', timeBarWidth)
                .attr('height', timeBarHeight)
                .attr('class', 'date-wrap');
         });

    // BARS
    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.startDate); })
        .attr("y", height - heightLineSize)
        .attr("width", d => d3.timeDay.count(d.startDate, d.endDate) * timeBarWidth)
        .attr("height", heightLineSize);

    // svg.attr('width', g.node().getBBox().width);

    // var zoom = d3.zoom()
    //     .scaleExtent([1, 10])
    //     .translateExtent([[-100, 0], [width + 90, 0]])
    //     .on("zoom", zoomed);

});