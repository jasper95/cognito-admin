import { UserType, AdminGetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import * as yup from 'yup';
import { fieldIsRequired } from '@/shared/utils/form-utils';

export type User = Omit<UserType, 'UserCreateDate' | 'UserLastModifiedDate'> & {
  id: string;
  UserCreateDate: string;
  UserLastModifiedDate: string;
};
  
export type UserDetails = Omit<AdminGetUserResponse, 'UserCreateDate' | 'UserLastModifiedDate'> & {
  UserCreateDate: string;
  UserLastModifiedDate: string;
};

export const addToGroupSchema = yup.object({
  group: yup.string().required(fieldIsRequired),
});

export type IAddToGroupSchema = yup.InferType<typeof addToGroupSchema>;
