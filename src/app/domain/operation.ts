
export class Executive {
  email: string;
  firstname: string;
  lastname: string;
}

export class Vocabulary {
  projectID: string;
  projectAcronym: string;
  instituteId: string;
  instituteName: string;
}

export class ContactUsMail {
    name: string;
    surname: string;
    email: string;
    subject: string;
    message: string;
}

export class Delegate {
  email: string;
  firstname: string;
  lastname: string;
  hidden: boolean;
}

export class Institute {
  id: string;
  name: string;
  organizationId: string;
  director: PersonOfInterest;
  accountingRegistration: PersonOfInterest;
  accountingPayment: PersonOfInterest;
  accountingDirector: PersonOfInterest;
  diaugeia: PersonOfInterest;
  suppliesOffice: PersonOfInterest;
  travelManager: PersonOfInterest;
  diataktis: PersonOfInterest;
}

export class Organization {
  id: string;
  name: string;
  poy: PersonOfInterest;
  director: PersonOfInterest;
  viceDirector: PersonOfInterest;
  inspectionTeam: PersonOfInterest[];
  dioikitikoSumvoulio: PersonOfInterest;
}

export class PersonOfInterest {
  email: string;
  firstname: string;
  lastname: string;
  delegates: Delegate[];
}

export class Project {
  id: string;
  name: string;
  acronym: string;
  instituteId: string;
  parentProject: string;
  scientificCoordinator: PersonOfInterest;
  operator: PersonOfInterest[];
  startDate: string;
  endDate: string;
  totalCost: string;
  scientificCoordinatorAsDiataktis: boolean;
}

export class User {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    firstnameLatin: string;
    lastnameLatin: string;
    receiveEmails: string;
    immediateEmails: string;
}


