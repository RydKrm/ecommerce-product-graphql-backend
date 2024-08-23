import { IResolvers } from "@graphql-tools/utils";
import auth from "../../auth/authHoC.js";
import ReviewModel from "./review.model.js";
import { positiveResponse } from "../../lib/response/response.js";

const ReviewResolver: IResolvers = {
  Query: {},
  Mutation: {
    createReview: auth("user", async (_: any, { input }: any, context: any) => {
      try {
        const review = new ReviewModel(input);
        await review.save();
        return {
          status: true,
          message: "Review created",
        };
      } catch (error) {
        console.log("Error creating review", error);
      }
    }),
    updateReview: auth("user", async (_: any, { input }: any, context: any) => {
      const { id, others } = input;
      try {
        const review = await ReviewModel.findByIdAndUpdate(id, others);
        if (!review) {
          return {
            status: false,
            message: "Review not found by _id",
          };
        }
        return positiveResponse("Review updated", { data: review });
      } catch (error) {
        console.log("Error updating review", error);
      }
    }),
  },
};
