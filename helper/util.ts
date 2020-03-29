import React, { useState, useEffect } from 'react';

export const useTypewriter = (str : string, t : number = 100, ready: boolean = true) => {
    const [label, setLabel] = useState<string>('');
    const [queue, setQueue] = useState<Array<string>>(str.split(''));
    useEffect(() => {
        const fn = setTimeout(() => {
            if(ready && queue.length > 0){
                let q = queue;
                let ch = q.shift();
                setLabel(label + ch);
                setQueue(q);
            }
        }, t);
        return () => clearTimeout(fn);
    });
    return label;
}