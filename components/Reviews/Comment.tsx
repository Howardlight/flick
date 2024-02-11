"use client";
import ShowMoreText from "react-show-more-text";
import CommentProps from "./Comment.types";

const Comment = (props: CommentProps): React.ReactElement => {
  if (!props.text || props.text == "") return <></>;
  return (
    <ShowMoreText
      lines={3}
      more="Show more"
      less="Show less"
      className={props?.className}
      anchorClass="text-red-600 cursor-pointer"
      expanded={false}
      truncatedEndingComponent={"... "}
    >
      {props.text}
    </ShowMoreText>
  );
};

export default Comment;
