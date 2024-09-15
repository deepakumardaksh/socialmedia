import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React, { useState } from "react";
import { AvatarFallback } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";


const Post = () => 
    {
        const [text,setText]=useState("");
        const [open,setOpen]=useState(false)      

        const changeEventHandler=(e)=>{
const inputText=e.target.value;
if(inputText.trim()){
    setText(inputText)
}
else{
    setText("");
}
        }

 
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="past_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>Username</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>

            <Button variant="ghost" className="cursor-pointer w-fit ">
              Add to Favorites
            </Button>

            <Button variant="ghost" className="cursor-pointer w-fit ">
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <img
        src="https://images.unsplash.com/photo-1723242017539-39cd15eb75fd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="post_image"
        className="rounded-sm my-2 w-full aspect-square object-cover"
      />
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-3">
            <FaRegHeart
              size={"22px"}
              className="cursor-pointer hover:text-gray-600"
            />
            <MessageCircle className="cursor-pointer hover:text-gray-600" onClick={()=>setOpen(true)}/>
            <Send className="cursor-pointer hover:text-gray-600" />
          </div>
          <Bookmark className="cursor-pointer hover:text-gray-600" />
        </div>
      <span>
        1k likes
      </span>
      <p>
        <span className="font-medium my-2">Username</span>
        caption
      </p>
      <span onClick={()=>setOpen(true)} className="cursor-pointer text-sm text-gray-400">
        view all 10 comments
      </span>
      <CommentDialog open={open} setOpen={setOpen}/>
      <div className="flex items-center justify-between">
        <input
        type="text"
        placeholder="add a comment"
        className="outline-none text-sm w-full"
        value={text}
        onChange={changeEventHandler}
        />
        {
            text &&<span className="text-[#3BADF8]">
            Post
                    </span>
        }
      </div>
    </div>
  );
};

export default Post;
