import { UserType, AdminGetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import * as yup from 'yup';
import { fieldIsInvalid, fieldIsRequired } from '@/shared/utils/form-utils';

export const createUserSchema = yup.object({
  email: yup.string().required(fieldIsRequired).email(fieldIsInvalid),
  password: yup
    .string()
    .min(6, 'Must have at least 6 characters')
    .matches(/[a-z]/, 'Must have at least one lowercase character')
    .matches(/[A-Z]/, 'Must have at least one uppercase character')
    .matches(/[0-9]/, 'Must have at least one digit')
    .matches(/[\s!"#$'()*+,-.:;<=>?@[\]^_`{|}~]/, 'Must have at least 1 number or special character (@,!,#, etc).')
    .required(fieldIsRequired),
})

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
export type ICreateUser = yup.InferType<typeof createUserSchema>