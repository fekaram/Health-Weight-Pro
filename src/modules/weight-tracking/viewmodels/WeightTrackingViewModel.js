import { CrudViewModel } from '../../shared/viewmodels/CrudViewModel.js';
import { createWeightRecord, validateWeightRecord } from '../entities/WeightRecord.js';

export class WeightTrackingViewModel extends CrudViewModel {
  constructor({ repository, eventBus }) {
    super({
      repository,
      eventBus,
      entityName: 'weight-tracking',
      createEntity: createWeightRecord,
      validateEntity: validateWeightRecord,
    });
  }
}
