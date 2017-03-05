window.addEventListener('load', function(){
    // start point
    console.log(mapJSON);

    var body = $('body');
    var canvas = document.createElement('canvas');
    var mapWidth = mapJSON.tilesets[0].imagewidth;
    var mapHeight = mapJSON.tilesets[0].imageheight;
    canvas.width = 6400;
    canvas.height = 6400;
    body.append(canvas);
    // var img = new Image();
    // img.onload = function() {
    //     console.log('yeah');
    //     c = canvas.getContext("2d");
    //     c.drawImage(img, 0, 0);
    // }
    // img.src = mapJSON.tilesets[0].image;










    //  utility functions
    var TILEDMapClass = Class.extend({
        // This is where we store the full parsed
        // JSON of the map.json file.
        currMapData: null,

        // tilesets stores each individual tileset
        // from the map.json's 'tilesets' Array.
        // The structure of each entry of this
        // Array is explained below in the
        // parseAtlasDefinition method.
        tilesets: [],

        // This is where we store the width and
        // height of the map in tiles. This is
        // in the 'width' and 'height' fields
        // of map.json, respectively.
        // The values 100 here are just set
        // so these fields are initialized to
        // something, rather than null.
        numXTiles: 100,
        numYTiles: 100,

        // The size of each individual map
        // tile, in pixels. This is in the
        // 'tilewidth' and 'tileheight' fields
        // of map.json, respectively.
        // The values 64 here are just set
        // so these fields are initialized to
        // something, rather than null.
        tileSize: {
            "x": 64,
            "y": 64
        },

        // The size of the entire map,
        // in pixels. This is calculated
        // based on the 'numXTiles', 'numYTiles',
        // and 'tileSize' parameters.
        // The values 64 here are just set
        // so these fields are initialized to
        // something, rather than null.
        pixelSize: {
            "x": 64,
            "y": 64
        },

        // Counter to keep track of how many tile
        // images we have successfully loaded.
        imgLoadCount: 0,

        // Boolean flag we set once our tile images
        // has finished loading.
        fullyLoaded: false,

        //-----------------------------------------
        // Load the json file at the url 'map' into
        // memory. This is similar to the requests
        // we've done in the past using
        // XMLHttpRequests.
        load: function (map) {

            // Perform an XMLHttpRequest to grab the
            // JSON file at url 'map'.
            // xhrGet(map, function (data) {
            //     // Once the XMLHttpRequest loads, call the
            //     // parseMapJSON method.
            //     gMap.parseMapJSON(data.responseText);
            // });

            // Sorry bro, no XHR allowed here
            gMap.parseMapJSON(JSON.stringify(mapJSON));
        },

        //-----------------------------------------
        // Parses the map data from 'mapJSON', then
        // stores that data in a number of members
        // of our 'TILEDMapClass' that are defined
        // above.
        parseMapJSON: function (mapJSON) {
            // Call JSON.parse on 'mapJSON' and store
            // the resulting map data
            gMap.currMapData = JSON.parse(mapJSON);

            var map = gMap.currMapData;
          
            // Set 'numXTiles' and 'numYTiles' from the
            // 'width' and 'height' fields of our parsed
            // map data.
            gMap.numXTiles = map.width;
            gMap.numYTiles = map.height;
          
            // Set the 'tileSize.x' and 'tileSize.y' fields
            // from the 'tilewidth' and 'tileheight' fields
            // of our parsed map data.
            gMap.tileSize.x = map.tilewidth;
            gMap.tileSize.y = map.tileheight;
          
            // Set the 'pixelSize.x' and 'pixelSize.y' fields
            // by multiplying the number of tiles in our map
            // by the size of each tile in pixels.
            gMap.pixelSize.x = gMap.numXTiles * gMap.tileSize.x;
            gMap.pixelSize.y = gMap.numYTiles * gMap.tileSize.y;

            // Loop through 'map.tilesets', an Array...
            for(var i = 0; i < map.tilesets.length; i++) {

                // ...loading each of the provided tilesets as
                // Images...
                var img = new Image();
                img.onload = function () {
                    // ...Increment the above 'imgLoadCount'
                    // field of 'TILEDMap' as each tileset is 
                    // loading...
                    gMap.imgLoadCount++;
                    if (gMap.imgLoadCount === map.tilesets.length) {
                        // ...Once all the tilesets are loaded, 
                        // set the 'fullyLoaded' flag to true...
                        gMap.fullyLoaded = true;
                        document.dispatchEvent(new Event('tilesets:loaded'));
                    }
                };

                // The 'src' value to load each new Image from is in
                // the 'image' property of the 'tilesets'.
                img.src = map.tilesets[i].image;

                // This is the javascript object we'll create for
                // the 'tilesets' Array above. First, fill in the
                // given fields with the corresponding fields from
                // the 'tilesets' Array in 'currMapData'.
                var ts = {
                    "firstgid": gMap.currMapData.tilesets[i].firstgid,

                    // 'image' should equal the Image object we
                    // just created.

                    "image": img,
                    "imageheight": gMap.currMapData.tilesets[i].imageheight,
                    "imagewidth": gMap.currMapData.tilesets[i].imagewidth,
                    "name": gMap.currMapData.tilesets[i].name,

                    // These next two fields are tricky. You'll
                    // need to calculate this data from the
                    // width and height of the overall image and
                    // the size of each individual tile.
                    // 
                    // Remember: This should be an integer, so you
                    // might need to do a bit of manipulation after
                    // you calculate it.

                    "numXTiles": Math.floor(gMap.currMapData.tilesets[i].imagewidth / gMap.tileSize.x),
                    "numYTiles": Math.floor(gMap.currMapData.tilesets[i].imageheight / gMap.tileSize.y)
                };

                // After that, push the newly created object into
                // the 'tilesets' Array above. Javascript Arrays
                // have a handy method called, appropriately, 'push'
                // that does exactly this. It takes the object
                // we'd like to put into the Array as a parameter.
                // 
                // YOUR CODE HERE
                gMap.tilesets.push(ts);
            }
        },

        //-----------------------------------------
        // Grabs a tile from our 'layer' data and returns
        // the 'pkt' object for the layer we want to draw.
        // It takes as a parameter 'tileIndex', which is
        // the id of the tile we'd like to draw in our
        // layer data.
        getTilePacket: function (tileIndex) {

            // We define a 'pkt' object that will contain
            // 
            // 1) The Image object of the given tile.
            // 2) The (x,y) values that we want to draw
            //    the tile to in map coordinates.
            var pkt = {
                "img": null,
                "px": 0,
                "py": 0
            };

            // The first thing we need to do is find the
            // appropriate tileset that we want to draw
            // from.
            //
            // Remember, if the tileset's 'firstgid'
            // parameter is less than the 'tileIndex'
            // of the tile we want to draw, then we know
            // that tile is not in the given tileset and
            // we can skip to the next one.
            var tile = 0;
            for(tile = gMap.tilesets.length - 1; tile >= 0; tile--) {
                if(gMap.tilesets[tile].firstgid <= tileIndex) break;
            }

            // Next, we need to set the 'img' parameter
            // in our 'pkt' object to the Image object
            // of the appropriate 'tileset' that we found
            // above.
            pkt.img = gMap.tilesets[tile].image;


            // Finally, we need to calculate the position to
            // draw to based on:
            //
            // 1) The local id of the tile, calculated from the
            //    'tileIndex' of the tile we want to draw and
            //    the 'firstgid' of the tileset we found earlier.
            var localIdx = tileIndex - gMap.tilesets[tile].firstgid;

            // 2) The (x,y) position of the tile in terms of the
            //    number of tiles in our tileset. This is based on
            //    the 'numXTiles' of the given tileset. Note that
            //    'numYTiles' isn't actually needed here. Think about
            //    how the tiles are arranged if you don't see this,
            //    It's a little tricky. You might want to use the 
            //    modulo and division operators here.
            var lTileX = Math.floor(localIdx % gMap.tilesets[tile].numXTiles);
            var lTileY = Math.floor(localIdx / gMap.tilesets[tile].numXTiles);

            // 3) the (x,y) pixel position in our tileset image of the
            //    tile we want to draw. This is based on the tile
            //    position we just calculated and the (x,y) size of
            //    each tile in pixels.
            pkt.px = (lTileX * gMap.tileSize.x);
            pkt.py = (lTileY * gMap.tileSize.y);


            return pkt;
        },

        //-----------------------------------------
        // Draws all of the map data to the passed-in
        // canvas context, 'ctx'.
        draw: function (ctx) {
            // First, we need to check if the map data has
            // already finished loading...
            if(!gMap.fullyLoaded) return;

            // ...Now, for every single layer in the 'layers' Array
            // of 'currMapData'...
            for(var layerIdx = 0; layerIdx < gMap.currMapData.layers.length; layerIdx++) {
                // Check if the 'type' of the layer is "tilelayer". If it isn't, we don't
                // care about drawing it...
                if(gMap.currMapData.layers[layerIdx].type != "tilelayer") continue;

                // ...Grab the 'data' Array of the given layer...
                var dat = gMap.currMapData.layers[layerIdx].data;

                // ...For each tileID in the 'data' Array...
                for(var tileIDX = 0; tileIDX < dat.length; tileIDX++) {
                    // ...Check if that tileID is 0. Remember, we don't draw
                    // draw those, so we can skip processing them...
                    var tID = dat[tileIDX];
                    if(tID === 0) continue;

                    // ...If the tileID is not 0, then we grab the
                    // packet data using getTilePacket.
                    var tPKT = gMap.getTilePacket(tID);

                    // Now we need to calculate the (x,y) position we want to draw
                    // to in our game world.
                    //
                    // We've performed a similar calculation in 'getTilePacket',
                    // think about how to calculate this based on the tile id and
                    // various tile properties that our TILEDMapClass has.
                    //
                    // YOUR CODE HERE

                    worldX = Math.floor(tileIDX % this.numXTiles) * this.tileSize.x;
                    worldY = Math.floor(tileIDX / this.numXTiles) * this.tileSize.y;

                    // console.log(`worldX = ${worldX}, worldY = ${worldY}, tileIDX = ${tileIDX}`);
                    console.log(`px = ${tPKT.px}, py = ${tPKT.py}, tileIDX = ${tileIDX}`);


                    ctx.drawImage(tPKT.img, tPKT.px, tPKT.py,
                        this.tileSize.x, this.tileSize.y,
                        worldX, worldY,
                        this.tileSize.x, this.tileSize.y
                    );
                }
            }
        }
    });

    //  start point
    gMap = new TILEDMapClass();
    gMap.load();
    ctx = canvas.getContext('2d');
    document.addEventListener('tilesets:loaded', function(event){
        console.log('yeah');
        gMap.draw(ctx);
    });
});


















