import { Speciality } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpeciality = async (payload: Speciality): Promise<Speciality> => {
  const speciality = await prisma.speciality.create({
    data: payload,
  });
  return speciality;
};

const getSpecialities = async () => {
  const result = await prisma.speciality.findMany();
  return result;
};

const deleteSpeciality = async (id: string) => {
  const result = await prisma.speciality.delete({
    where: {
      id,
    },
  });

  return result
};

const updateSpeciality = async(payload : Speciality, id : string) => {
    const result = await prisma.speciality.update({
        where : {
            id : id
        },
        data : payload
    })
    return result
}

export const specialityService = {
  createSpeciality,
  getSpecialities,
  deleteSpeciality,
  updateSpeciality
};
