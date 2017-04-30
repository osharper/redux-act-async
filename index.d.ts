import * as Redux from 'redux';
import * as ReduxAct from 'redux-act';
import * as ReduxThunk from 'redux-thunk';

type StoreOrDispatch<S> = Redux.Store<S> | Redux.Dispatch<S> | Redux.Store<S>[] | Redux.Dispatch<S>[];

export interface IAsyncReducerState<T, E> {
    request: any;
    loading: boolean;
    data: T;
    error: E;
}

interface Promise<V, E> {
    then<R1, R2, E1, E2>(onFulfilled: (value: V) => R1 | Promise<R1, E1>, onRejected: (error: E2) => R2 | Promise<R2, E2>): Promise<R1 | R2, E1 | E2>;
    then<R, E1>(onFulfilled: (value: V) => R | Promise<R, E1>): Promise<R, E1>;
    catch<R, E1>(onRejected: (error: E) => R | Promise<R, E1>): Promise<R, E1>;
}

// Action creators
interface AsyncActionCreator<V, E, P, M> extends ReduxAct.ActionCreator<P, M> {
    (...args: any[]): Promise<V, E>;

    request: ReduxAct.ActionCreator<any, void>;
    ok: ReduxAct.ActionCreator<{ request: any, response: V}, void>;
    error: ReduxAct.ActionCreator<{ actionAsync: AsyncActionCreator<P, M>, request: any, error: E}, void>;
    reset: ReduxAct.ActionCreator<void, void>;
}

// Reducers
export declare function createActionAsync<P, M, V, E>(description: string, promise: (payload: P) => Promise<V, E>): AsyncActionCreator<P, M>;
export declare function createActionAsync<P, M, V, E>(description: string, promise: (payload: P) => Promise<V, E>, payloadReducer?: (...args: any[]) => P): AsyncActionCreator<P, M>;
export declare function createActionAsync<P, M, V, E>(description: string, promise: (payload: P) => Promise<V, E>, payloadReducer: (...args: any[]) => P, metaReducer?: (...args: any[]) => M): AsyncActionCreator<P, M>;

export declare function createReducerAsync<S>(asyncAtionCreator: AsyncActionCreator<any, any>, defaultState?: S): Redux.Reducer<S>;