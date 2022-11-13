
//start - import
import { Fragment, Inject } from './app/Fragment';
import { NavController, InjectController } from './navigation/NavController';
import { ScopedObject } from './app/ScopedObject';

import { EditText } from './android/widget/EditTextImpl';

//end - import
import BaseFragment from './BaseFragment';


export default class Login extends BaseFragment {
        //start - body
        @InjectController({})
        navController!: NavController;
        @Inject({ id: "@+id/xml" })

        private xml!:EditText;


        async goToPreviousScreen() {
            await this.navController.reset().popBackStack().executeCommand();
        }        
        //end - body
    showAlert() {
        alert("Hi there!!!");
    }

    tab(): string[] {
        return ["res/layout/login.xml", "tsc/src/Login.ts"];
    }

    getEditText(): EditText {
        return this.xml;
    }
}
        