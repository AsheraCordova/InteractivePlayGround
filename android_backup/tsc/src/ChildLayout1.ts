
//start - import

//end - import
import { Fragment, Inject } from './app/Fragment';
import { NavController, InjectController } from './navigation/NavController';
import { ScopedObject } from './app/ScopedObject';
import { childFragment } from './R/ChildHost';
import { child_layout2 } from './R/NavGraphChild';
import { fragment } from './android/widget/fragmentImpl';
//start - className
export default class ChildLayout1 extends Fragment
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

        async goToChild1() {
            this.childFragment.navigate(child_layout2, []);
            this.executeCommand(this.childFragment);
        }
}
        