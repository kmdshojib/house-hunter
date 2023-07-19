const palindrome = (str) => {
    const regex = /[\W_]/g;

    const lowRegStr = str.toLowerCase().replace(regex, '');

    const reverseStr = lowRegStr.split('').reverse().join('');

    if (reverseStr === lowRegStr) {
        console.log(true)
    } else {
        console.log(false)
    };
}
palindrome("A man, a plan, a canal. Panama");