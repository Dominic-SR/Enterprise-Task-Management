import mongoose from "mongoose"

const organizationSchema = new mongoose.Schema({
    org_name:{
        type: String,
        required: [true, 'Organization is required'],
        trim: true,
        minlength:3
    },
    org_desc:{
        type: String,
        required: true,
    },
    org_status:{
        type: Boolean,
        default: true,
    },
        createdAt: {
        type: Date,
        default: Date.now
    }
})

const Organization = mongoose.model('Organization', organizationSchema);

export default Organization;