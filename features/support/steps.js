const pactum = require('pactum');
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require('@cucumber/cucumber');
const { like } = require('pactum-matchers');
const fs = require('fs');

// Set timeout for cucumberJS steps
const timeoutInMilliSeconds = 100000;
setDefaultTimeout(timeoutInMilliSeconds);

// Set timeout for pactum
pactum.request.setDefaultTimeout(timeoutInMilliSeconds);

let spec = pactum.spec();

Before(() => {
  spec = pactum.spec();
});

Given(/^I make a (.*) request to (.*)$/, function (method, endpoint) {
  spec[method.toLowerCase()](endpoint);
});

Given(/^I set path param (.*) to (.*)$/, function (key, value) {
  spec.withPathParams(key, value);
});

Given(/^I set query param (.*) to (.*)$/, function (key, value) {
  spec.withQueryParams(key, value);
});

Given(/^I set the accessToken in authorization header$/, function () {
  spec.withHeaders('Authorization', `Bearer ${this.accessToken}`);
});

Given(/I set body to/, function (body) {
  try {
    spec.withJson(JSON.parse(body));
  } catch (error) {
    spec.withBody(body);
  }
});

Given(/I login as user (.*)/, async function (login) {
  const dto = {
    login,
    password: 'secret',
  };

  await pactum
    .spec()
    .post('/api/auth/login')
    .withBody(dto)
    .expect((ctx) => {
      this.accessToken = ctx.res.json['accessToken'];
    });
});

When('I receive a response', { timeout: 20 * 1000 }, async function () {
  await spec.toss();
});

Then(
  /^I expect response to match a json snapshot (.*)$/,
  async function (name) {
    spec.response().should.have.jsonSnapshot(name);
  },
);

Then('I expect response should have a status {int}', function (code) {
  spec.response().should.have.status(code);
});

Then(/^I expect response should have a json like$/, function (json) {
  spec.response().should.have.jsonLike(JSON.parse(json));
});

Then(
  /^I expect response should have a json like at (.*)$/,
  function (path, value) {
    spec.response().should.have.jsonLike(path, JSON.parse(value));
  },
);

After(() => {
  spec.end();
});
