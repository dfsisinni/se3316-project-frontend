export class ValidationUtility {
    //clean for JS input
    public static cleanInput(rawString: string) : string {
        return rawString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }
}