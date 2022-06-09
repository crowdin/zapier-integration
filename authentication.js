'use strict';

const crowdin = require('@crowdin/crowdin-api-client').default;

const baseOauthUrl = process.env.BASE_URL;
// To get your OAuth2 redirect URI, run `zapier describe` and update this variable.
// Will looke like 'https://zapier.com/dashboard/auth/oauth/return/App123CLIAPI/'
const redirectUri = 'https://zapier.com/dashboard/auth/oauth/return/CrowdinCLIAPI/';

const getAuthorizeURL = (z, bundle) => {
  let url = `${baseOauthUrl}/oauth/authorize`;

  const urlParts = [
    `client_id=${process.env.CLIENT_ID}`,
    `redirect_uri=${encodeURIComponent(bundle.inputData.redirect_uri)}`,
    'response_type=code',
  ];

  urlParts.push(`state=${bundle.inputData.state}`);

  const finalUrl = `${url}?${urlParts.join('&')}`;

  return finalUrl;
}

const getAccessToken = (z, bundle) => {
  let url = `${baseOauthUrl}/oauth/token`;

  const body = {
    code: bundle.inputData.code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri
  };

  const promise = z.request(url, {
    method: 'POST',
    body,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  });

  return promise.then((response) => {
    if (response.status !== 200) {
      throw new Error('Unable to fetch access token: ' + response.content);
    }

    const result = z.JSON.parse(response.content);
    const domainName = parseJwt(result.access_token).domain;

    return {
      access_token: result.access_token,
      refresh_token: result.refresh_token,
      domain: domainName,
      connectionLabel: (domainName ? `Crowdin Enterprise (org. ${domainName})` : 'crowdin.com')
    };
  });
};

const refreshAccessToken = (z, bundle) => {
  let url = `${baseOauthUrl}/oauth/token`;

  const body = {
    refresh_token: bundle.authData.refresh_token,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'refresh_token',
  };

  const promise = z.request(url, {
    method: 'POST',
    body,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  });

  return promise.then((response) => {
    if (response.status !== 200) {
      throw new Error('Unable to fetch access token: ' + response.content);
    }

    const result = z.JSON.parse(response.content);
    const domainName = parseJwt(result.access_token).domain;

    return {
      access_token: result.access_token,
      refresh_token: result.refresh_token,
      domain: domainName,
      connectionLabel: domainName ? `Crowdin Enterprise (org. ${domainName})` : 'crowdin.com'
    };
  });
};

function parseJwt(token) {
  const payload = Buffer.from(token.split(".")[1], "base64");
  return JSON.parse(payload);
}

// The test call Zapier makes to ensure an access token is valid
// UX TIP: Hit an endpoint that always returns data with valid credentials,
// like a /profile or /me endpoint. That way the success/failure is related to
// the token and not because the user didn't happen to have a recently created record.
const testAuth = (z, bundle) => {
  let domain = ''
  if (bundle.authData.domain) {
    domain = `${bundle.authData.domain}.`;
  }

  const options = {
    url: `https://${domain}api.crowdin.com/api/v2/user`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bundle.authData.access_token}`,
    }
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    if (results.code == 401) {  //we never received 401 in this callback :(
      throw new z.errors.RefreshAuthError();
    }

    return results;
  }).catch((e, b) => {
    z.console.log("Unable to check user. TODO: check response status ", e, b)
    throw new z.errors.RefreshAuthError();  //TODO: this is not right, we have to check the response header
  });
};

module.exports = {
  type: 'oauth2',
  connectionLabel: '{{bundle.authData.connectionLabel}}',
  oauth2Config: {
    authorizeUrl: getAuthorizeURL,
    getAccessToken,
    refreshAccessToken,
    autoRefresh: true,
    scope: 'project group mt vendor',
  },
  test: testAuth
};