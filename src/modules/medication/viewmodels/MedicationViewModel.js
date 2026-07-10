import { CrudViewModel } from '../../shared/viewmodels/CrudViewModel.js';
import {
  createMedicationApplication,
  validateMedicationApplication,
} from '../entities/MedicationApplication.js';

export class MedicationViewModel extends CrudViewModel {
  constructor({ repository, eventBus }) {
    super({
      repository,
      eventBus,
      entityName: 'medication',
      createEntity: createMedicationApplication,
      validateEntity: validateMedicationApplication,
    });
  }
}
