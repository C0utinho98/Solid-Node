import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentRepository = appointmentsRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error("This appointment is alread booked");
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
