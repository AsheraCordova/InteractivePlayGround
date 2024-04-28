import { EditText } from './android/widget/EditTextImpl';
import { FrameLayout } from './android/widget/FrameLayoutImpl';
import { Fragment, Inject } from './app/Fragment';
import { currentUrl, preview, xml } from './R/Index';
import { InjectController, NavController } from './navigation/NavController';
import { TextView } from './android/widget/TextViewImpl';
import { RecyclerView } from './android/widget/RecyclerViewImpl';
import { dialog, login, screen1 } from './R/NavGraph';
import { ScopedObject } from './app/ScopedObject';
import { color_animator, path_animator, translate_animator, translate_animator_interpolation, translate_with_rotation } from './R/ViewAnimation';

declare var window: any;
declare var navigator: any;

export default class Index extends Fragment {
    @InjectController({})
    navController!: NavController;

    @Inject({ id: preview })
    private previewPane: FrameLayout;

    @Inject({ id: xml })
    private xmlEditText: EditText;

    @Inject({ id: currentUrl })
    private currentUrl: TextView;

    @Inject({ id: translate_animator })
    private translateAnimator: FrameLayout;

    @Inject({ id: translate_animator_interpolation })
    private translateAnimatorInterpolation: FrameLayout;

    @Inject({ id: translate_with_rotation })
    private translateWithRotation: FrameLayout;

    @Inject({ id: color_animator })
    private colorAnimator: FrameLayout;

    @Inject({ id: path_animator })
    private pathAnimator: FrameLayout;
    
    endAllAnimations() {
        this.translateAnimator.endAnimator();
        this.colorAnimator.endAnimator();
        this.translateAnimatorInterpolation.endAnimator();
        this.translateWithRotation.endAnimator();
        this.pathAnimator.endAnimator();
    }
    
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
            url = 'http://192.168.1.34:8081/res/layout/recyclerview_filter_custom_groupie.xml';
        }
        
        try {
        let response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
          });
        
        let xml = await response.text();                
        this.xmlEditText.setText(xml);
        let viewPagerData = this.getViewPagerData();
        this.currentUrl.updateModelDataWithScopedObject(
            new ScopedObject("login->view as map", {}),
            new ScopedObject("items->view as list", []),
            new ScopedObject("viewpagerInfo->view as list", viewPagerData),
            new ScopedObject("tradeItem->view as map", {tradePrice: 0, noOfItems: 0, memPrice: 100})).setText(url);
        this.executeCommand(this.currentUrl, this.xmlEditText);
        navigator.splashscreen.hide();    
        } catch(e) {
            alert(e);
        }
    }


    preview(obj: any) {
        this.endAllAnimations();
        this.previewPane.setChildXml(obj.xml);
        this.executeCommand(this.translateAnimator, this.translateAnimatorInterpolation,  
            this.translateWithRotation, this.pathAnimator, this.colorAnimator, this.previewPane);
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

	async removeCurrentItem(obj:any) {
		this.items.removeModelById(obj.model.id);
		await this.executeCommand(this.items);	
	}
	
	async clearItem(obj:any) {
		this.items.updateModelData("items->view as list", []);
		this.items.notifyDataSetChanged(true);
		await this.executeCommand(this.items);
	}

    	
	async getData(obj:any) {
		alert(JSON.stringify(obj.model));
	}

    async openDialog() {
        this.navController.navigateTo(dialog).executeCommand();
    }

    async goToScreen1() {
        this.navController.navigateTo(screen1).executeCommand();
    }

    async addItemWithRefresh(obj:any) {
        this.items.addModel({"id":this.id, "price": this.id, "name": this.id + "test"}).refreshUiFromModel("size,total");
        await this.executeCommand(this.items);
        this.id++;
    }

	async removeCurrentItemWithRefresh(obj:any) {
		this.items.removeModelById(obj.model.id).refreshUiFromModel("size,total");
		await this.executeCommand(this.items);	
	}
	
	async clearItemWithRefresh(obj:any) {
		this.items.updateModelData("items->view as list", []).refreshUiFromModel("size,total");
		this.items.notifyDataSetChanged(true);
		await this.executeCommand(this.items);
	}

    private getViewPagerData() {
        let viewPagerData = [];
        for (let i = 0; i < 10; i++) {
            viewPagerData.push({ "id": i, "name": i + "", "background": (i % 2) == 0 ? "#ff0" : "#f00" });
        }
        return viewPagerData;
    }

    async writeInConsole() {
        console.log(new Date() + " -> writeInConsole");
     }

     @Inject({ id: "@+id/recyclerview" })
     private recyclerView1: RecyclerView;
     async filter(obj:any) {
		this.recyclerView1.filter(obj.newText);
		await this.executeCommand(this.recyclerView1);
	} 	
}