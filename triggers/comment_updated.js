const { handleWebhook, subscribeToCrowdin, performUnsubscribe, projectInputField } = require('../_shared')

const sampleIssue = {
  "event": "stringComment.updated",
  "stringComment": {
    "text": "Please provide more details on where the text will be used",
    "user": {
      "id": "1",
      "userName": "john_smith",
      "fullName": "John Smith",
      "avatarUrl": ""
    },
    "string": {
      "id": "2814",
      "project": {
        "id": "220",
        "userId": "1",
        "sourceLanguageId": "en",
        "targetLanguageIds": [
          "uk",
          "pl"
        ],
        "identifier": "aecf449472b669351cce576fc23aabd6",
        "name": "Project Name",
        "logo": "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAGm0lEQVR4nO3cWVCVdRjH8R+HTQQR93BJo1Jz1MrRSS21JDUNRWUxMabVpvXcNuNdl100U2qNuQ+KIiCCCIqYoSPkbiippCKiuBDKvp6FLmzG8Pxf1vO858D7+1z6vA7PMN85Oud\/\/scj0rymBUROZnL1AtQ7MSwSwbBIBMMiEQyLRDAsEsGwSATDIhEMi0QwLBLBsEgEwyIRDItEMCwSwbBIBMMiEQyLRDAsEsGwSATDIhEMi0QwLBLBsEgEwyIRDItEMCwSwbBIBMMiEQyLRDAsEsGwSATDIhEMi0QwLBLBsEgEwyIRDItEMCwSwbBIBMMiEQyLRDAsEsGwSATDIhEMi0QwLBLBsEiEl6sXkLThu2+Vfx6Xmom8C5fEfu7bM6Yh8p25ytmjyip8v3knqmpqxX6+O+ArlpNNmzQBy+e\/pZzV1tXjx7g9vT4qgGE51fiQ0fhg6SKYTB4Os8amZqyPT0bZwwoXbKY\/huUko4KH4fP3lsPLy9NhZrXa8OuefSguveeCzVyDYTnBkIFB+Ob9KPTx9XGY2e0t2L4vA1duFOu\/mAsxrG7q598X5tgVCAzwV84TDx7B2YIrOm\/legyrG3x9vGGOjcaQgUHKecaxXOScPq\/zVu6BYXWRyeSBL1ZGYFTwMOX8+Nk\/kX70hM5buQ+G1UUfRyzG+JDRytn5y4XYfSBL543cC8PqguiFoZg68SXlrPBmCbYk70dLi85LuRmG1UkL3piOudOnKmcld+\/jl13JsNnsOm\/lfhhWJ0x\/eSKWzZujnJU9rMC6nUloarbovJV7YlgdNPHFEMSGL1TOqmpq8VNcAmrq6nXeyn0xrA4YMyIYn0Uvhaen46+rvqERa3ck4mFltQs2c18Mqx1DBw3A16si4ePj7TCzWKz4eddelD74xwWbuTeG1YbAAH+YY1cgwL+vw8xms2NTUhpulNxxwWbuj2Fp6OPrA3NsNAYP6K+cx6cfwsXC6zpv1XMwLAVPTxO+jInAyGeGKuf7so+JflCwN2BYCp9ELsHYMc8qZ0f+OIOsEyd13qjnYVhPWRk2H1MmjFPOTuYXIPnQUZ036pkY1v8smj0Tc6a9qpwVXCtCXGqmzhv1XAzrP69PmYwlobOUs6LbpdiQkAK73eAHgJ3AsABMHvcCYsIWKGd3y8qxbmcSrFabzlv1bIYPK2TUCKyOCle+q15ZXYO1OxLR0Njkgs16NkOHFTxkEL6KiYC3t\/p6pa+PDzwVN26ofYYNKyiwH8yx0fDv66f5jF8fX3waFa68zkVtM2RY\/n5+MMdGY0D\/wHaffW7kcISHztZhq97FkGEtmTsLw4cO7vDz82a+pvkxZFIzZFiq\/1MVl95D0e1S5fMmkwc+Wh7W5j+b1Johw3ra5es38cO2XdiUtB919Q3KZ\/r3C8CHy97VebOey\/BhncwvwPr4JFgsVlRUVSMu7aDms5PGPo9Qjc+7U2uGDutw7ilsT8lo9Y56\/tVr+P3UOc2\/s2zem5qfeqAnDBmW3d6CPZlHkHI4RzlPzjqKkrv3lTMvL0+sjgrXfO+LHjNkWBk5uW2+KtlsdmxMTNV8x33Y4IGICZsvtV6vYMiwKqrbv\/hQXlGF+HTt28wzXpmkeWmVDBpWR50tuIIT5\/I156sWL8CgoPbfZDUihtWOhMxszVs4PPLRxrDaYbXasDExFc0aN5x55KPGsDrgQfkjJGRma8555OOIYXVQ3oVLOH3xL+WMRz6OGFYn7Nh\/CA\/KHylnPPJpjWF1gsVixaakNFgsVuWcRz5PMKxOunO\/DMlZ2lfAeOTzGMPqgmNnLuD85ULljEc+jzGsLopLzUR5RZVyxiMfhtVljU3N2JyUpnktzOhHPgyrG4pL7yHtt+OacyMf+TCsbsrOO41Lf99Qzox85MOwnGBbygFUVtcoZ0Y98mFYTlDf0IgtyemaX8NtxCMfhuUk127dRkZOrnJmxCMfhuVEmcfzcLXolnJmtCMfhuVkW\/emo7q2Tjkz0pEPw3Ky6to6bN2brvldWkY58mFYAq4W3cLhXPX3lBrlyMcj0ryGX1NHTsdXLBLBsEgEwyIRDItEMCwSwbBIBMMiEQyLRDAsEsGwSATDIhEMi0QwLBLBsEgEwyIRDItEMCwSwbBIBMMiEQyLRDAsEsGwSATDIhEMi0QwLBLBsEgEwyIRDItEMCwSwbBIBMMiEQyLRDAsEsGwSATDIhEMi0QwLBLBsEgEwyIRDItEMCwSwbBIBMMiEQyLRDAsEsGwSMS\/\/tClrE3peLcAAAAASUVORK5CYII=",
        "createdAt": "2022-04-20T11:05:24+00:00",
        "updatedAt": "2022-04-21T11:07:29+00:00",
        "lastActivity": "2022-04-21T11:07:29+00:00",
        "description": "Project Description",
        "url": "https:\/\/example.crowdin.com\/u\/projects\/220",
        "isExternal": false,
        "externalType": null,
        "workflowId": "1",
        "hasCrowdsourcing": true
      },
      "fileId": "48",
      "file": {
        "id": "44",
        "projectId": "220",
        "branchId": "34",
        "directoryId": "4",
        "name": "umbrella_app.xliff",
        "title": "source_app_info",
        "type": "xliff",
        "path": "\/directory1\/directory2\/filename.extension",
        "status": "active"
      },
      "branchId": "12",
      "directoryId": "13",
      "identifier": "name",
      "text": "Not all videos are shown to users. See more",
      "type": "text",
      "context": "shown on main page",
      "maxLength": "35",
      "isHidden": false,
      "isDuplicate": true,
      "masterStringId": "1",
      "revision": "1",
      "hasPlurals": false,
      "isIcu": false,
      "labelIds": [
        3,
        8
      ],
      "url": "https:\/\/example.crowdin.com\/translate\/aecf449472b669351cce576fc23aabd6\/1\/en-uk\/78#1",
      "createdAt": "2022-04-20T12:43:57+00:00",
      "updatedAt": "2022-04-20T13:24:01+00:00"
    },
    "language": {
      "id": "es",
      "name": "Spanish",
      "editorCode": "es",
      "twoLettersCode": "es",
      "threeLettersCode": "spa",
      "locale": "es-ES",
      "androidCode": "es-rES",
      "osxCode": "es.lproj",
      "osxLocale": "es",
      "textDirection": "ltr",
      "dialectOf": null
    },
    "type": "issue",
    "issueType": "source_mistake",
    "issueStatus": "unresolved",
    "resolver": {
      "id": "1",
      "userName": "john_smith",
      "fullName": "John Smith",
      "avatarUrl": ""
    },
    "resolvedAt": "2019-09-20T11:05:24+00:00",
    "createdAt": "2019-09-20T11:05:24+00:00"
  }
};

module.exports = {
  operation: {
    perform: handleWebhook,
    inputFields: [projectInputField],
    type: 'hook',
    performSubscribe: async (z, bundle) => { return await subscribeToCrowdin(z, bundle, 'stringComment.updated') },
    performUnsubscribe: async (z, bundle) => { return await performUnsubscribe(z, bundle) },
    performList: async (z, bundle) => {
      return [sampleIssue];
    },
    sample: sampleIssue
  },
  key: 'comment_updated',
  noun: 'Comment',
  display: {
    label: 'Comment/Issue Updated',
    description: 'Triggers when a user updates a comment or an issue.',
    hidden: false,
    important: false,
  }
}