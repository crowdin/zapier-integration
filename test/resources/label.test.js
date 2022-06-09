require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
var { bundle } = require('../_bundle')
zapier.tools.env.inject();

describe('List - labels', () => {
  it('should return the list of all labels in project', async () => {
    bundle.inputData = {
      project_id: process.env.TEST_PROJECT_ID
    };

    const results = await appTester(App.resources.label.list.operation.perform, bundle);

    results.should.be.an.Array();
  });
});
