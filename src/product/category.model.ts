import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document{
    id:string;
    name:string;
    description:string
    status?:boolean
}

const CategorySchema:Schema<ICategory> = new Schema(
    {
        name: {type:String, required:true},
        description:{type:String, required:true},
        status:{type:Boolean, default:true}
    }
)

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;