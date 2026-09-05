export type AppointmentRecord = {
  id: string;
  name: string;
  phone: string;
  email: string;
  treatment: string;
  date: string;
  message: string;
  createdAt: Date;
};

const appointmentsStore: AppointmentRecord[] = [];

export const db = {
  appointment: {
    create: async ({ data }: { data: Omit<AppointmentRecord, "id" | "createdAt"> }) => {
      const record: AppointmentRecord = {
        id: `appt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        ...data,
        createdAt: new Date(),
      };
      appointmentsStore.push(record);
      return record;
    },
    findMany: async () => [...appointmentsStore],
  },
};