import { CrudViewModel } from '../../shared/viewmodels/CrudViewModel.js';
import {
  createBodyMeasurementRecord,
  validateBodyMeasurementRecord,
} from '../entities/BodyMeasurementRecord.js';

export class BodyMeasurementsViewModel extends CrudViewModel {
  constructor({ repository, eventBus }) {
    super({
      repository,
      eventBus,
      entityName: 'body-measurements',
      createEntity: createBodyMeasurementRecord,
      validateEntity: validateBodyMeasurementRecord,
    });
  }
}
