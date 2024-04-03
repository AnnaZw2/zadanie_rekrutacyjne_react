import React from 'react';
import { Tag } from '../types';

interface TagElementProps {
    tag: Tag;
   

}

function TagElement({tag}: TagElementProps){
    return (
        <div>
        {tag.name} -  {tag.count}
        </div>
    )

   
}
export {TagElement}