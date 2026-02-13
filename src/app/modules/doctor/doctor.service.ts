import { prisma } from "../../lib/prisma"

const getAllDoctor = async () => {
    const doctors = await prisma.doctor.findMany({
        include : {
            user : true,
            specialities : {
                include : {
                    speciality : {
                        select : {
                            title : true,
                            id : true
                        }
                    }
                }
            }
        }
    })

    return doctors
}

export const DoctorService = {
    getAllDoctor
}