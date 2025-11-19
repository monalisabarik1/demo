const Category=require ('../Model/categoryModel');

exports.createcategory = async(req, res)=>{
   try{
     const {name}= req.body;
    if(!name) return res.status(400).json({Message:"Name is required"});

    const existing= await Category.findOne({name});
    if(existing) return res.status(209).json({Message:"Name is already created"});

    const category = await Category.create({name,
        createdBy:req.user.id});
    if(category) return res.json({Message:"Category Created Succeesfully",
        category:category,
    });
   } catch(err){
    res.status(500).json({Message:err.message});
   }
};

exports.getCategory= async(req, res)=>{
    const category = await Category.find();
    res.json(category);
};

exports.getById= async(req,res)=>{
    const category = await Category.findById(req.params.id);
    if (category){
        return res.json(category);
    }
};

