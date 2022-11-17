
//start - import
import { Fragment, Inject } from './app/Fragment';
import { NavController, InjectController } from './navigation/NavController';
import { ScopedObject } from './app/ScopedObject';

//end - import
import { screen3 } from './R/NavGraph';

//start - className
export default class Screen2 extends Fragment
//end - className
{
        //start - body
        @InjectController({})
        navController!: NavController;
        

        async goToPreviousScreen() {
            await this.navController.reset().popBackStack().executeCommand();
        }        
        //end - body
        async goToScreen3() {
            this.navController.navigateTo(screen3).executeCommand();
        }

        async goToScreen3PopScreen2() {
            this.navController.navigateWithPopBackStackTo(screen3, "screen2", true).executeCommand();
        }
}
        