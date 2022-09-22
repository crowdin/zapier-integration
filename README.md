[<p align='center'><img src='https://support.crowdin.com/assets/logos/crowdin-dark-symbol.png' data-canonical-src='https://support.crowdin.com/assets/logos/crowdin-dark-symbol.png' width='150' height='150' align='center'/></p>](https://crowdin.com)

# Crowdin Zapier integration

Connect Crowdin to hundreds of other apps with Zapier

Zapier lets you connect Crowdin to 4,000+ other web services. Automated connections called Zaps, set up in minutes with no coding, can automate your day-to-day tasks and build workflows between apps that otherwise wouldn't be possible.
Each Zap has one app as the Trigger, where your information comes from and which causes one or more Actions in other apps, where your data gets sent automatically.

<div align="center">

[**`Home`**](https://zapier.com/apps/crowdin/integrations) &nbsp;|&nbsp;
[**`Docs`**](https://store.crowdin.com/zapier) &nbsp;|&nbsp;
[**`Crowdin KB`**](https://support.crowdin.com/) &nbsp;|&nbsp;
[**`Crowdin Enterprise KB`**](https://support.crowdin.com/enterprise/overview/)

</div>
    
<div align="center">

<a href="https://zapier.com/apps/crowdin/integrations"><img src="https://img.shields.io/badge/dynamic/json?label=Zapier&amp;query=%24.version&amp;url=https%3A%2F%2Fraw.githubusercontent.com%2Fcrowdin%2Fzapier-integration%2Fmain%2Fpackage.json&amp;logo=zapier" alt="Zapier"></a>
<a href="https://github.com/crowdin/zapier-integration/actions/workflows/tests.yml"><img src="https://github.com/crowdin/zapier-integration/actions/workflows/tests.yml/badge.svg" alt="Tests"></a>
<a href="https://github.com/crowdin/zapier-integration/graphs/contributors"><img src="https://img.shields.io/github/contributors/crowdin/zapier-integration?cacheSeconds=10001" alt="GitHub contributors"></a>
<a href="https://github.com/crowdin/zapier-integration/blob/master/LICENSE"><img src="https://img.shields.io/github/license/crowdin/zapier-integration?cacheSeconds=3600" alt="License"></a>

</div>

## Getting started

### Integration

This integration contains the following triggers, actions, and searches:

- **Triggers**
    - New Directory
    - New Label
    - New Project
    - Project Language Translated
    - Project Language Approved
    - File Translated
    - File Approved
    - File Added
    - File Updated
    - File Reverted
    - File Deleted
    - Comment/Issue Added
    - Comment/Issue Restored
    - Comment/Issue Deleted
- **Actions**
    - Create Comment
    - Create Directory
    - Download Translated File
    - Create Label
    - Label String
    - Create Project
    - Translation Progress
    - Remove Label From String
    - Resolve Issue
    - Create String
    - Create Task
    - Translate via Machine Translation
    - Create or Update a File
    - Upload Screenshot
- **Searches**
    - Find Directory
    - Find File
    - Find Label
    - Find Project
    - Find Task
    - Find or Create Directory
    - Find or Create Label
    - Find or Create Project
    - Find or Creat String
    - Find or Create Task

### Getting Started with Zapier

Sign up for a free [Zapier](https://zapier.com/apps/crowdin/integrations) account, from there you can jump right in. To help you hit the ground running, here are some popular pre-made Zaps.

### How do I connect Crowdin to Zapier?

- Log in to your [Zapier account](https://zapier.com/sign-up) or create a new account. Navigate to "My Apps" from the top menu bar.
- Now click on "Connect a new account..." and search for "Crowdin"
- Use your credentials to connect your Crowdin account to Zapier.
- Once that's done you can start creating an automation!
- Use a pre-made Zap or create your own with the Zap Editor. Creating a Zap requires no coding knowledge and you'll be walked step-by-step through the setup.
- Need inspiration? See everything that's possible with [Crowdin and Zapier](https://zapier.com/apps/crowdin/integrations).

## Seeking Assistance

If you find any problems or would like to suggest a feature, please read the [How can I contribute](/CONTRIBUTING.md#how-can-i-contribute) section in our contributing guidelines.

Need help working with Crowdin Zapier Integration or have any questions? [Contact](https://crowdin.com/contacts) Customer Success Service.

## Contributing

If you want to contribute please read the [Contributing](/CONTRIBUTING.md) guidelines.

It's very easy to get started with these 3 steps:
 - Clone this project to your local machine.
 - Open terminal and cd into the cloned folder, usually `cd zapier-integration`.
 - Run `npm install` to install dependencies.
 - `cp .env.example .env` and put your Crowdin OAuth credentials and Personal API Token for tests.
 - run `zapier test` to run local tests and see if you are ready to proceed with development.
 - run `zapier push` to push your local changes to your own Zapier account.
 - make sure to increase `package.json` version when delivering your improvements.

You might want to check a `z` object to see it's methods. `z.console.log` stands for `console.log` for example.

Note that you will need additional a `zapier` CLI installed.


## License

<pre>
The Crowdin Zapier Integration is licensed under the MIT License.
See the LICENSE file distributed with this work for additional
information regarding copyright ownership.

Except as contained in the LICENSE file, the name(s) of the above copyright
holders shall not be used in advertising or otherwise to promote the sale,
use or other dealings in this Software without prior written authorization.
</pre>
