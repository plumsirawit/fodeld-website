import * as THREE from 'three';

const typewriter = (str : string, t : number = 100, callbackFn : (str : string) => void = () => {}) => {
    return new Promise<void>((resolve, reject) => {
        let label = '';
        let queue = str.split('');
        const fn = () => {
            setTimeout(() => {
                if(queue.length > 0){
                    let q = queue;
                    let ch = q.shift();
                    label = label + ch;
                    queue = q;
                    callbackFn(label);
                    console.log(label);
                    fn();
                }else{
                    resolve();
                }
            }, t);
        }
        fn();
    });
}
document.addEventListener('DOMContentLoaded', () => {
    typewriter('Fodeld', 100, (str) => {
        document.getElementById('mainLabel').innerHTML = str;
    }).then(() => {
        typewriter('An innovative solution to reduce hunger during self-lockdown', 70, (str) => {
            document.getElementById('subLabel').innerHTML = str;
        });
    });
});
