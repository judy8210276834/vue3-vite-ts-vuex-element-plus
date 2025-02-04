export interface registerType {
  name?: string;
  email: string;
  password: string;
  password2?: string;
  identity?: string;
}

export interface registerRilesType {
  name?: (
    | {
        required: boolean;
        message: string;
        trigger: string;
      }
    | {
        min: number;
        max: number;
        message: string;
        trigger: string;
      }
  )[];
  email: {
    type: string;
    required: boolean;
    message: string;
    trigger: string;
  }[];
  password: (
    | {
        required: boolean;
        message: string;
        trigger: string;
      }
    | {
        min: number;
        max: number;
        message: string;
        trigger: string;
      }
  )[];
  password2?: (
    | {
        required: boolean;
        message: string;
        trigger: string;
      }
    | {
        min: number;
        max: number;
        message: string;
        trigger: string;
      }
    | {
        validator: (rule: any, value: any, callback: any) => void;
        trigger: string;
      }
  )[];
}

export interface userType {
  id: string;
  name: string;
  avatar: string;
  identity: string;
  iat: number;
  exp: number;
}
