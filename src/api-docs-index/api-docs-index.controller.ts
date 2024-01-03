import { Controller, Get, Res } from '@nestjs/common';
// import { Public } from 'src/user/authentication/decorators/public.decorator';
import { SwaggerUIModules } from './swagger-ui-modules';
import { Response } from 'express';

@Controller('/api-docs-index')
export class ApiDocsIndexController {
  // @Public()
  @Get('')
  index(@Res() response: Response) {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>ARTis Module APIs</title>
      </head>
      <body>
        <h1>ARTis Module APIs</h1>
        <ul>
        ${SwaggerUIModules.map(
          (moduleName) =>
            `<li><a href='api-docs/${moduleName}' target='_blank'>${moduleName}</a></li>`,
        ).join('')}
        </ul>
      </body>
      </html>
    `;

    response.setHeader('Content-Type', 'text/html');
    response.send(htmlContent);
  }
}
