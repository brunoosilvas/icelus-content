import 'module-alias/register';
import 'reflect-metadata';

import { Application } from '@env/application';
import { Ports } from '@env/ports';

const application:Application = new Application();
application.bootstrap()
  .then(() => {
    application.run(Ports.http, false);
  })
  .catch(error => {
    application.run(Ports.http, true);
  });
