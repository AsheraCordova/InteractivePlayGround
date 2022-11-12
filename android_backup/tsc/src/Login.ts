
//start - import
import { Fragment, Inject } from './app/Fragment';
import { NavController, InjectController } from './navigation/NavController';
import { ScopedObject } from './app/ScopedObject';

import { LinearLayout } from './android/widget/LinearLayoutImpl';

//end - import
//start - className
export default class Login extends Fragment
//end - className
{
        //start - body
        @InjectController({})
        navController!: NavController;
        @Inject({ id: "@+id/tab" })

        private tab!:LinearLayout;


        async goToPreviousScreen() {
            await this.navController.reset().popBackStack().executeCommand();
        }        
        //end - body
        showAlert() {
            alert("Hi there!!!");
        }

        showLoginTs() {
            this.tab.updateModelDataWithScopedObject(
                new ScopedObject("tab1->view as bool", false),
                new ScopedObject("tab2->view as bool", true)).refreshUiFromModel("tab1,tab2");
            this.executeCommand(this.tab);
        }

        showLoginXml() {
            this.tab.updateModelDataWithScopedObject(
                new ScopedObject("tab1->view as bool", true),
                new ScopedObject("tab2->view as bool", false)).refreshUiFromModel("tab1,tab2");
            this.executeCommand(this.tab);
        }
        

}
        