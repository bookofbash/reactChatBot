import React from 'react';

const QuickReply = (props)=>{
    if(props.reply.payload){
        return (
            <a style={{margin: 3 }} href="/"  className="btn-floating btn-large waves-effect waves-light red"
                onClick={(event)=>
                    props.click(
                        event,
                        props.reply.payload,
                        props.reply.text
                    )
                }
            >
                {props.reply.structValue.text}
            </a>
        );
    } else {
        return (
            <a target="_blank" rel="noopener noreferrer" style={{margin: 3 }} href={props.reply.link}  className="btn-floating btn-large waves-effect waves-light red">
                {props.reply.structValue.text}
            </a>      
        )
    }

}


export default QuickReply;