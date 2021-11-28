import { IDialogContentProps } from '@/shared/hocs/withDialog';
import { IAddToGroupSchema, ICreateUser } from '@/shared/models/user';
import { GroupListType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

export type IGroupPayload = IAddToGroupSchema & {
  currentGroups: GroupListType
};
export type IAddToGroupDialogProps = IDialogContentProps<IGroupPayload>;
export type ICreateUserDialogProps = IDialogContentProps<ICreateUser>;
