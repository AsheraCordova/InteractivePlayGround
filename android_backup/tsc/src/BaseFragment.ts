import { Fragment } from './app/Fragment';
import { ScopedObject } from './app/ScopedObject';
import { EditText } from './android/widget/EditTextImpl';

export default abstract class BaseFragment extends Fragment {
    private readonly baseurl = "https://raw.githubusercontent.com/AsheraCordova/InteractivePlayGround/main/android_backup/";

    protected async showCodeForTab(url: string, tab1: boolean, tab2: boolean, xml: EditText) {
        let response = await fetch(this.baseurl + url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
        });
        let res = await response.text();
        xml.setText(res);
        xml.updateModelDataWithScopedObject(
            new ScopedObject("tab1->view as bool", tab1),
            new ScopedObject("tab2->view as bool", tab2)).refreshUiFromModel("tab1,tab2");
        this.executeCommand(xml);
    }
    async showTab1() {
        this.showCodeForTab(this.tab()[0], true, false, this.getEditText());
    }
    async showTab2() {
        this.showCodeForTab(this.tab()[1], false, true, this.getEditText());
    }
    async showTab3() {
        this.showCodeForTab(this.tab()[2], false, true, this.getEditText());
    }
    async showTab4() {
        this.showCodeForTab(this.tab()[4], false, true, this.getEditText());
    }
    abstract tab(): string[];
    abstract getEditText(): EditText;
}
