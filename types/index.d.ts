


declare type CreateUserParams = {
    clerkId: string;
    email: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    photo: string | null;
};

declare type UpdateUserParams = {
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    photo: string | null;
};

declare type UpdateImageTransformation={
image:{   
    _id:string;
    title:string;
    publicId:string;
    transformationType:string;
    width:number;
    height:number;
    config:any;
    secureURL: string;
    transactionURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string;
};
userId:string;
path:string;
};

declare type UpdateImageParams={
image:{   
    _id:string;
    title:string;
    publicId:string;
    transformationType:string;
    width:number;
    height:number;
    config:any;
    secureURL: string;
    transactionURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string;
};
userId:string;
path:string;
};


declare type Transformation = {
    restore?: boolean
    fillBackground?:boolean;
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

declare type CheckoutTransactionParams = {
    amount: number;
    credits: number;
    plan: string;
    buyerId: string;
    
}
declare type CreateTransactionParams = {
    stripeId: string;
    amount: number;
    credits: number;
    plan: string;
    buyerId: string;
    createdAt: string;
}

declare type TransformationTypeKey = 'restore' | 'fill' | 'remove' | 'recolor' | 'removeBackground' 

declare type FormUrlQueryParams = {
    searchParams: string;
    key: string;
    value: string | number | null;
}

declare type UrlQueryParams={
    params:string;
    key:string;
    value:string | null;
}

declare type RemoveUrlQueryParams = {
    searchParams:string;
    keyToRemove:string[];
}

declare type searchParamProps = {
    params:{id:string; type: TransformationTypeKey}
    searchParams:{[key:string]: string | string[] | undefined}
}