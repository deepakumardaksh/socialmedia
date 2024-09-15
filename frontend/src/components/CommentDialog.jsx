import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

const CommentDialog = ({ open, setOpen }) => {
  const [text,setText]=useState("");

  const changeEventHandler=(e)=>{
    const inputText=e.target.value;
    if(inputText.trim()){
      setText(inputText);
    }else{
setText("");
    }
  }

const sendMessageHandler=async()=>{
  alert(text);
}

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-5xl p-0  flex flex-col"
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src="https://images.unsplash.com/photo-1723242017539-39cd15eb75fd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
 w-full h-full object-cover rounded-l-lg"
              alt="comment_img"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-xs">username</Link>
                  {/* <span className="text-gray-600 text-sm">Bio Here.......</span> */}
                </div>
              </div>

<Dialog>
    <DialogTrigger asChild>
<MoreHorizontal className="cursor-pointer"/>
    </DialogTrigger>
    <DialogContent className="flex flex-col items-center text-sm text-center">
        <div className="cursor-pointer w-full text-[#ED4956] font-bold">
            Unfollow
        </div>
        <div className="cursor-pointer w-full ">
            Add to favorites
        </div>
    </DialogContent>
</Dialog>

            </div>
<hr />
<div className="flex-1 overflow-y-auto max-h-96 p-4">
    comments will come
</div>
<div className="p-4">
<div className="flex overflow-y-auto max-h-96 p-4">
<input type="text" placeholder="Add a comment........" className="w-full outline-none border border-gray-300 p-2 rounded"
value={text}
onChange={changeEventHandler}
/>
<Button
disabled={!text.trim()}
variant="outline"
onClick={sendMessageHandler}
>
  Send
</Button>
</div>
</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
