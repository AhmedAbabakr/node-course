const PostModel = require('../models/post');
const upload = require('../util/fileHelper');

exports.index = (req,res,next) => {
    let totalCount ;
    const currentPage = req.query.page || 1;
    const perPage = 1;
    const offset = (currentPage - 1) * perPage;
    PostModel.count()
    .then(count => {
        totalCount = count;
        return PostModel.findAll({limit:perPage,offset:offset});
    })
    // PostModel.findAll()
    .then((posts) => {
        return res.status(200).json({
            message:"Post List",
            posts:posts,
            totalCount:totalCount,
            totalPages:Math.ceil(totalCount / perPage),
            perPage:perPage,
            currentPage:currentPage,
        });   
    })
    .catch((error) =>{
        if(!error.statusCode)
        {
            error.statusCode = 500;
        }
        next(error);
    })
     
}

exports.store = (req,res,next) => {
    const title = req.body.title;
    const content = req.body.content;
//    if(!req.file)
//    {
//         const error = new Error("no image uploaded");
//         error.statusCode = 422;
//         throw error;
//    }
   upload.single('image')(req, res, function (err) {
        if (err) {
        return res.status(400).json({ error: err.message });
        }
        const imgurl = req.file?.path.replace("\\" ,"/") ?? "donlad.jpg";
    
        PostModel.create({
            title: title,
            content: content,
            imageUrl:imgurl,
            creator:req.user.name,
            userId : req.user.id,
        })
        .then((post) => {
            console.log(post);
            
            return res.status(201).json({
                message:"post stored successfully",
                post:post,
                creator:req.user
            })
        }).catch((error) => {
            if(!error.statusCode)
            {
                error.statusCode = 500;
            }
            next(error);
        });
    });

}

exports.show = (req,res,next) => {
    const id = req.params.id;
    
   
    PostModel.findByPk(id)
    .then((post) => {
        if(!post)
        {
            throw Error("Record Not Found");
        }
        return res.status(200).json({
            message:"Fetch Post Successfully",
            post:post
        });
    }).catch((error) => {
        if(!error.statusCode)
        {
            error.statusCode = 500;
        }
        next(error);
      });
}

exports.update = (req,res,next) => {
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    PostModel.findByPk(id)
    .then(post => {
        if(!post)
        {
            const err = Error("Record Not Found");
            err.statusCode =404;
            throw err;
        }
        upload.single('image')(req, res, function (err) {
            if (err) {
            return res.status(400).json({ error: err.message });
            }
            const imgurl = req.file?.path.replace("\\" ,"/") ?? "donlad.jpg";
            post.title = title;
            post.content = content;
            post.imageUrl = imgurl;
            post.save();
           
            return res.status(201).json({
                message:"post updated successfully",
                post:post
            })
        });
    }).catch((error) => {
        if(!error.statusCode)
        {
            error.statusCode = 500;
        }
        next(error);
      });
   
}

exports.delete = (req,res,next) => {
    const id = req.params.id;
    PostModel.destroy({
        where: { id: id }
    })
    .then(result => {
    if (result === 0) {
        res.status(404).json({ message: 'Post not found' });
    } else {
       return  res.status(200).json({
            message:"post deleted successfully"
        });
    }
    }).catch((error) => {
    if(!error.statusCode)
    {
        error.statusCode = 500;
    }
    next(error);
    });
}