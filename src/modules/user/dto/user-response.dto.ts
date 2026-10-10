import { Expose, Type } from 'class-transformer';
export class Supervisor {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  gender: string;

  @Expose()
  imageUrl: string;
}

export class Team {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  // @Expose()
  // @Type(() => Supervisor)
  // supervisor: Supervisor;
}
export class FetchUserResponse {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  position: string;

  @Expose()
  address: string;

  @Expose()
  imageUrl: string;

  @Expose()
  skipTour: boolean;

  @Expose()
  @Type(() => Team)
  team: Team;
}
