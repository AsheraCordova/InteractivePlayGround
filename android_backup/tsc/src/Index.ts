import { EditText } from './android/widget/EditTextImpl';
import { FrameLayout } from './android/widget/FrameLayoutImpl';
import { Fragment, Inject } from './app/Fragment';
import { currentUrl, preview, xml } from './R/Index';
import { InjectController, NavController } from './navigation/NavController';
import { TextView } from './android/widget/TextViewImpl';

declare var window: any;

export default class Index extends Fragment {
    @InjectController({})
    navController!: NavController;

    @Inject({ id: preview })
    private previewPane: FrameLayout;

    @Inject({ id: xml })
    private xmlEditText: EditText;

    @Inject({ id: currentUrl })
    private currentUrl: TextView;
    constructor() {
        super();
    }

    getQueryParams(qs: any) {
        qs = qs.split('+').join(' ');
    
        var params: any = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;
    
        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
    
        return params;
    }

    public async onCreate(obj: any) {
        let url = this.getQueryParams(document.location.search)["url"];

        if (url == null) {
            url = 'https://raw.githubusercontent.com/AsheraCordova/InteractivePlayGround/main/android_backup/res/layout/event_handler.xml';
        }

        let response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
          });
        let xml = await response.text();
        this.xmlEditText.setText(xml);
        this.currentUrl.setText(url);
        this.executeCommand(this.xmlEditText, this.currentUrl);
        
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

     async callInlineFunction(obj: any) {
        window.inlineFunction(obj);
     }

}