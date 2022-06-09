require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
var { bundle } = require('../_bundle')
zapier.tools.env.inject();

describe('List - directories', () => {
  it('should return list of directories of the project', async () => {
    bundle.inputData = {
      project_id: process.env.TEST_PROJECT_ID
    };

    const results = await appTester(App.resources.directory.list.operation.perform, bundle);

    results.should.be.an.Array();
  });
});
