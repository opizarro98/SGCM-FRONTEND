export interface AppointmentListDTO {
  id:string
  identification:string;
  patientname: string;
  date: string;
  hour: string;
  description: string;
  attended:boolean;
  reason:string
}