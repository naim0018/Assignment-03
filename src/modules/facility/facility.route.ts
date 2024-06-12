import { Router } from "express";
import { FacilityController } from "./facility.controller";
import { validationRequest } from "../../app/middleware/validateRequest";
import { FacilityValidation } from "./facility.validation";
import auth from "../../app/middleware/auth";
import { UserRole } from "../auth/auth.utils";

const router = Router()
//get all facility
router.get('/',FacilityController.getAllFacility)
//create facility
router.post('/',auth(UserRole.admin),validationRequest(FacilityValidation.createFacilitySchema),FacilityController.createFacility)
//update facility
router.put('/:id',auth(UserRole.admin),validationRequest(FacilityValidation.updateFacilitySchema),FacilityController.updateFacility)
//delete facility
router.delete('/:id',auth(UserRole.admin),validationRequest(FacilityValidation.updateFacilitySchema),FacilityController.deleteFacility)

export const FacilityRoute = router