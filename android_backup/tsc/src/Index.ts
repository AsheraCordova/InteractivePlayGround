import { EditText } from './android/widget/EditTextImpl';
import { FrameLayout } from './android/widget/FrameLayoutImpl';
import { Fragment, Inject } from './app/Fragment';
import { currentUrl, preview, xml } from './R/Index';
import { InjectController, NavController } from './navigation/NavController';
import { TextView } from './android/widget/TextViewImpl';
import { RecyclerView } from './android/widget/RecyclerViewImpl';
import { login } from './R/NavGraph';

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
            url = 'https://raw.githubusercontent.com/AsheraCordova/InteractivePlayGround/main/android_backup/res/layout/login_component_with_databinding.xml';
        }

        let response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
          });
        let xml = await response.text();
        this.xmlEditText.setText(xml);
        this.currentUrl.setText(url).updateModelData("login->view as map", {});
        this.executeCommand(this.xmlEditText, this.currentUrl);
        
    }


    preview(obj: any) {
        this.previewPane.setChildXml(obj.xml);
        this.executeCommand(this.previewPane);
    }
    async showAlert() {
        alert("test");
     }

     async callInlineFunction(obj: any) {
        obj["constants"] = {login : login};
        window.inlineFunction(this, this.xmlEditText, obj, this.navController);        
     }

     @Inject({ id: xml })
     private recyclerView: RecyclerView;
 
     async callInlineFunctionForRecyclerView(obj: any) {
        window.inlineFunction(this, this.recyclerView, obj);        
     }

     @Inject({ id: "@+id/loginButton" })
     private validateButton!:EditText;
     
     async validateLoginForm() {
         if (await this.validateForm("loginForm", this.validateButton)) {
             alert("validation success");
         }
     }

     async validateLoginFormWithModel(obj: any) {
        if (await this.validateForm("loginForm", this.validateButton)) {
            alert(JSON.stringify(obj.model));
        }
     }
}