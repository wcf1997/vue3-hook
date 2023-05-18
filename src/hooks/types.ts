export interface IReq {
  req?: {
    params?: any;
    reName?: {
      index?: string;
      size?: string;
    };
  };
}
export interface IRes {
  res?: {
    reName?: {
      total?: string;
      list?: string;
    };
  };
}


