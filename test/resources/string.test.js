require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
var { bundle } = require('../_bundle')
zapier.tools.env.inject();

describe('Find - strings', () => {
  it('should return one string', async () => {
    bundle.inputData = {
      project_id: process.env.TEST_PROJECT_ID,
      text: 'SGML'
    };

    const results = await appTester(App.resources.string.search.operation.perform, bundle);

    results.should.be.an.Array();
  });
});
