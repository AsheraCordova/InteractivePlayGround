import { fragmentMapper } from './FragmentMapper';

export default class FragmentFactory {
    createNewInstance(fileName:string) {
        return new fragmentMapper[fileName]();
    }
}