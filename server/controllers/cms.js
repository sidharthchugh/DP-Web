import Prismic from 'prismic-javascript';

const apiEndpoint = 'https://digitalpartners-web.prismic.io/api/v2';

// Entry point of the boilerplate, called at the end.
function fetchCmsData(req, res) {
 Prismic.getApi(apiEndpoint).then((api) => {
  return api.query(''); // An empty query will return all the documents
}).then((response) => {
   return res.status(200).json({cmsData: response.results[0].data});
}, (err) => {
  console.log('Error Fetching Cms: ', err);
});
}


// Start the boilerplate code

export default {
  fetchCmsData
};

