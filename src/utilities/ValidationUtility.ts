export class ValidationUtility {
    public static cleanInput(rawString: string) : string {
        return rawString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }
}