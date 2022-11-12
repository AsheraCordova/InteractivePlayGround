import ErrorFragment from './ErrorFragment';
import ErrorDetailFragment from './ErrorDetailFragment';
//start - import

import CatHello from './CatHello';

import Index from './Index';

import Login from './Login';

//end - import

export const fragmentMapper : any = {
  'layout/error.xml': ErrorFragment,
  'layout/error_detail.xml': ErrorDetailFragment,
  'layout/dialog_sample.xml': Index,
  'layout/dialog_child.xml': Index,
  //start - body
    
     'layout/cat_hello.xml': CatHello,
    
     'layout/index.xml': Index,
    
     'layout/login.xml': Login,
    
     //end - body
};