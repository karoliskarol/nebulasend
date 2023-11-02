const calculateDisplayTime = text => {
    const calculatedTime = (text.length * 100) + 1000;

    return calculatedTime;
}
 
export default calculateDisplayTime;