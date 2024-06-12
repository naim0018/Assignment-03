import { Router } from "express";
import { FacilityController } from "./facility.controller";
import { validationRequest } from "../../app/middleware/validateRequest";
import { FacilityValidation } from "./facility.validation";

const router = Router()

router.get('/',FacilityController.getAllFacility)
router.post('/',validationRequest(FacilityValidation.createFacilitySchema),FacilityController.createFacility)
router.put('/:id',validationRequest(FacilityValidation.updateFacilitySchema),FacilityController.updateFacility)
router.delete('/:id',validationRequest(FacilityValidation.updateFacilitySchema),FacilityController.deleteFacility)

export const FacilityRoute = router