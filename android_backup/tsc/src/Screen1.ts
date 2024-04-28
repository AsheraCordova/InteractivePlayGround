
//start - import

//end - import
import { screen2 } from './R/NavGraph';
import { Fragment, Inject } from './app/Fragment';
import { NavController, InjectController } from './navigation/NavController';
import { ScopedObject } from './app/ScopedObject';
//start - className
export default class Screen1 extends Fragment
//end - className
{
        //start - body
        @InjectController({})
        navController!: NavController;
        

        async goToPreviousScreen() {
            await this.navController.reset().popBackStack().executeCommand();
        }        
        //end - body
        async goToScreen2() {
            this.navController.navigateTo(screen2).executeCommand();
        }
}
        