const { getCrowdinConnection } = require('./../_shared');

const performSearchProject = async (z, bundle, event) => {
    const { projectsGroupsApi } = getCrowdinConnection(z, bundle);

    const project = (await projectsGroupsApi.getProject(bundle.inputData.project_id)).data

    return [{
        event: event,
        project: project.identifier,
        project_id: project.id,
        language: project.targetLanguageIds[0]
    }]
}

module.exports = {
    performSearchProject
};
