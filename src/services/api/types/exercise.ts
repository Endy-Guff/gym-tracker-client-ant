import {ID} from "./common.ts";
import {IGroup} from "./group.ts";

export interface IExercise {
    id: ID
    name: string
    group: IGroup
}

export interface ICreateExerciseArgs {
    name: string
    groupId: ID
}

export interface IUpdateExerciseArgs {
    id: ID
    name: string
    groupId: ID
}