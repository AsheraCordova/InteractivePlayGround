import { EditText } from './android/widget/EditTextImpl';
import { FrameLayout } from './android/widget/FrameLayoutImpl';
import { Fragment, Inject } from './app/Fragment';
import { preview, xml } from './R/Index';
import { InjectController, NavController } from './navigation/NavController';

export default class Index extends Fragment {
    @InjectController({})
    navController!: NavController;

    @Inject({ id: preview })
    private previewPane: FrameLayout;

    @Inject({ id: xml })
    private xmlEditText: EditText;

    constructor() {
        super();
    }

    public async onCreate(obj: any) {
        // let response = await fetch('https://raw.githubusercontent.com/AsheraCordova/HelloWorld/main/android_backup/res/layout/index.xml', {
        //     method: 'GET',
        //     mode: 'cors',
        //     cache: 'default',
        //   });
        // let xml = await response.text();
        this.xmlEditText.setText(`<TextView text="Hello"/>`);
        this.executeCommand(this.xmlEditText);
    }


    preview(obj: any) {
        this.previewPane.setChildXml(obj.xml);
        this.executeCommand(this.previewPane);
    }

    setXml(obj: any) {
  
        // this.xmlEditText.setText(obj.xml).updateModelDataWithScopedObject(
        //     new ScopedObject("testObj->view as pathmap", { looptest: { textlayout: data } }),
        //     new ScopedObject("sectionInfo->view as list", groupiedata));
        // this.executeCommand(this.xmlEditText);
    }

   async showAlert() {
        alert("test");
     }

}