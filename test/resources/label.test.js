require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
var { bundle } = require('../_bundle')
zapier.tools.env.inject();

describe('List - labels', () => {
  it('should return the list of all labels in project #220', async () => {
    bundle.inputData = {
      project_id: 220
    };

    const results = await appTester(App.resources.label.list.operation.perform, bundle);

    results.should.be.an.Array();
  });
});
