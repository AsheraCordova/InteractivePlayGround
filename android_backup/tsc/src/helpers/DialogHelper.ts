import LocaleManager from "../app/LocaleManager";

declare var navigator:any;
export class DialogHelper {
    static alert(message: string, alertDismissed: any) : void {
        message = LocaleManager.getInstance().translate(message);
        navigator.notification.alert(
            message,
            alertDismissed
        );
    }

    static confirm(message: string, onConfirm: any) : void {
        message = LocaleManager.getInstance().translate(message);
        navigator.notification.confirm(
            message,
             onConfirm
        );
    }
}