type AssetType = 'STOCK' | 'CRYPTO' | 'BOND';

type AssetStatus = 'ACTIVE' | 'LIQUIDATED' | 'PENDING';

interface Asset{
    id: number, 
    name: String, 
    value: number, 
    type: AssetType, 
    status: AssetStatus,
};

export {Asset, AssetStatus, AssetType};