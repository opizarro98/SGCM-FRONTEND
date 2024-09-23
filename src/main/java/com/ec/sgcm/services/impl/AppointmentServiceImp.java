package com.ec.sgcm.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ec.sgcm.model.Appointments;
import com.ec.sgcm.repository.AppointmentRepo;
import com.ec.sgcm.services.AppointmentService;

@Service
public class AppointmentServiceImp implements AppointmentService {

    @Autowired
    AppointmentRepo appointmentRepo;

    @Override
    public Appointments createAppointment(Appointments appointment) {
        if (appointment == null) {
            throw new IllegalArgumentException("La cita no puede ser nula.");
        }
        return appointmentRepo.save(appointment);
    }

    @Override
    public Appointments updateAppointment(Appointments appointment) {
        if (appointment == null || appointment.getId() == null) {
            throw new IllegalArgumentException("La cita o el ID de la cita no pueden ser nulos.");
        }

        Optional<Appointments> existingAppointmentOpt = appointmentRepo.findById(appointment.getId());
        if (existingAppointmentOpt.isPresent()) {
            Appointments existingAppointment = existingAppointmentOpt.get();
            existingAppointment.setDescription(appointment.getDescription());
            existingAppointment.setDate(appointment.getDate());
            existingAppointment.setHour(appointment.getHour());
            existingAppointment.setPerson(appointment.getPerson());
            return appointmentRepo.save(existingAppointment);
        } else {
            throw new IllegalArgumentException("No se encontró la cita con el ID proporcionado.");
        }
    }

    @Override
    public List<Appointments> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    @Override
    public Appointments getAppointmentById(Long id) {
        return appointmentRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró la cita con el ID: " + id));
    }

    @Override
    public void deleteAppointment(Long id) {
        if (!appointmentRepo.existsById(id)) {
            throw new IllegalArgumentException("No se encontró la cita con el ID: " + id);
        }
        appointmentRepo.deleteById(id);
    }
}
