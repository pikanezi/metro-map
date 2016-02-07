/*
 * This file must not be included in the build system
 * It is used as a placeholder for type documentation
 * and auto completion for IntelliJ/WebStorm
 */
throw new Error("`documentation.js` must not to be bundled");

/**
 * An RATP point.
 * @typedef RatpPoint
 * @type Object
 * @property {String} type
 * @property {Array<Number>} coordinates
 * @property {RatpProperty} properties
 */
var RatpPoint = {"type": "", "coordinates": [], "properties": {}};

/**
 * An RATP property.
 * @typedef RatpProperty
 * @type Object
 * @property {String} departement
 * @property {String} code_postal
 * @property {String} stop_desc
 * @property {String} stop_name
 * @property {Number} stop_id
 * @property {Number} stop_lat
 * @property {Number} stop_lon
 */
var RatpProperty = {"departement": "", "code_postal": "", "stop_desc": "", "stop_name": "", "stop_id": 0, "stop_lat": 0, "stop_lon": 0};

/**
 * An RATP feature.
 * @typedef RatpFeature
 * @type Object
 * @property {String} type
 * @property {RatpPoint} geometry
 */
var RatpFeature = {"type": "", "geometry": {}};

/**
 * An RATP feature collection.
 * @typedef RatpFeatureCollection
 * @type Object
 * @property {String} type
 * @property {Array<RatpFeature>} features
 */
var RatpFeatureCollection = {"type": "", "features": []};