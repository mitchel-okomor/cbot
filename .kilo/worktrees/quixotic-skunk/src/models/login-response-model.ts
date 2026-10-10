export interface IAuthUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  deletedBy: string;
  updatedBy: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dob: string;
  bio: string;
  address: string;
  emailVerifiedAt: string;
  playerId: string;
  imageUrl: string;
  skipTour: boolean;
  isActive: boolean;
}
export interface ILoggedInUser {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dob: string;
  bio: string;
  address: string;
  emailVerifiedAt: string;
  playerId: string;
  imageUrl: string;
  skipTour: boolean;
  isActive: boolean;
}
