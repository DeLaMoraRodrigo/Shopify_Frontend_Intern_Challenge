export default function GenerateKey(prefix){
    return `${prefix}_${ new Date().getTime()}`;
}