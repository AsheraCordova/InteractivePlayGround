declare var SpinnerDialog: any;
import LocaleManager from '../app/LocaleManager';
import { DialogHelper } from '../helpers/DialogHelper';
export default (config: any): any => {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) => {
        // save a reference to the original method
        const originalMethod = descriptor.value;
        // rewrite original method with custom wrapper
        descriptor.value = async function (...args: any[]) {
            let title: string;
            let showProgress = true;
            if ((typeof config) == 'string') {
                title = config as string;
            } else {
                title = config.title;
                if (config.canShowProgress) {
                    showProgress = config.canShowProgress(this, args);
                }
            }
            

            try {
                if (showProgress) {
                    SpinnerDialog.show(null, LocaleManager.getInstance().translate(title), () => { });
                }
    
                const result = await originalMethod.apply(this, args)
                return result;
            } catch (e) {
                DialogHelper.alert(e + "", () => {});
            }
            finally {
                if (showProgress) {
                    SpinnerDialog.hide();
                }
            }
        }

        return descriptor;
    }
}