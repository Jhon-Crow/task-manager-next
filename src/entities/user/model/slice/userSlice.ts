"use client";

import { buildSlice } from "@/shared/lib/store";
import { UserSchema } from "../types/UserSchema";
import { PayloadAction } from "@reduxjs/toolkit";
import { TypeUserReceivedByID } from "../types/user";
import { TaskForSchema } from "@/entities/task/public-types";

const initialState: UserSchema = {
  user: null,
};

const userSlice = buildSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: {
      reducer: (state, { payload }: PayloadAction<UserSchema["user"]>) => {
        state.user = payload;
      },
      prepare: (
        user: TypeUserReceivedByID
      ): PayloadAction<UserSchema["user"]> => {
        return {
          payload: {
            ...user,
            createdAt: user.createdAt.getTime(),
            tasks: user.tasks.reduce((acc, task) => {
              return [
                ...acc,
                {
                  ...task,
                  createdAt: task.createdAt.getTime(),
                  updatedAt: task.updatedAt.getTime(),
                  deadline: task.deadline.getTime(),
                },
              ];
            }, [] as TaskForSchema[]),
          },

          type: "setUser",
        };
      },
    },
  },
});

export const {
  name,
  actions: { setUser },
  useActions,
  reducer,
} = userSlice;
