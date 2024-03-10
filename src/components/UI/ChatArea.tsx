import { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import { IMessage } from '../../interfaces/IMessage.interface';
import { Typography } from '@mui/material';

export default function ChatArea(messages: any) {
  return (
    <>
      {messages && messages.length > 0
        ? messages.map((message: IMessage, index: number) => (
            <div key={index}>
              <Typography>{message.content}</Typography>
            </div>
          ))
        : null}
    </>
  );
}
