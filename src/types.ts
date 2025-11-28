type AssetType = 'STOCK' | 'CRYPTO' | 'BOND';

type AssetStatus = 'ACTIVE' | 'LIQUIDATED' | 'PENDING';

export const AssetStatusList = ['ACTIVE' , 'LIQUIDATED' , 'PENDING'];

// export const IError = {}
// message?: string | undefined, options?: ErrorOptions | undefined

interface IError{
    message: string;
    [key: string]: any;
}

export const STATUS_COLOR_MAP = {
    ACTIVE: "primary",
    PENDING: "warning",
    LIQUIDATED: "error",
} as const;

interface Asset{
    id: number, 
    name: String, 
    value: number, 
    type: AssetType, 
    status: AssetStatus,
};

export type { Asset, AssetStatus, AssetType, IError};