// 'downloaded' with AJAX map file
window.mapJSON = {
    "height": 100,
    "layers": [{
        "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 0, 0, 0, 0, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 0, 0, 0, 0, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 0, 0, 0, 0, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 0, 0, 0, 0, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 0, 0, 0, 0, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 201, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 0, 0, 0, 0, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 196, 196, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 0, 0, 0, 0, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 201, 167, 167, 167, 167, 167, 196, 196, 196, 196, 196, 196, 196, 167, 167, 167, 167, 167, 167, 167, 201, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 0, 0, 0, 0, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 196, 196, 196, 196, 196, 196, 196, 196, 196, 196, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 0, 0, 0, 0, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 201, 167, 167, 167, 196, 227, 196, 227, 196, 196, 196, 196, 196, 196, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 0, 0, 0, 0, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 201, 167, 167, 167, 167, 167, 196, 196, 227, 196, 196, 196, 196, 196, 196, 196, 196, 167, 167, 167, 201, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167],
        "height": 100,
        "name": "floor",
        "opacity": 1,
        "type": "tilelayer",
        "visible": true,
        "width": 100,
        "x": 0,
        "y": 0
    }, {
        "color": "#00ff00",
        "height": 100,
        "name": "collision",
        "objects": [{
            "height": 524,
            "name": "",
            "properties": {

            },
            "type": "",
            "width": 155,
            "x": 1745,
            "y": 2265
        }, {
            "height": 272,
            "name": "",
            "properties": {

            },
            "type": "",
            "width": 116,
            "x": 1625,
            "y": 2395
        }, {
            "height": 211,
            "name": "",
            "properties": {

            },
            "type": "",
            "width": 348,
            "x": 1879,
            "y": 2711
        }, {
            "height": 107,
            "name": "",
            "properties": {

            },
            "type": "",
            "width": 477,
            "x": 1809,
            "y": 2757
        }],
        "opacity": 1,
        "type": "objectgroup",
        "visible": true,
        "width": 100,
        "x": 0,
        "y": 0
    }, {
        "color": "#ff00ff",
        "height": 100,
        "name": "environment",
        "objects": [{
            "height": 44,
            "name": "EnergySpawner",
            "properties": {
                "SpawnItem": "EnergyCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 2707,
            "y": 2779
        }, {
            "height": 44,
            "name": "EnergySpawner",
            "properties": {
                "SpawnItem": "EnergyCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 2699,
            "y": 3612
        }, {
            "height": 44,
            "name": "EnergySpawner",
            "properties": {
                "SpawnItem": "EnergyCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 3660,
            "y": 3606
        }, {
            "height": 44,
            "name": "EnergySpawner",
            "properties": {
                "SpawnItem": "EnergyCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 3660,
            "y": 2760
        }, {
            "height": 19,
            "name": "QuadDamageSpawner",
            "properties": {
                "SpawnItem": "QuadDamage"
            },
            "type": "Spawner",
            "width": 20,
            "x": 3191,
            "y": 3195
        }, {
            "height": 19,
            "name": "QuadDamageSpawner",
            "properties": {
                "SpawnItem": "QuadDamage"
            },
            "type": "Spawner",
            "width": 20,
            "x": 1464,
            "y": 4922
        }, {
            "height": 19,
            "name": "QuadDamageSpawner",
            "properties": {
                "SpawnItem": "QuadDamage"
            },
            "type": "Spawner",
            "width": 20,
            "x": 5110,
            "y": 1463
        }, {
            "height": 24,
            "name": "Team0Spawn0",
            "properties": {
                "team": "0"
            },
            "type": "SpawnPoint",
            "width": 22,
            "x": 1269,
            "y": 1265
        }, {
            "height": 24,
            "name": "Team1Spawn0",
            "properties": {
                "team": "1"
            },
            "type": "SpawnPoint",
            "width": 22,
            "x": 5110,
            "y": 5106
        }, {
            "height": 44,
            "name": "HealthSpawner",
            "properties": {
                "SpawnItem": "HealthCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 5096,
            "y": 3140
        }, {
            "height": 44,
            "name": "HealthSpawner",
            "properties": {
                "SpawnItem": "HealthCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 2956,
            "y": 5145
        }, {
            "height": 44,
            "name": "HealthSpawner",
            "properties": {
                "SpawnItem": "HealthCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 3468,
            "y": 5146
        }, {
            "height": 44,
            "name": "HealthSpawner",
            "properties": {
                "SpawnItem": "HealthCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 1278,
            "y": 3246
        }, {
            "height": 44,
            "name": "HealthSpawner",
            "properties": {
                "SpawnItem": "HealthCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 1281,
            "y": 3046
        }, {
            "height": 44,
            "name": "HealthSpawner",
            "properties": {
                "SpawnItem": "HealthCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 5094,
            "y": 3226
        }, {
            "height": 44,
            "name": "HealthSpawner",
            "properties": {
                "SpawnItem": "HealthCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 2961,
            "y": 1225
        }, {
            "height": 44,
            "name": "HealthSpawner",
            "properties": {
                "SpawnItem": "HealthCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 3458,
            "y": 1229
        }, {
            "height": 44,
            "name": "HealthSpawner",
            "properties": {
                "SpawnItem": "HealthCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 5098,
            "y": 1597
        }, {
            "height": 44,
            "name": "HealthSpawner",
            "properties": {
                "SpawnItem": "HealthCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 1517,
            "y": 5129
        }, {
            "height": 44,
            "name": "TP",
            "properties": {
                "destination": "79.849,34.802"
            },
            "type": "teleporter",
            "width": 46,
            "x": 4782,
            "y": 1329
        }, {
            "height": 44,
            "name": "TP",
            "properties": {
                "destination": "75.870, 24.698"
            },
            "type": "teleporter",
            "width": 46,
            "x": 3049,
            "y": 4274
        }, {
            "height": 44,
            "name": "TP",
            "properties": {
                "destination": "22.661,67.740"
            },
            "type": "teleporter",
            "width": 46,
            "x": 1250,
            "y": 5099
        }, {
            "height": 44,
            "name": "TP",
            "properties": {
                "destination": "21.578,74.615"
            },
            "type": "teleporter",
            "width": 46,
            "x": 3498,
            "y": 4586
        }, {
            "height": 44,
            "name": "HealthSpawner",
            "properties": {
                "SpawnItem": "HealthCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 5098,
            "y": 1350
        }, {
            "height": 44,
            "name": "HealthSpawner",
            "properties": {
                "SpawnItem": "HealthCanister"
            },
            "type": "Spawner",
            "width": 46,
            "x": 1469,
            "y": 4713
        }, {
            "height": 44,
            "name": "TP",
            "properties": {
                "destination": "75.870, 24.698"
            },
            "type": "teleporter",
            "width": 46,
            "x": 2978,
            "y": 2153
        }, {
            "height": 44,
            "name": "TP",
            "properties": {
                "destination": "21.578,74.615"
            },
            "type": "teleporter",
            "width": 46,
            "x": 3433,
            "y": 1774
        }],
        "opacity": 1,
        "type": "objectgroup",
        "visible": true,
        "width": 100,
        "x": 0,
        "y": 0
    }],
    "orientation": "orthogonal",
    "properties": {

    },
    "tileheight": 64,
    "tilesets": [{
        "firstgid": 1,
        "image": "../img/grits_master.png",
        "imageheight": 2048,
        "imagewidth": 2048,
        "margin": 0,
        "name": "grits_master",
        "properties": {

        },
        "spacing": 0,
        "tileheight": 64,
        "tilewidth": 64
    }],
    "tilewidth": 64,
    "version": 1,
    "width": 100
}