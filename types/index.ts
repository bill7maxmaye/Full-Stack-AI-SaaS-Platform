export type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  photo: string | null;
};

export type UpdateUserParams = {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  photo: string | null;
};

export type UpdateImageTransformation = {
  image: {   
    _id: string;
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureURL: string;
    transactionURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string;
  };
  userId: string;
  path: string;
};

export type UpdateImageParams = {
  image: {   
    _id: string;
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureURL: string;
    transactionURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string;
  };
  userId: string;
  path: string;
};

export type Transformation = {
  restore?: boolean;
  fillBackground?: boolean;
  remove?: {
    prompt: string;
    removeShadow?: string;
    multiple?: boolean;
  };
  recolor?: {
    prompt: string;
    to: string;
    multiple?: boolean;
  };
  removeBackground?: boolean;
};

export type CheckoutTransactionParams = {
  amount: number;
  credits: number;
  plan: string;
  buyerId: string;
};

export type CreateTransactionParams = {
  stripeId: string;
  amount: number;
  credits: number;
  plan: string;
  buyerId: string;
  createdAt: string;
};

export type TransformationTypeKey = 'restore' | 'fill' | 'remove' | 'recolor' | 'removeBackground';

export type FormUrlQueryParams = {
  searchParams: string;
  key: string;
  value: string | number | null;
};

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  searchParams: string;
  keyToRemove: string[];
};

export type searchParamProps = {
  params: { id: string; type: TransformationTypeKey };
  searchParams: { [key: string]: string | string[] | undefined };
};

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'select';
  placeholder: string;
  required: boolean;
  options?: Array<{
    value: string;
    label: string;
  }>;
}

export interface FormFields {
  [key: string]: FormField[];
}

export type TransformationType = 'fill' | 'restore' | 'removeBackground' | 'objectRemove' | 'objectRecolor';

export interface FormData {
  title: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  publicId?: string;
}
