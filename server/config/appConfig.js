/*
 * Set ENV of your choice
 * Here you can add more app config
*/

function defaultExport() {}

defaultExport.ENV = process.env.NODE_ENV || 'development';

module.exports = defaultExport;
