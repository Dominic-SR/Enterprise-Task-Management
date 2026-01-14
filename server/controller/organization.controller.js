import Organization from "../models/organizationSchema.js"

export const createOrganization = async(req,res) =>{
    let { org_name, org_desc, org_status } = req.body

    try{
        let addOrganisation = await new Organization({
                    org_name:org_name,
                    org_desc:org_desc,
                    org_status: true
            });
        await addOrganisation.save();
        res.status(201).json({ message: 'Organization added successfully' });
    }
    catch(error){
        res.status(500).json({ message: 'Error adding organization', error });
    }   
}

export const getAllOrganization = async(req,res) =>{

    try{
       let getAll = await Organization.find();
        res.status(201).json({ message: 'Organization fetch successfully', data: getAll });
    }
    catch(error){
        res.status(500).json({ message: 'Error get organization', error });
    }   
}

export const getOrganizationById = async(req,res) =>{
    try{
        let getOrganization = await Organization.findById(req.params.id)
        res.status(201).json({ message: 'Organization fetch successfully', data: getOrganization });
    }
    catch(error){
        res.status(500).json({message:"Error get organization", error})
    }
}

export const updateOrganization = async(req,res)=>{
    try{
           let { org_name, org_desc, org_status } = req.body
      const updateOrganization = await Organization.updateOne({_id:req.params.id},{$set:{org_name:org_name,org_desc:org_desc,org_status:org_status}})
      res.status(200).json(updatePerson);
    }
    catch(error){
        res.status(500).json({message:"Error get organization", error})
    }
}