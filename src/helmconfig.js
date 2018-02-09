/*
 * Based on the template in Web Starter Kit : https://github.com/google/web-starter-kit/blob/master/app/index.html
 * To add to the config, add an object:
 * {
 *  type: 'link' | 'meta',
 *  sizes: 'widthxheight',
 *  rel: 'rel value'
 *  filename: <Name of your file'
 * }
 */

// Import all your needed files first (webpack will grab the url)

import favicon from './images/Favicon_Dp.png';
import fs from 'fs';
import path from 'path';
import {ENV} from '../server/config/appConfig';

let getAssets;

const appRoot = process.cwd();
if (ENV === 'production') {
   getAssets = JSON.parse(fs.readFileSync(path.join(appRoot) + '/prod-assets.json'));
} else {
   getAssets = JSON.parse(fs.readFileSync(path.join(appRoot) + '/dev-assets.json'));
}


const config = {
  link: [
    { rel: 'icon', href: favicon},
    { rel: 'stylesheet', href: getAssets.app.css }
  ],
  meta: [
    { charset: 'utf-8' },
    // Setting IE=edge tells Internet Explorer to use the latest engine to render the page and execute Javascript
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    {name: 'title', content: 'Digital Partners is a business matching platform. We find and connect technology providers, customers and strategic partners.'}, // Title tag should conatain 70 letters or less
    //  Meta descriptions are commonly used on search engine result pages to display preview snippets for a given page.
    { name: 'description', content: 'Discover strategic partnerships and business opportuniutes. Connect to leaders in the business world. Create partnerships. Grow your business.' }, // description tag should contain 160 letters or less
    // { name: 'Our mission', content: 'We see the changing world and aim to keep companies up to speed with the technology world. '},
    { name: 'keywords', content: 'Tech-ecosystem, Partners, Digital Partners'},
    // Mobile Safari introduced this tag to let web developers control the viewport's size and scale
    // The width property controls the size of the viewport, the initial-scale property controls
    // the zoom level when the page is first loaded
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
};

export default config;
