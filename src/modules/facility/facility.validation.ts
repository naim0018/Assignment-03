import { z } from 'zod';


const createFacilitySchema = z.object({
    name: z.string().nonempty("Name is Required"),
    description: z.string().nonempty("Description is Required"),
    pricePerHour: z.number().nonnegative("PricePerHour must be a positive number"),
    location: z.string().nonempty("Location is Required"),
});
const updateFacilitySchema = z.object({
    name: z.string().nonempty("Name is Required").optional(),
    description: z.string().nonempty("Description is Required").optional(),
    pricePerHour: z.number().nonnegative("PricePerHour must be a positive number").optional(),
    location: z.string().nonempty("Location is Required").optional(),
    isDeleted: z.boolean().optional(),

});
export const FacilityValidation = {
    createFacilitySchema,
    updateFacilitySchema,

}