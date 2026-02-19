import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpeciality = async (payload: Specialty): Promise<Specialty> => {
  const speciality = await prisma.specialty.create({
    data: payload,
  });
  return speciality;
};

const getSpecialities = async () => {
  const result = await prisma.specialty.findMany();
  return result;
};

const deleteSpeciality = async (id: string) => {
  const result = await prisma.specialty.delete({
    where: {
      id,
    },
  });

  return result;
};

const updateSpeciality = async (payload: Specialty, id: string) => {
  const result = await prisma.specialty.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

export const specialityService = {
  createSpeciality,
  getSpecialities,
  deleteSpeciality,
  updateSpeciality,
};
