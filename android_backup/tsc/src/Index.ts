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
            url = 'https://raw.githubusercontent.com/AsheraCordova/InteractivePlayGround/main/android_backup/res/layout/recycler_view_add_delete.xml';
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
     id = 3;
     @Inject({ id : "@+id/listView"})
    private items!: RecyclerView;
     async addItem(obj:any) {
        this.items.addModel({"id":this.id, "name": "test" + (this.id - 2), "gender":"@+id/radio0"});
        await this.executeCommand(this.items);
        this.id++;
    }
 
    async removeItem(obj:any) {
		this.items.removeModelById("3");
		await this.executeCommand(this.items);	
	}

	async removeCurrentItem(obj:any) {
		this.items.rremoveModelById(obj.model.id);
		await this.executeCommand(this.items);	
	}
	
	async getData(obj:any) {
		alert(JSON.stringify(obj.model));
	}
	
	async clearItem(obj:any) {
		this.items.updateModelData("items->view as list", []);
		this.items.notifyDataSetChanged(true);
		await this.executeCommand(this.items);
	}
}