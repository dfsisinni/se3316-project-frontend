export interface ChangeStoreQuantityAction {
    itemId: string;
    storeDelta: number;

    cartIndex: number;
}