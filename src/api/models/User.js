import mongoose, {Schema} from "mongoose";

const UserSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        roles: {
            type: [Schema.Types.ObjectId],
            required: true,
            ref: "Role"
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("User", UserSchema);