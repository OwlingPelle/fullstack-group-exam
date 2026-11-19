export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: "admin";
}

export interface Personnel {
  id: string;
  name: string;
  email: string;
  position: string;
  phone: string;
  status: "Active" | "Inactive";
}

export interface AccountRecord {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Personnel" | "Customer";
  status: "Active" | "Inactive";
}

export const demoCustomerProfile: AccountRecord = {
  id: "customer-001",
  name: "Jordan Lee",
  email: "jordan@example.com",
  role: "Customer",
  status: "Active",
};

export const demoAdminProfile: AdminProfile = {
  id: "admin-001",
  name: "Alex Morgan",
  email: "alex@starscantina.example",
  role: "admin",
};

export const demoPersonnel: Personnel[] = [
  {
    id: "staff-001",
    name: "Jamie Rivera",
    email: "jamie@starscantina.example",
    position: "Kitchen lead",
    phone: "+46 70 123 45 67",
    status: "Active",
  },
  {
    id: "staff-002",
    name: "Sam Chen",
    email: "sam@starscantina.example",
    position: "Server",
    phone: "+46 70 234 56 78",
    status: "Active",
  },
  {
    id: "staff-003",
    name: "Taylor Noor",
    email: "taylor@starscantina.example",
    position: "Barista",
    phone: "+46 70 345 67 89",
    status: "Inactive",
  },
];

export const demoAccounts: AccountRecord[] = [
  {
    id: demoAdminProfile.id,
    name: demoAdminProfile.name,
    email: demoAdminProfile.email,
    role: "Admin",
    status: "Active",
  },
  ...demoPersonnel.map((person) => ({
    id: person.id,
    name: person.name,
    email: person.email,
    role: "Personnel" as const,
    status: person.status,
  })),
  demoCustomerProfile,
  {
    id: "customer-002",
    name: "Casey Patel",
    email: "casey@example.com",
    role: "Customer",
    status: "Active",
  },
];

