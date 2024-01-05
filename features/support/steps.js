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

Given(
  /^I set basic authentication credentials (.*) and (.*)$/,
  function (username, password) {
    spec.withAuth(username, password);
  },
);

Given(/^I set the accessToken in authorization header$/, function () {
  spec.withHeaders('Authorization', `Bearer ${this.accessToken}`);
});

Given(/^I set header (.*) to (.*)$/, function (key, value) {
  spec.withHeaders(key, value);
});

Given(/^I set cookie (.*) to (.*)$/, function (key, value) {
  spec.withCookies(key, value);
});

Given(/I set body to/, function (body) {
  try {
    spec.withJson(JSON.parse(body));
  } catch (error) {
    spec.withBody(body);
  }
});

Given(/^I upload file at (.*)$/, function (filePath) {
  spec.withFile(filePath);
});

Given(/^I set multi-part form param (.*) to (.*)$/, function (key, value) {
  spec.withMultiPartFormData(key, value);
});

Given(/I set form-data to/, function (form) {
  spec.withForm(form);
});

Given(
  /^I upload file named (.*) for form param (.*)$/,
  function (filename, key) {
    spec.withMultiPartFormData(
      key,
      fs.readFileSync(`features/support/file-uploads/${filename}`),
      {
        filename,
      },
    );
  },
);

Given(/I set inspection/, function (body) {
  spec.inspect();
});

Given(/I login as user (.*)/, async function (login) {
  const customerId = +login.split('-')[1].charAt(0);
  let subdomain = customerId === 1 ? 'oasis' : 'momivf';

  const dto = {
    login,
    password: 'secret',
    subdomain,
  };

  await pactum
    .spec()
    .post('/auth/token')
    .withBody(dto)
    .expect((ctx) => {
      this.accessToken = ctx.res.json['accessToken'];
    });
});

Given(/I want a serialized scenario for (.*)/, function (body) {
  spec.end();
  spec = pactum.spec();
});

Given(/I want to make further assertions for (.*)/, function (body) {
  spec.end();
  spec = pactum.spec();
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

Then(/^I expect response header (.*) should be (.*)$/, function (key, value) {
  spec.response().should.have.header(key, value);
});

Then(/^I expect response header (.*) should have (.*)$/, function (key, value) {
  spec.response().should.have.headerContains(key, value);
});

Then(/^I expect response cookie (.*) should be (.*)$/, function (key, value) {
  spec.response().should.have.cookies(key, value);
});

Then(/^I expect response should have a json$/, function (json) {
  spec.response().should.have.json(JSON.parse(json));
});

Then(/^I expect response should have a json at (.*)$/, function (path, value) {
  spec.response().should.have.json(path, JSON.parse(value));
});

Then(/^I expect response should have a json like$/, function (json) {
  spec.response().should.have.jsonLike(JSON.parse(json));
});

Then(/^I expect response should have a json match$/, function (json) {
  spec.response().should.have.jsonMatch(like(JSON.parse(json)));
});

Then(
  /^I expect response should have a json like at (.*)$/,
  function (path, value) {
    spec.response().should.have.jsonLike(path, JSON.parse(value));
  },
);

Then(
  /^I expect response should have a json match at (.*)$/,
  function (path, value) {
    spec.response().should.have.jsonMatch(path, like(JSON.parse(value)));
  },
);

Then(/^I expect response should have a json schema$/, function (json) {
  spec.response().should.have.jsonSchema(JSON.parse(json));
});

Then(
  /^I expect response should have a json schema at (.*)$/,
  function (path, value) {
    spec.response().should.have.jsonSchema(path, JSON.parse(value));
  },
);

Then(/^I expect response should have a body$/, function (body) {
  spec.response().should.have.body(body);
});

Then(/^I expect response body should contain (.*)$/, function (value) {
  spec.response().should.have.bodyContains(value);
});

Then('I expect response should have {string}', function (handler) {
  spec.response().should.have._(handler);
});

Then('I expect response time should be less than {int} ms', function (ms) {
  spec.response().should.have.responseTimeLessThan(ms);
});

Then(/^I store response at (.*) as (.*)$/, function (path, name) {
  spec.stores(name, path);
});

Then(
  /^I expect the size of collections stored at keys (.*) and (.*) to be equal$/,
  function (key1, key2) {
    const collection1 = pactum.parse(`$S{${key1}}`);
    const collection2 = pactum.parse(`$S{${key2}}`);
    if (collection1.length !== collection2.length) {
      throw new Error(
        `size of collections doesn't match: ${collection1.length}, ${collection2.length}`,
      );
    }
  },
);

After(() => {
  spec.end();
});
