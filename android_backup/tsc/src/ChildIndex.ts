
//start - import

//end - import
import { Fragment, Inject } from './app/Fragment';
import { NavController, InjectController } from './navigation/NavController';
import { ScopedObject } from './app/ScopedObject';
import { childFragment } from './R/ChildHost';
import { fragment } from './android/widget/fragmentImpl';
import { child_layout1 } from './R/NavGraphChild';
//start - className
export default class ChildIndex extends Fragment
//end - className
{
        //start - body
        @InjectController({})
        navController!: NavController;
        
		static createInstance () {
			return new ChildIndex();
		}
        async goToPreviousScreen() {
            await this.navController.reset().popBackStack().executeCommand();
        }        
        //end - body
        @Inject({ id: childFragment })
        private childFragment: fragment;

        async goToChild1() {
            this.childFragment.navigate(child_layout1, []);
            this.executeCommand(this.childFragment);
        }
        
}
        