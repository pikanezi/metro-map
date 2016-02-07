var fs = require("fs");
var path = require("path");
var csv = require("csv");
var mkdirp = require("mkdirp");
var _ = require("lodash");

var config = {
    "geojson": "data/geo/stations.geojson",
    "metroLinesPath": "data/metro-lines",
    "stops": "stops.txt",
    "distFolder": "data/dist",
    "linesFinal": "data/dist/lines.json"
};

/**
 *
 * @param {RatpFeatureCollection} features
 */
var transformRatpData = function (features) {
    var lines = {
        "type": "FeatureCollection",
        "features": []
    };
    var files = fs.readdirSync(config.metroLinesPath);
    if (!files) {
        return;
    }
    var currentPath = config.metroLinesPath;
    var computeCsvFile = function (lineName, err, data) {
        var line = [];
        _.forEach(data, function (data, index) {
            if (index === 0) {
                return;
            }
            lines.features.push({
                "type": "Feature",
                "properties": {
                    "id": data[0],
                    "lineName": lineName,
                    "name": data[2],
                    "description": data[3],
                    "latitude": parseFloat(data[4]),
                    "longitude": parseFloat(data[5])
                },
                "geometry": {
                    "coordinates": [parseFloat(data[4]), parseFloat(data[5])],
                    "type": "Point"
                }
            });
        });
    };
    var index = 0;
    var computeFile = function (filename) {
        var stat = fs.lstatSync(path.join(currentPath, filename));
        var split = path.join(currentPath).split("_");
        var line = split[split.length - 1];
        if (stat.isDirectory() && filename[0] !== ".") {
            var oldPath = currentPath;
            currentPath = path.join(currentPath, filename);
            var subFiles = fs.readdirSync(currentPath);
            subFiles.forEach(computeFile);
            currentPath = oldPath;
            return;
        }
        if (filename === config.stops) {
            csv.parse(fs.readFileSync(path.join(currentPath, filename)), function (err, data) {
                computeCsvFile(line, err, data);
                if (++index === files.length) {
                    // Last iteration.
                    mkdirp(config.distFolder, function () {
                        fs.writeFile(config.linesFinal, JSON.stringify(lines));
                    });
                }
            });
        }
    };
    files.forEach(computeFile);
};


/**
 *
 */
var readRatpData = function () {
    fs.readFile(config.geojson, "utf8", function (err, data) {
        if (err) {
            throw err
        }
        transformRatpData(JSON.parse(data));
    });
};

readRatpData();