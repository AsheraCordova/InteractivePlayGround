
//start - import

//end - import
import { Fragment, Inject } from './app/Fragment';
import { NavController, InjectController } from './navigation/NavController';
import { ScopedObject } from './app/ScopedObject';
import { childFragment } from './R/ChildHost';
import { fragment } from './android/widget/fragmentImpl';
//start - className
export default class ChildLayout3 extends Fragment
//end - className
{
        //start - body
        @InjectController({})
        navController!: NavController;
        

        async goToPreviousScreen() {
            await this.navController.reset().popBackStack().executeCommand();
        }        
        //end - body
        @Inject({ id: childFragment })
        private childFragment: fragment;

        async replaceFragment() {
            this.childFragment.replace("@layout/absolute_layout");
            this.executeCommand(this.childFragment);
        }

}
        