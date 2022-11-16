import ErrorFragment from './ErrorFragment';
import ErrorDetailFragment from './ErrorDetailFragment';
//start - import

import CatHello from './CatHello';

import Dialog from './Dialog';

import Index from './Index';

import Login from './Login';

import Screen1 from './Screen1';

import Screen2 from './Screen2';

import Screen3 from './Screen3';

//end - import

export const fragmentMapper : any = {
  'layout/error.xml': ErrorFragment,
  'layout/error_detail.xml': ErrorDetailFragment,
  'layout/dialog_sample.xml': Index,
  'layout/dialog_child.xml': Index,
  //start - body
    
     'layout/cat_hello.xml': CatHello,
    
     'layout/dialog.xml': Dialog,
    
     'layout/index.xml': Index,
    
     'layout/login.xml': Login,
    
     'layout/screen1.xml': Screen1,
    
     'layout/screen2.xml': Screen2,
    
     'layout/screen3.xml': Screen3,
    
     //end - body
};