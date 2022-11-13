import { Fragment } from './app/Fragment';
import { ScopedObject } from './app/ScopedObject';
import { EditText } from './android/widget/EditTextImpl';
import Progress from './decorator/Progress';

export default abstract class BaseFragment extends Fragment {
    private readonly baseurl = "https://raw.githubusercontent.com/AsheraCordova/InteractivePlayGround/main/android_backup/";

    @Progress("@string/loading")
    protected async showCodeForTab(url: string, tab1: boolean, tab2: boolean,  tab3: boolean,  tab4: boolean, xml: EditText) {
        let response = await fetch(this.baseurl + url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
        });
        let res = await response.text();
        xml.setText(res);
        xml.updateModelDataWithScopedObject(
            new ScopedObject("tab1->view as bool", tab1),
            new ScopedObject("tab2->view as bool", tab2),
            new ScopedObject("tab3->view as bool", tab3),
            new ScopedObject("tab4->view as bool", tab4)).refreshUiFromModel("tab1,tab2,tab3,tab4");
        this.executeCommand(xml);
    }
    async showTab1() {
        this.showCodeForTab(this.tab()[0], true, false, false, false, this.getEditText());
    }
    async showTab2() {
        this.showCodeForTab(this.tab()[1], false, true, false, false, this.getEditText());
    }
    async showTab3() {
        this.showCodeForTab(this.tab()[2], false, false, true, false, this.getEditText());
    }
    async showTab4() {
        this.showCodeForTab(this.tab()[3], false, false, false, true, this.getEditText());
    }
    abstract tab(): string[];
    abstract getEditText(): EditText;
}
