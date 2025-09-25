
//start - import

//end - import
import { Fragment, Inject } from './app/Fragment';
import { NavController, InjectController } from './navigation/NavController';
import { ScopedObject } from './app/ScopedObject';
//start - className
export default class Screen3 extends Fragment
//end - className
{
        //start - body
        @InjectController({})
        navController!: NavController;
        
		static createInstance () {
			return new Screen3();
		}
        async goToPreviousScreen() {
            await this.navController.reset().popBackStack().executeCommand();
        }        
        //end - body
        async goToHome() {
            this.navController.popBackStackTo("screen1", true).executeCommand();
        }
}
        