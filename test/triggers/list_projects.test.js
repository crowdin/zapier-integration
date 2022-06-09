require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
var { bundle } = require('../_bundle')

describe('Trigger - list_projects', () => {
  zapier.tools.env.inject();

  it('should get an array', async () => {
    const results = await appTester(
      App.triggers['list_projects'].operation.perform,
      bundle
    );

    results.should.be.an.Array();
  });
});
