import { delay } from '../helper/util';
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
    typewriter('Fodeld', 80, (str) => {
        document.getElementById('main-label').innerHTML = str;
    }).then(() => typewriter('An innovative solution to reduce hunger during self-lockdown', 50, (str) => {
        document.getElementById('sub-label').innerHTML = str;
        document.getElementById('main-line').classList.add("expandLeft");
        setTimeout(() => document.getElementById('canvas-root').classList.add("fadeIn"), 3000);
    }));
});
