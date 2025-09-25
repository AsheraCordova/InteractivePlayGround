
//start - import

import { EditText } from './android/widget/EditTextImpl';

//end - import
import { Fragment, Inject } from './app/Fragment';
import { NavController, InjectController } from './navigation/NavController';
import { ScopedObject } from './app/ScopedObject';
import BaseFragment from './BaseFragment';

export default class ChildAppContainer extends BaseFragment {
        //start - body
        @InjectController({})
        navController!: NavController;
        @Inject({ id: "@+id/xml" })

        private xml!:EditText;

		static createInstance () {
			return new ChildAppContainer();
		}
        async goToPreviousScreen() {
            await this.navController.reset().popBackStack().executeCommand();
        }        
        //end - body


     tab(): string[] {
        return ["res/layout/progress_dialog_child_app.xml", "tsc/src/ProgressdialogChildApp.ts", "res/navigation/nav_graph.xml", "res/layout/child_app_component.xml"];
    }

    getEditText(): EditText {
        return this.xml;
    }
}
        