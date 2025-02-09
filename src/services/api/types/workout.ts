import {ID} from "./common.ts";
import {IExercise} from "./exercise.ts";

export interface IWorkout {
    id: ID;
    date: string,
    workoutExercises: IWorkoutExercise[]
}

export interface IWorkoutExercise {
    id: ID
    exercise: IExercise
    iterations: IIteration[],
}

export interface IIteration {
    weight: number,
    repetitions: number
}