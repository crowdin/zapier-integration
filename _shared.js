const crowdin = require('@crowdin/crowdin-api-client').default;

const handleWebhook = async (z, bundle) => {
    if (bundle.cleanedRequest.events) {
        return bundle.cleanedRequest.events;
    } else {
        return [bundle.cleanedRequest];
    }
};

const subscribeToCrowdin = async (z, bundle, event) => {
    const { webhooksApi } = getCrowdinConnection(z, bundle);

    return (await webhooksApi.addWebhook(bundle.inputData.project_id, {
        url: bundle.targetUrl,
        name: `Zapier: ${event}`,
        events: [event],
        requestType: 'POST',
        batchingEnabled: false,
    })).data
}

const performUnsubscribe = async (z, bundle) => {
    const { webhooksApi } = getCrowdinConnection(z, bundle);

    return (await webhooksApi.deleteWebhook(bundle.inputData.project_id, bundle.subscribeData.id)).data
}

const projectInputField = {
    key: 'project_id',
    type: 'integer',
    label: 'Crowdin Project',
    dynamic: 'list_projects.id.name',
    required: true,
    list: false,
    altersDynamicFields: false,
}

const workflowInputField = {
    key: 'workflow_id',
    type: 'integer',
    label: 'Workflow',
    dynamic: 'list_workflows.id.title',
    required: true,
    list: false,
    altersDynamicFields: false,
}

const vendorInputField = {
    key: 'vendor_id',
    type: 'integer',
    label: 'Vendor',
    dynamic: 'list_vendors.id.name',
    required: true,
    list: false,
    altersDynamicFields: false,
}

const mtInputField = {
    key: 'mt_id',
    type: 'integer',
    label: 'Machine Translation Engine',
    dynamic: 'list_mts.id.name',
    required: true,
    list: false,
    altersDynamicFields: false,
}

const projectWorkflowStepField = {
    key: 'workflow_step_id',
    type: 'integer',
    label: 'Workflow Step',
    dynamic: 'list_project_workflow_steps.id.title',
    required: true,
    list: false,
    altersDynamicFields: false,
}

const projectMembersField = {
    key: 'project_member',
    type: 'integer',
    label: 'Project Member',
    dynamic: 'list_project_members.id.username',
    required: true,
    list: false,
    altersDynamicFields: false,
}

const directoriesInputField = {
    key: 'directory_id',
    type: 'integer',
    label: 'Directory',
    dynamic: 'list_project_directories.id.name',
    required: true,
    list: false,
    altersDynamicFields: false,
}

const filesInputField = {
    key: 'file_id',
    type: 'integer',
    label: 'File',
    dynamic: 'list_project_files.id.path',
    required: true,
    list: false,
    altersDynamicFields: false,
}

const labelsInputField = {
    key: 'label_id',
    type: 'integer',
    label: 'Label',
    dynamic: 'list_project_labels.id.path',
    required: true,
    list: false,
    altersDynamicFields: false,
}

const languageInputField = {
    key: 'language_id',
    type: 'string',
    label: 'Language',
    dynamic: 'list_languages.id.name',
    required: true,
    list: false,
    altersDynamicFields: false,
}

const issueTypeField = {
    key: 'issue_type',
    type: 'string',
    label: 'Issue Type',
    required: false,
    choices: [
        { value: 'general_question', label: 'General question', sample: 'general_question' },
        { value: 'translation_mistake', label: 'Mistake in translation', sample: 'translation_mistake' },
        { value: 'context_request', label: 'Request for context', sample: 'context_request' },
        { value: 'source_mistake', label: 'Mistake in a source string', sample: 'source_mistake' }
    ],
    altersDynamicFields: false,
}

const issueStatusField = {
    key: 'issue_status',
    type: 'string',
    label: 'Issue Status',
    required: false,
    choices: [
        { value: 'resolved', label: 'Resolved', sample: 'resolved' },
        { value: 'unresolved', label: 'Open', sample: 'unresolved' }
    ],
    altersDynamicFields: false,
}

const commentTypeField = {
    key: 'type',
    type: 'string',
    label: 'Comment Type',
    required: false,
    choices: [
        { value: 'comment', label: 'Regular comment', sample: 'comment' },
        { value: 'issue', label: 'Issue', sample: 'issue' }
    ],
    altersDynamicFields: false,
}

const getCrowdinConnection = (z, bundle) => {
    return new crowdin({
        token: bundle.authData.access_token,
        organization: bundle.authData.domain
    }, {
        retryConfig: {
            retries: 2,
            waitInterval: 100,
            conditions: [{
                test(error) {
                    if (error.error && error.error.code == 401) {
                        throw new z.errors.RefreshAuthError();
                    }
                }
            }]
        }
    })
}

module.exports = {
    handleWebhook,
    subscribeToCrowdin,
    performUnsubscribe,
    getCrowdinConnection,
    languageInputField,
    projectInputField,
    directoriesInputField,
    filesInputField,
    commentTypeField,
    issueStatusField,
    issueTypeField,
    workflowInputField,
    labelsInputField,
    projectWorkflowStepField,
    projectMembersField,
    vendorInputField,
    mtInputField
};
