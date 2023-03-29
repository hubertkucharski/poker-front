import {observable} from "mobx";
import { createContext } from "react";

class ActivityStore{
    @observable title: string[] = [];
    @observable loadingInitial = false;
}

export default createContext(new ActivityStore())
