import { Router } from "express";
import { checkAvailability } from "./check.controller";

const router = Router()

router.get('/',checkAvailability)
export const CheckAvailabilityRoute = router