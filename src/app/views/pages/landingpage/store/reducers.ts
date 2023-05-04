import { createReducer, on } from '@ngrx/store';
import { PostStateInterface } from '../landingpage.model';
import * as PostsActions from './actions';

export const initialState: PostStateInterface = {
  isLoading: false,
  posts: [],
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(PostsActions.getPosts,
  (state) => ({ ...state, isLoading: true })
))
