
import { PatientController } from './patient.controller';

describe('Patient Controller Test', () => {

    let controller: PatientController;

    beforeEach(() => {
        controller = new PatientController();
    });

    it('defined get method', () => {
        if (!controller.get) {
            throw new Error('no get method defined');
        }
    });
});