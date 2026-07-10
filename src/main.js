import './theme/tokens.css';
import './theme/base.css';
import './theme/layout.css';

import { createApplication } from './app/createApplication.js';
import { registerServiceWorker } from './infrastructure/pwa/registerServiceWorker.js';

const root = document.querySelector('#app');
const application = createApplication({ root });

application.start();
registerServiceWorker(application.logger);
