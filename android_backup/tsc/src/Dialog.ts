
//start - import
import { Fragment, Inject } from './app/Fragment';
import { NavController, InjectController } from './navigation/NavController';
import { ScopedObject } from './app/ScopedObject';

//end - import
//start - className
export default class Dialog extends Fragment
//end - className
{
        //start - body
        @InjectController({})
        navController!: NavController;
        

        async goToPreviousScreen() {
            await this.navController.reset().popBackStack().executeCommand();
        }        
        //end - body

}
        