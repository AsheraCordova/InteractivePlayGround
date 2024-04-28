
//start - import

import { EditText } from './android/widget/EditTextImpl';

//end - import
import BaseFragment from './BaseFragment';
import { Fragment, Inject } from './app/Fragment';
import { NavController, InjectController } from './navigation/NavController';
import { ScopedObject } from './app/ScopedObject';

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
        alert("Login Button clicked!!!");
    }

    tab(): string[] {
        return ["res/layout/login_component.xml", "tsc/src/Login.ts", "res/navigation/nav_graph.xml", "tsc/src/FragmentMapper.ts"];
    }

    getEditText(): EditText {
        return this.xml;
    }
}
        