require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
var { bundle } = require('../_bundle')

describe('List - languages', () => {
  zapier.tools.env.inject();

  it('should return an array of objects', async () => {
    const results = await appTester(
      App.triggers['list_languages'].operation.perform,
      bundle
    );

    results.should.be.an.Array();
  });
});
