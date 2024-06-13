
//start - import

//end - import
import { Fragment, Inject } from './app/Fragment';
import { NavController, InjectController } from './navigation/NavController';
import { ScopedObject } from './app/ScopedObject';
import { childFragment } from './R/ChildHost';
import { fragment } from './android/widget/fragmentImpl';
import { child_index } from './R/NavGraphChild';
//start - className
export default class ChildLayout2 extends Fragment
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

        async goBackHome() {
            this.childFragment.popBackStackTo("child_index", false);
            this.executeCommand(this.childFragment);
        }

}
        