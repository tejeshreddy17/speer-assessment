const { spec, request, settings, handler } = require('pactum');
const { Before, BeforeAll } = require('@cucumber/cucumber');
const { DateTime } = require('luxon');

BeforeAll(async () => {
  request.setBaseUrl('http://localhost:6000');

  handler.addDataFuncHandler('GetToday', () => {
    return DateTime.now().toISODate();
  });

  handler.addDataFuncHandler('GetTomorrow', () => {
    return DateTime.now().plus({ days: 1 }).toISODate();
  });

  handler.addDataFuncHandler('GetFiveMinutesAgo', () => {
    return DateTime.now()
      .setZone('Asia/Calcutta')
      .minus({ minutes: 5 })
      .toLocaleString(DateTime.TIME_24_SIMPLE);
  });

  handler.addDataFuncHandler('GetFiveMinutesLater', () => {
    return DateTime.now()
      .setZone('Asia/Calcutta')
      .plus({ minutes: 5 })
      .toLocaleString(DateTime.TIME_24_SIMPLE);
  });
});

Before(async function () {
  settings.setReporterAutoRun(false);

  const dto = {
    userName: 'Johndoe17',
    password: 'secret',
  };

  await spec()
    .post('/api/auth/login')
    .withBody(dto)
    .expect((ctx) => {
      this.accessToken = ctx.res.json['accessToken'];
    });
});
