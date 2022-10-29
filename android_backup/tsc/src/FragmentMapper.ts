import ErrorFragment from './ErrorFragment';
import ErrorDetailFragment from './ErrorDetailFragment';
//start - import

import Index from './Index';

//end - import

export const fragmentMapper : any = {
  'layout/error.xml': ErrorFragment,
  'layout/error_detail.xml': ErrorDetailFragment,
  'layout/dialog_sample.xml': Index,
  'layout/dialog_child.xml': Index,
  //start - body
    
     'layout/index.xml': Index,
    
     //end - body
};