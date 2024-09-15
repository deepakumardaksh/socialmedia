import sharp from"sharp"
import { Post } from "../models/post.model.js";
import {Comment} from "../models/comment.model.js"
import {User} from "../models/user.model.js"
import cloudinary from "../utils/cloudinary.js";

export const addNewPost=async(req,res)=>{
    try {
        const {caption}=req.body;
        const image=req.file;
        const authorId=req.authorId

        if(!image){
            return res.status(400).json({
                message:"Please add an image",
            })
        }
        // image upload
const optimizedImageBuffer=await sharp(image.buffer).resize({width:800,height:800,fit:'inside'})
.toFormat('jpeg',{quality:80})
.toBuffer();

// buffer to data uri
const fileUri=`data:image/jpeg:base64,${optimizedImageBuffer.toString('base64')}`;

const cloudResponse=await cloudinary.uploader.upload(fileUri);
const post = await Post.create({
    caption,
    image:cloudResponse.secure_url,
    author: authorId
});

const user= await User.findById(authorId);

if(user){
    user.post.push(post._id);
    await user.save();
}

await post.populate({path:'author',select:'-password'});
return res.status(201).json({
    message:"New post added",
    post,
    success:true,
})
    } catch (error) {
        console.log(error)
    }
}

// for get all posts
export const getAllPost=async(req,res)=>{
    try {
        const posts = await Post.find().sort({createdAt:-1}).populate({path:"author", select:'username profilePicture'})
        .populate({
            path:'comments',
            sort:{createdAt:-1},
            populate:{
                path:'author',
                select:'username profilePicture'      }
        });
        return res.status(200).json({
posts,
success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getUserPost=async (req,res)=>{
    try {
       const authorId=req.id;
       const posts=await Post.find({author:authorId}).sort({createdAt:-1}).populate({
        path:"author",
        select:"username profilePicture"
       }).populate({
        path:'comments',
        sort:{createdAt:-1},
        populate:{
            path:'author',
            select:'username profilePicture'
        }
       });
       return res.status(200).json({
        posts,
        success: true
       })
    } catch (error) {
        console.log(error)
    }
}

// for like the post
export const dislikePost= async(req,res)=>{
    try {
        const likeKarneWalaUserKiId=req.id;
        const postId=req.params.id;
        const post=await Post.findById(postId);
        if(!post) return res.status(404).json({message:"Post not found", success:false});

        // like logic started
        await post.updateOne({$pull:{likes:likeKarneWalaUserKiId}});
        await post.save();

        // implimenting  socket io for real time notification 
          
        return res.status(200).json({message:"Post Disliked", success:true});

    } catch (error) {
        console.log(error)
    }
}


//For dislike the post

export const likePost= async(req,res)=>{
    try {
        const likeKarneWalaUserKiId=req.id;
        const postId=req.params.id;
        const post=await Post.findById(postId);
        if(!post) return res.status(404).json({message:"Post not found", success:false});

        // like logic started
        await post.updateOne({$addToSet:{likes:likeKarneWalaUserKiId}});
        await post.save();

        // implimenting  socket io for real time notification 
          
        return res.status(200).json({message:"Post Liked", success:true});

    } catch (error) {
        console.log(error)
    }
}


export const addComment= async(req,res)=>{
    try {
        const postId=req.params.id;
        const commentKarneWalaUserKiId=req.id;

        const {text}=req.body;
        const post=await Post.findById(postId);

        if(!text) return res.status(400).json({message:'text is required', success:false});

const comment=await Comment.create({
    text,
    author: commentKarneWalaUserKiId,
    post:postId
}).populate({
    path:"author",
    select:"username, profilePicture"
})
post.comments.push(comment._id);
await post.save();

return res.status(201).json({
    message:"Comment Added",
    comment,
    success: true
})
    } catch (error) {
        console.log(error)
    }
}

export const getCommentsOfPost=async(req,res)=>{
    try {
        const postId=req.params.id;

        const comments=await Comment.find({post: postId}).populate('author','username profilePicture');

        if(!comments) return res.status(404).json({message: "No comments found on this post", success:false});

        return res.status(200).json({
            success:true,comments
        })
    } catch (error) {
        console.log(error)
    }
}

// for delete the post

export const deletePost=async(req,res)=>{
try {
    const postId=req.params.id;
    const authorId= req.id;
    const post=await Post.findById(postId);
if(!post) return res.status(404).json({message:"Post not found ", success:false});

// ckeck if the logged in user is the owner
if(post.author.toString() !=authorId) return res.status(403).json({
    message:"Unathorized"
});
//delete post
await Post.findByIdAndDelete(postId);
// remove the psot id from the userpos
let user = await User.findById(authorId);
user.posts=user.posts.filter(id=>id.toString() !=postId);
await user.save();

// delete associated comments
await Comment.deleteMany({post:postId});

return res.status(200).json({
    success:true,
    message:"Post deleted"
})

} catch (error) {
    console.log(error)
}
}

export const bookmarkPost = async (req,res)=>{
try {
    const postId=req.params.id;
    const authorId=req.id;

    const post = await Post.findById(postId);
     
    if(!post) return res.status(404).json({
message:"Post not found",
success:false
    });
    
    const user = await User.findById(authorId);
    if(user.bookmarks.include(post._id)){
// remove from bookmark
await user.updateOne({$pull:{bookmarks:post._id}});
await user.save();
return res.status(200).json({type:"unsaved", message:"Post removed from bookmark",success:true});
    }else{

        await user.updateOne({$addToSet:{bookmarks:post._id}});
        await user.save();
        return res.status(200).json({type:"saved", message:"Post  bookmarked",success:true});
    }
} catch (error) {
    console.log(error)
}
}